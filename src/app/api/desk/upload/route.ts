import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { decodeSession, sessionCookieName } from "@/lib/desk";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const jar = await cookies();
  const session = decodeSession(jar.get(sessionCookieName())?.value);
  if (!session) return Response.json({ error: "Logg inn i redaksjonen." }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.size) {
    return Response.json({ error: "Velg et bilde." }, { status: 400 });
  }
  if (file.size > 4_000_000) {
    return Response.json({ error: "Bildet må være under 4 MB." }, { status: 400 });
  }
  const type = file.type;
  const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : type === "image/jpeg" ? "jpg" : "";
  if (!ext) return Response.json({ error: "Bruk JPG, PNG eller WebP." }, { status: 400 });

  const dir = path.join(process.cwd(), "public/uploads");
  await mkdir(dir, { recursive: true });
  const name = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), buf);
  return Response.json({ src: `/uploads/${name}` });
}