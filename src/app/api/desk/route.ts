import { cookies } from "next/headers";
import { DeskInputError } from "@/lib/desk-validation";
import { createDeskPost, decodeSession, listDeskPosts, sessionCookieName } from "@/lib/desk";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const kind = url.searchParams.get("kind");
  const all = url.searchParams.get("all") === "1";
  const jar = await cookies();
  const session = decodeSession(jar.get(sessionCookieName())?.value);
  const includeDown = Boolean(all && session);
  const posts = await listDeskPosts({
    includeDown,
    kind: kind === "nyhet" || kind === "artikkel" ? kind : undefined,
  });
  const visible = includeDown && session?.role === "kunde"
    ? posts.filter((post) => post.status === "published" || post.authorId === session.id) : posts;
  return Response.json({ posts: visible, session });
}

export async function POST(request: Request) {
  const jar = await cookies();
  const session = decodeSession(jar.get(sessionCookieName())?.value);
  if (!session) return Response.json({ error: "Logg inn i redaksjonen." }, { status: 401 });
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new DeskInputError("Ugyldig skjema.");
    const post = await createDeskPost({
      kind: body.kind, title: body.title, body: body.body,
      kicker: body.kicker ?? "", excerpt: body.excerpt ?? "", still: body.still,
      authorRole: session.role, authorName: session.name, authorId: session.id,
    });
    return Response.json({ post });
  } catch (error) {
    if (error instanceof DeskInputError || error instanceof SyntaxError) {
      return Response.json({ error: "Kontroller feltene og velg et gyldig bilde." }, { status: 400 });
    }
    throw error;
  }
}
