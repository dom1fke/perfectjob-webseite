import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/fuer-einrichtungen", "/karriere", "/ueber-uns", "/kontakt", "/impressum", "/datenschutz"];
  return pages.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/karriere" ? 0.9 : 0.6,
  }));
}
