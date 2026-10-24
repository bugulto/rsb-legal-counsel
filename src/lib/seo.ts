export const seo = (title: string, description: string) => ({
  meta: [
    { title: `${title} | RSB Legal Associates & Consultants` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | RSB Legal Associates & Consultants` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
