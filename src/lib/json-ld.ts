/** JSON remains valid while HTML script terminators become inert data. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
