import { cookies } from "next/headers";
import { decodeSession, sessionCookieName, setPostStatus } from "@/lib/desk";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jar = await cookies();
  const session = decodeSession(jar.get(sessionCookieName())?.value);
  if (!session) return Response.json({ error: "Logg inn i redaksjonen." }, { status: 401 });
  const body = (await request.json()) as { status?: string };
  if (body.status !== "published" && body.status !== "down") {
    return Response.json({ error: "Ugyldig status." }, { status: 400 });
  }
  try {
    const post = await setPostStatus(id, body.status, session);
    if (!post) return Response.json({ error: "Fant ikke innlegget." }, { status: 404 });
    return Response.json({ post });
  } catch {
    return Response.json({ error: "Du kan bare ta ned eget innhold." }, { status: 403 });
  }
}