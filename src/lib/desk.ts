import { randomBytes } from "node:crypto";
import { canManagePost, validImagePath, validatePostInput } from "./desk-validation";
export { authenticateDesk, encodeSession, decodeSession } from "./desk-auth";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { articleStill, articles, news, stills } from "@/content/site";
import { defaultTool, type ToolConfig } from "@/content/tool";
import type { DeskPost, DeskRole, DeskSession, PostKind, PostStatus } from "@/lib/desk-types";

const DESK_PATH = path.join(process.cwd(), "data/editorial/desk.json");
const COOKIE = "flo_desk";


type DeskFile = {
  hidden: string[];
  posts: DeskPost[];
  tool: ToolConfig;
};

const emptyDesk = (): DeskFile => ({
  hidden: [],
  posts: [],
  tool: {
    intro: defaultTool.intro,
    disclaimer: defaultTool.disclaimer,
    classes: defaultTool.classes.map((klass) => ({ ...klass, keywords: [...klass.keywords] })),
  },
});

async function readDesk(): Promise<DeskFile> {
  try {
    const raw = await readFile(DESK_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<DeskFile>;
    const base = emptyDesk();
    return {
      hidden: Array.isArray(parsed.hidden) ? parsed.hidden : [],
      posts: Array.isArray(parsed.posts) ? parsed.posts.map((post) => ({ ...post, still: validImagePath(post.still) ? post.still : undefined })) : [],
      tool: parsed.tool?.classes?.length ? parsed.tool : base.tool,
    };
  } catch {
    return emptyDesk();
  }
}

async function writeDesk(desk: DeskFile) {
  await mkdir(path.dirname(DESK_PATH), { recursive: true });
  await writeFile(DESK_PATH, `${JSON.stringify(desk, null, 2)}\n`);
}

function seedPosts(): DeskPost[] {
  const articlePosts: DeskPost[] = articles.map((item) => ({
    id: `seed-artikkel-${item.slug}`,
    slug: item.slug,
    kind: "artikkel",
    title: item.title,
    kicker: item.kicker,
    excerpt: item.excerpt,
    body: [...item.body],
    still: articleStill[item.slug] ?? stills.bygg,
    status: "published",
    authorRole: "flo",
    authorName: "FLO",
    createdAt: `${item.date}T08:00:00.000Z`,
    updatedAt: `${item.date}T08:00:00.000Z`,
    source: "seed",
  }));
  const newsPosts: DeskPost[] = news.map((item) => ({
    id: `seed-nyhet-${item.slug}`,
    slug: item.slug,
    kind: "nyhet",
    title: item.title,
    kicker: item.kicker,
    excerpt: item.excerpt,
    body: [...item.body],
    still: item.slug.includes("fagmiljo") ? stills.digitalt : stills.skjerm,
    status: "published",
    authorRole: "flo",
    authorName: "FLO",
    createdAt: `${item.date}T08:00:00.000Z`,
    updatedAt: `${item.date}T08:00:00.000Z`,
    source: "seed",
  }));
  return [...newsPosts, ...articlePosts];
}

function mergePosts(desk: DeskFile): DeskPost[] {
  const hidden = new Set(desk.hidden);
  const deskBySlug = new Map(desk.posts.map((post) => [`${post.kind}:${post.slug}`, post]));
  const merged = seedPosts().map((seed) => {
    if (hidden.has(`${seed.kind}:${seed.slug}`) || hidden.has(seed.slug)) {
      return { ...seed, status: "down" as const };
    }
    return deskBySlug.get(`${seed.kind}:${seed.slug}`) ?? seed;
  });
  const extras = desk.posts.filter((post) => post.source !== "seed" && !merged.some((item) => item.id === post.id));
  return [...extras, ...merged].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);
}

export async function listDeskPosts(opts?: { includeDown?: boolean; kind?: PostKind }) {
  const desk = await readDesk();
  let posts = mergePosts(desk);
  if (opts?.kind) posts = posts.filter((post) => post.kind === opts.kind);
  if (!opts?.includeDown) posts = posts.filter((post) => post.status === "published");
  return posts;
}

