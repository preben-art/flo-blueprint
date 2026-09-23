import { cookies } from "next/headers";
import {
  decodeSession,
  encodeSession,
  roleFromPassphrase,
  sessionCookieName,
  writeSessionCookie,
  clearSessionCookie,
} from "@/lib/desk";

export const dynamic = "force-dynamic";

export async function GET() {
  const jar = await cookies();
  const session = decodeSession(jar.get(sessionCookieName())?.value);
  return Response.json({ session });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { passphrase?: string; name?: string };
  const role = roleFromPassphrase(String(body.passphrase ?? ""));
  if (!role) {
    return Response.json({ error: "Ugyldig nøkkel." }, { status: 401 });
  }
  const name = String(body.name ?? "").trim() || (role === "flo" ? "FLO" : "Kunde");
  const token = encodeSession(role, name);
  await writeSessionCookie(token);
  return Response.json({ session: { role, name } });
}

export async function DELETE() {
  await clearSessionCookie();
  return Response.json({ session: null });
}