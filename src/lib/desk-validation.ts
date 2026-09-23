import type { DeskPost, DeskSession } from "./desk-types";

export class DeskInputError extends Error {}

export function validImagePath(value: unknown): value is string {
  return typeof value === "string" && (
    /^\/(?:media|partners)\/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|avif)$/.test(value) ||
    /^\/uploads\/\d{13}-[a-f0-9]{8}\.(?:jpg|png|webp)$/.test(value)
  );
}

export function canManagePost(post: DeskPost, actor: DeskSession) {
  return actor.role === "flo" || (post.source === "desk" && post.authorRole === "kunde" &&
    typeof post.authorId === "string" && post.authorId === actor.id);
}

export function validatePostInput(input: Record<string, unknown>) {
  if (input.kind !== "nyhet" && input.kind !== "artikkel") throw new DeskInputError("Velg nyhet eller artikkel.");
  for (const [field, limit, required] of [["title", 250, true], ["body", 50000, true], ["kicker", 150, false], ["excerpt", 1500, false]] as const) {
    const value = input[field];
    if (typeof value !== "string" || value.length > limit || (required && !value.trim())) {
      throw new DeskInputError("Kontroller tittel, tekst og lengde på feltene.");
    }
  }
  if (input.still !== undefined && !validImagePath(input.still)) throw new DeskInputError("Velg et gyldig opplastet bilde.");
}
