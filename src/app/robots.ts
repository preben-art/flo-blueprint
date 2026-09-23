import type { MetadataRoute } from "next";
import { canonicalOrigin, isIndexableDeployment } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isIndexableDeployment()
      ? { userAgent: "*", allow: "/", disallow: ["/redaksjon", "/api/desk"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${canonicalOrigin}/sitemap.xml`,
    host: canonicalOrigin,
  };
}
