import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yourdomain.com";
  const pages = ["", "/sell", "/how-it-works", "/about", "/faq", "/contact"];
  return pages.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));
}
