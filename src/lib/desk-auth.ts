import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import type { DeskRole, DeskSession } from "./desk-types";

const localSecret = randomBytes(32).toString("hex");
const defaults = new Set(["flo-desk-local", "flo-redaksjon", "kunde"]);
type Account = { id: string; passphrase: string };

function strong(value: unknown): value is string {
  return typeof value === "string" && value.trim().length >= 24 && value === value.trim() && !defaults.has(value) && !/YOUR_|PLACEHOLDER|SET_ME/i.test(value);
}

function configuration() {
  const production = process.env.NODE_ENV === "production";
  const secret = process.env.FLO_DESK_SECRET;
  const admin = process.env.FLO_DESK_KEY;
  if (production && (!strong(secret) || !strong(admin) || secret === admin)) return null;
  let customers: Account[] = [];
  try {
    const parsed: unknown = JSON.parse(process.env.FLO_DESK_CUSTOMERS ?? "[]");
    if (!Array.isArray(parsed)) return null;
    const ids = new Set<string>();
    const keys = new Set<string>([admin ?? "flo-redaksjon"]);
    for (const value of parsed) {
      if (!value || typeof value !== "object") return null;
      const a = value as Account;
      if (typeof a.id !== "string" || !/^[a-z0-9][a-z0-9_-]{0,63}$/.test(a.id) ||
          a.id === "flo" || ids.has(a.id) || !strong(a.passphrase) || keys.has(a.passphrase) ||
          a.passphrase === secret || a.passphrase !== a.passphrase.trim()) return null;
      ids.add(a.id); keys.add(a.passphrase); customers.push({ id: a.id, passphrase: a.passphrase });
    }
  } catch { return null; }
  // The local demo identity is fixed; a typed byline never becomes an identity.
  if (!production && !process.env.FLO_DESK_CUSTOMERS) customers = [{ id: "local-demo", passphrase: "kunde" }];
  return { secret: secret || localSecret, admin: admin || "flo-redaksjon", customers };
}

function equal(a: string, b: string) {
  const left = Buffer.from(a), right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function authenticateDesk(passphrase: string, byline: string): DeskSession | null {
  const config = configuration();
  if (!config || passphrase.length > 512 || byline.length > 100) return null;
  const key = passphrase.trim();
  if (equal(key, config.admin)) return { id: "flo", role: "flo", name: byline.trim() || "FLO" };
  const account = config.customers.find((a) => equal(key, a.passphrase));
  return account ? { id: account.id, role: "kunde", name: byline.trim() || "Kunde" } : null;
}

function signingKey(config: NonNullable<ReturnType<typeof configuration>>, id: string, role: DeskRole) {
  const credential = role === "flo" && id === "flo" ? config.admin :
    role === "kunde" ? config.customers.find((a) => a.id === id)?.passphrase : undefined;
  return credential ? createHmac("sha256", config.secret).update(credential).digest() : null;
}

export function encodeSession(session: DeskSession) {
  const config = configuration();
  const key = config && signingKey(config, session.id, session.role);
  if (!key) throw new Error("Redaksjonen er ikke konfigurert.");
  const payload = Buffer.from(JSON.stringify({ ...session, exp: Date.now() + 7 * 86400_000 })).toString("base64url");
  return `${payload}.${createHmac("sha256", key).update(payload).digest("hex")}`;
}

export function decodeSession(token?: string | null): DeskSession | null {
  const config = configuration();
  if (!config || !token || token.length > 2048) return null;
  const parts = token.split(".");
  if (parts.length !== 2 || !/^[A-Za-z0-9_-]+$/.test(parts[0]) || !/^[a-f0-9]{64}$/.test(parts[1])) return null;
  try {
    const data = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
    if (!data || typeof data.id !== "string" || typeof data.name !== "string" || data.name.length > 100 ||
        !["flo", "kunde"].includes(data.role) || !Number.isFinite(data.exp) || data.exp <= Date.now() ||
        data.exp > Date.now() + 7 * 86400_000) return null;
    const key = signingKey(config, data.id, data.role);
    if (!key || !equal(parts[1], createHmac("sha256", key).update(parts[0]).digest("hex"))) return null;
    return { id: data.id, role: data.role, name: data.name };
  } catch { return null; }
}
