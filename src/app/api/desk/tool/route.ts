import { cookies } from "next/headers";
import { decodeSession, getToolConfig, saveToolConfig, sessionCookieName } from "@/lib/desk";
import type { ToolConfig } from "@/content/tool";

export const dynamic = "force-dynamic";

export async function GET() {
  const tool = await getToolConfig();
  return Response.json({ tool });
}

export async function PUT(request: Request) {
  const jar = await cookies();
  const session = decodeSession(jar.get(sessionCookieName())?.value);
  if (!session || session.role !== "flo") {
    return Response.json({ error: "Bare FLO kan styre arbeidsverktøyet." }, { status: 403 });
  }
  const body = (await request.json()) as { tool?: ToolConfig };
  if (!body.tool?.classes?.length) {
    return Response.json({ error: "Klassene mangler." }, { status: 400 });
  }
  const tool = await saveToolConfig(body.tool);
  return Response.json({ tool });
}