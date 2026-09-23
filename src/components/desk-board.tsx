"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createDeskEntry, loginDesk, logoutDesk, setDeskStatus } from "@/app/redaksjon/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";
import type { DeskPost, DeskSession, PostKind } from "@/lib/desk-types";
import type { ToolConfig } from "@/content/tool";

type DeskResponse = { posts: DeskPost[]; session: DeskSession | null };

export function DeskBoard({
  initialSession,
  loginError,
}: {
  initialSession: DeskSession | null;
  loginError?: string;
}) {
  const [session, setSession] = useState<DeskSession | null>(initialSession);
  const [posts, setPosts] = useState<DeskPost[]>([]);
  const [tool, setTool] = useState<ToolConfig | null>(null);
  const [error, setError] = useState(loginError ?? "");
  const [busy, setBusy] = useState(false);
  const [kind, setKind] = useState<PostKind>("nyhet");
  const [notice, setNotice] = useState("");

  async function load(all = true) {
    const res = await fetch(`/api/desk?all=${all ? "1" : "0"}`, { credentials: "same-origin" });
    const data = (await res.json()) as DeskResponse;
    setPosts(data.posts ?? []);
    setSession(data.session ?? initialSession);
    if ((data.session ?? initialSession)?.role === "flo") {
      const toolRes = await fetch("/api/desk/tool", { credentials: "same-origin" });
      const toolData = (await toolRes.json()) as { tool?: ToolConfig };
      if (toolData.tool) setTool(toolData.tool);
    }
  }

  useEffect(() => {
    load().catch(() => setError("Redaksjonen kunne ikke lastes."));
  }, []);

  async function saveTool(e: React.FormEvent) {
    e.preventDefault();
    if (!tool) return;
    setBusy(true);
    setError("");
    const res = await fetch("/api/desk/tool", {
      method: "PUT",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tool }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Arbeidsverktøyet kunne ikke lagres.");
      return;
    }
    setTool(data.tool);
    setNotice("Arbeidsverktøyet er oppdatert.");
  }

  if (!session) {
    return (
      <form action={loginDesk} method="post" className="plan-read plan-float grid max-w-md gap-4">
        <p className="ed-kicker">Redaksjon</p>
        <h2 className="text-2xl font-normal">Logg inn for å legge inn eller ta ned innhold.</h2>
        <p className="text-[15px] leading-relaxed text-[#221d19]">
          Kunder legger inn nyheter og artikler, og kan ta ned eget innhold. FLO styrer arbeidsverktøyet og hele
          listen.
        </p>
        <div>
          <Label htmlFor="name">Navn</Label>
          <Input id="name" name="name" placeholder="Navn i byline" autoComplete="username" />
        </div>
        <div>
          <Label htmlFor="key">Nøkkel</Label>
          <Input id="key" name="passphrase" type="password" required autoComplete="current-password" />
        </div>
        {error ? <p className="text-sm text-[#c62e32]">{error}</p> : null}
        <Button type="submit">Åpne redaksjonen</Button>
      </form>
    );
  }

  const own = (post: DeskPost) => session.role === "flo" || (post.source === "desk" && post.authorName === session.name);

  return (
    <div className="grid gap-10">
      <div className="plan-read plan-float flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ed-kicker">{session.role === "flo" ? "FLO" : "Kunde"}</p>
          <h2 className="mt-2 text-2xl font-normal">{session.name}</h2>
          <p className="mt-2 text-sm text-[#221d19]">Innhold kan legges ut og tas ned herfra. Det vises på Nyheter og Artikler.</p>
        </div>
        <form action={logoutDesk}>
          <Button type="submit" variant="outline">
            Logg ut
          </Button>
        </form>
      </div>

      {error ? <p className="text-sm text-[#c62e32]">{error}</p> : null}
      {notice ? <p className="text-sm text-[#161210]">{notice}</p> : null}

      <form action={createDeskEntry} className="plan-read plan-float grid gap-4">
        <p className="ed-kicker">Nytt innhold</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="kind">Type</Label>
            <select
              id="kind"
              name="kind"
              className="flex h-11 w-full rounded-md border border-[#161210] bg-[#fbf8f2] px-3 text-sm"
              value={kind}
              onChange={(e) => setKind(e.target.value as PostKind)}
            >
              <option value="nyhet">Nyhet</option>
              <option value="artikkel">Artikkel</option>
            </select>
          </div>
          <div>
            <Label htmlFor="kicker">Stikkord</Label>
            <Input id="kicker" name="kicker" placeholder="Digitalt, Bolig…" />
          </div>
        </div>
        <div>
          <Label htmlFor="title">Tittel</Label>
          <Input id="title" name="title" required />
        </div>
        <div>
          <Label htmlFor="excerpt">Ingress</Label>
          <Textarea id="excerpt" name="excerpt" />
        </div>
        <div>
          <Label htmlFor="body">Tekst</Label>
          <Textarea id="body" name="body" required className="min-h-40" />
        </div>
        <div>
          <Label htmlFor="still">Studiobilde, valgfritt</Label>
          <Input id="still" name="file" type="file" accept="image/jpeg,image/png,image/webp" />
        </div>
        <Button type="submit">Legg ut</Button>
      </form>

      <div className="plan-read plan-float">
        <p className="ed-kicker">Innhold</p>
        <ul className="mt-6 divide-y divide-[#161210]/12 border-y border-[#161210]/12">
          {posts.map((post) => (
            <li key={post.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="ed-kicker">
                  {post.kind} · {post.status === "published" ? "ute" : "tatt ned"} · {post.authorName}
                </p>
                <p className="mt-1 text-lg font-normal">{post.title}</p>
                <p className="mt-1 text-sm text-[#221d19]">{post.excerpt}</p>
                <Link
                  href={post.kind === "nyhet" ? `/nyheter/${post.slug}` : `/artikler/${post.slug}`}
                  className="mt-2 inline-block text-sm text-[#c62e32] hover:underline"
                >
                  Åpne
                </Link>
              </div>
              {own(post) ? (
                <form action={setDeskStatus}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="status" value={post.status === "published" ? "down" : "published"} />
                  <Button type="submit" variant="outline">
                    {post.status === "published" ? "Ta ned" : "Legg ut"}
                  </Button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      {session.role === "flo" && tool ? (
        <form onSubmit={saveTool} className="plan-read plan-float grid gap-4">
          <p className="ed-kicker">Arbeidsverktøy</p>
          <h3 className="text-xl font-normal">Påstand eller krav, styrt herfra.</h3>
          <div>
            <Label htmlFor="intro">Ingress</Label>
            <Textarea id="intro" value={tool.intro} onChange={(e) => setTool({ ...tool, intro: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="disclaimer">Forbehold</Label>
            <Textarea
              id="disclaimer"
              value={tool.disclaimer}
              onChange={(e) => setTool({ ...tool, disclaimer: e.target.value })}
            />
          </div>
          {tool.classes.map((klass, i) => (
            <div key={klass.id} className="grid gap-3 border-t border-[#161210]/12 pt-4 sm:grid-cols-2">
              <div>
                <Label htmlFor={`label-${klass.id}`}>Klasse</Label>
                <Input
                  id={`label-${klass.id}`}
                  value={klass.label}
                  onChange={(e) => {
                    const classes = tool.classes.slice();
                    classes[i] = { ...klass, label: e.target.value };
                    setTool({ ...tool, classes });
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`keys-${klass.id}`}>Trefford, komma</Label>
                <Input
                  id={`keys-${klass.id}`}
                  value={klass.keywords.join(", ")}
                  onChange={(e) => {
                    const classes = tool.classes.slice();
                    classes[i] = {
                      ...klass,
                      keywords: e.target.value.split(",").map((word) => word.trim()).filter(Boolean),
                    };
                    setTool({ ...tool, classes });
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor={`mean-${klass.id}`}>Betydning</Label>
                <Textarea
                  id={`mean-${klass.id}`}
                  value={klass.meaning}
                  onChange={(e) => {
                    const classes = tool.classes.slice();
                    classes[i] = { ...klass, meaning: e.target.value };
                    setTool({ ...tool, classes });
                  }}
                />
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={busy}>
              Lagre arbeidsverktøy
            </Button>
            <Button asChild variant="outline">
              <Link href="/fag-og-kunnskap/pastand-eller-krav">Åpne verktøyet</Link>
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
