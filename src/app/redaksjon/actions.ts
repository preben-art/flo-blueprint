"use server";

import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DeskInputError, validatePostInput } from "@/lib/desk-validation";
import {
  clearSessionCookie,
  createDeskPost,
  decodeSession,
  encodeSession,
  authenticateDesk,
  sessionCookieName,
  setPostStatus,
  writeSessionCookie,
} from "@/lib/desk";

async function requireSession() {
  const jar = await cookies();
  const session = decodeSession(jar.get(sessionCookieName())?.value);
  if (!session) redirect("/redaksjon");
  return session;
}

export async function loginDesk(formData: FormData) {
  const passphrase = String(formData.get("passphrase") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const session = authenticateDesk(passphrase, name);
  if (!session) redirect("/redaksjon?feil=nokkel");
  const token = encodeSession(session);
  await writeSessionCookie(token);
  redirect("/redaksjon");
}

export async function logoutDesk() {
  await clearSessionCookie();
  redirect("/redaksjon");
}

export async function createDeskEntry(formData: FormData) {
  const session = await requireSession();
  const kind = String(formData.get("kind") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (kind !== "nyhet" && kind !== "artikkel") redirect("/redaksjon?feil=skjema");
  if (!title || !body) redirect("/redaksjon?feil=skjema");
  // Validate before an upload writes any files; createDeskPost also enforces this boundary.
  try {
    validatePostInput({ kind, title, body, kicker: String(formData.get("kicker") ?? ""), excerpt: String(formData.get("excerpt") ?? "") });
  } catch (error) {
    if (error instanceof DeskInputError) redirect("/redaksjon?feil=skjema");
    throw error;
  }

  let still: string | undefined;
  const file = formData.get("file");
  if (file instanceof File && file.size) {
    if (file.size > 4_000_000) redirect("/redaksjon?feil=bilde");
    const type = file.type;
    const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : type === "image/jpeg" ? "jpg" : "";
    if (!ext) redirect("/redaksjon?feil=bilde");
    const dir = path.join(process.cwd(), "public/uploads");
    await mkdir(dir, { recursive: true });
    const filename = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
    await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));
    still = `/uploads/${filename}`;
  }

  await createDeskPost({
    kind,
    title,
    kicker: String(formData.get("kicker") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    body,
    still,
    authorId: session.id,
    authorRole: session.role,
    authorName: session.name,
  });
  redirect("/redaksjon");
}

export async function setDeskStatus(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (status !== "published" && status !== "down") redirect("/redaksjon?feil=skjema");
  try {
    await setPostStatus(id, status, session);
  } catch {
    redirect("/redaksjon?feil=tilgang");
  }
  redirect("/redaksjon");
}
