import type { MetadataRoute } from "next";
import { canonicalUrl, isIndexableDeployment } from "@/lib/seo";
import { publicRoutes } from "@/lib/public-routes";

export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexableDeployment()) return [];
  return (await publicRoutes()).map(({ path, ...rest }) => ({ url: canonicalUrl(path), ...rest }));
}
