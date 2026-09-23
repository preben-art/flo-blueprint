import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.legalName,
    short_name: "FLO",
    description: company.promise,
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "nb",
    background_color: "#f4f1ea",
    theme_color: "#161210",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