export async function getDeskPost(kind: PostKind, slug: string, includeDown = false) {
  const posts = await listDeskPosts({ includeDown: true, kind });
  const post = posts.find((item) => item.slug === slug);
  if (!post) return null;
  if (!includeDown && post.status !== "published") return null;
  return post;
}

export async function createDeskPost(input: {
  kind: PostKind;
  title: string;
  kicker: string;
  excerpt: string;
  body: string;
  still?: string;
  authorRole: DeskRole;
  authorName: string;
  authorId: string;
}) {
  validatePostInput(input);
  const desk = await readDesk();
  const now = new Date().toISOString();
  const base = slugify(input.title) || `innlegg-${randomBytes(3).toString("hex")}`;
  let slug = base;
  let n = 2;
  const used = new Set(mergePosts(desk).map((post) => `${post.kind}:${post.slug}`));
  while (used.has(`${input.kind}:${slug}`)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  const post: DeskPost = {
    id: `desk-${randomBytes(6).toString("hex")}`,
    slug,
    kind: input.kind,
    title: input.title.trim(),
    kicker: input.kicker.trim() || (input.kind === "nyhet" ? "Nyhet" : "Artikkel"),
    excerpt: input.excerpt.trim() || input.body.trim().slice(0, 180),
    body: input.body
      .split(/\n{2,}/)
      .map((part) => part.trim())
      .filter(Boolean),
    still: input.still,
    status: "published",
    authorId: input.authorId,
    authorRole: input.authorRole,
    authorName: input.authorName.trim() || (input.authorRole === "flo" ? "FLO" : "Kunde"),
    createdAt: now,
    updatedAt: now,
    source: "desk",
  };
  if (!post.body.length) post.body = [post.excerpt];
  desk.posts.unshift(post);
  await writeDesk(desk);
  return post;
}

export async function setPostStatus(id: string, status: PostStatus, actor: DeskSession) {
  const desk = await readDesk();
  const live = mergePosts(desk);
  const current = live.find((post) => post.id === id);
  if (!current) return null;
  if (!canManagePost(current, actor)) throw new Error("forbidden");

  if (current.source === "seed") {
    const key = `${current.kind}:${current.slug}`;
    desk.hidden = desk.hidden.filter((item) => item !== key && item !== current.slug);
    if (status === "down") desk.hidden.push(key);
    await writeDesk(desk);
    return { ...current, status };
  }

  const idx = desk.posts.findIndex((post) => post.id === id);
  if (idx < 0) return null;
  desk.posts[idx] = { ...desk.posts[idx], status, updatedAt: new Date().toISOString() };
  await writeDesk(desk);
  return desk.posts[idx];
}

export async function getToolConfig(): Promise<ToolConfig> {
  const desk = await readDesk();
  return desk.tool;
}

export async function saveToolConfig(tool: ToolConfig) {
  const desk = await readDesk();
  desk.tool = {
    intro: tool.intro.trim() || defaultTool.intro,
    disclaimer: tool.disclaimer.trim() || defaultTool.disclaimer,
    classes: tool.classes
      .filter((klass) => klass.id && klass.label)
      .map((klass) => ({
        id: slugify(klass.id) || klass.id,
        label: klass.label.trim(),
        meaning: klass.meaning.trim(),
        keywords: klass.keywords.map((word) => word.trim().toLowerCase()).filter(Boolean),
      })),
  };
  if (!desk.tool.classes.some((klass) => klass.id === "uklart")) {
    desk.tool.classes.push({
      id: "uklart",
      label: "Uklart",
      meaning: defaultTool.classes.find((klass) => klass.id === "uklart")!.meaning,
      keywords: [],
    });
  }
  await writeDesk(desk);
  return desk.tool;
}

export function sessionCookieName() { return COOKIE; }

export async function writeSessionCookie(token: string) {
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function clearSessionCookie() {
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  jar.delete(COOKIE);
}
