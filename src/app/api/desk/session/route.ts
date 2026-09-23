import { cookies } from "next/headers";
import {
  decodeSession,
  encodeSession,
  authenticateDesk,
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
  const session = authenticateDesk(String(body.passphrase ?? ""), String(body.name ?? ""));
  if (!session) {
    return Response.json({ error: "Ugyldig nøkkel." }, { status: 401 });
  }
  const token = encodeSession(session);
  await writeSessionCookie(token);
  return Response.json({ session });
}

export async function DELETE() {
  await clearSessionCookie();
  return Response.json({ session: null });
}