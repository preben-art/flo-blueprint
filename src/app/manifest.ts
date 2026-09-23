import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
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
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
