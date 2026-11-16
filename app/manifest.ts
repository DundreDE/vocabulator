import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manfest {
  return {
    name: "Vocabulator",
    short_name: "Vocabulator",
    short_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [{ src: "/icon" }],
  };
}
