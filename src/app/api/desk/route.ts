import { cookies } from "next/headers";
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
  return Response.json({ posts, session: session ? { role: session.role, name: session.name } : null });
}

export async function POST(request: Request) {
  const jar = await cookies();
  const session = decodeSession(jar.get(sessionCookieName())?.value);
  if (!session) return Response.json({ error: "Logg inn i redaksjonen." }, { status: 401 });
  const body = (await request.json()) as {
    kind?: string;
    title?: string;
    kicker?: string;
    excerpt?: string;
    body?: string;
    still?: string;
  };
  if (body.kind !== "nyhet" && body.kind !== "artikkel") {
    return Response.json({ error: "Velg nyhet eller artikkel." }, { status: 400 });
  }
  if (!body.title?.trim() || !body.body?.trim()) {
    return Response.json({ error: "Tittel og tekst må fylles inn." }, { status: 400 });
  }
  const post = await createDeskPost({
    kind: body.kind,
    title: body.title,
    kicker: body.kicker ?? "",
    excerpt: body.excerpt ?? "",
    body: body.body,
    still: body.still,
    authorRole: session.role,
    authorName: session.name,
  });
  return Response.json({ post });
}