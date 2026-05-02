export const SEO = {
  siteName: "Paksha",
  siteUrl: "https://paksha.in",
  defaultTitle: "Paksha - Kashmir's First Bike Taxi App | Explore Srinagar, Gulmarg, Pahalgam",
  titleTemplate: "%s | Paksha",
  defaultDescription:
    "Book bike taxis in Kashmir with PVC-verified local drivers. Explore Srinagar, Gulmarg, Pahalgam, Sonamarg, stays, food, and verified travel agencies.",
  defaultKeywords: [
    "Kashmir bike taxi",
    "Srinagar bike taxi",
    "Kashmir travel guide",
    "Gulmarg transport",
    "Pahalgam travel",
    "Sonamarg travel",
    "verified travel agencies Kashmir",
    "Kashmir local drivers",
    "Kashmir tourism",
    "Paksha",
  ],
  defaultImage:
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1200&h=630&fit=crop",
  defaultImageAlt: "Mountain landscape in Kashmir representing travel with Paksha",
  locale: "en_IN",
  twitterCard: "summary_large_image",
} as const;

export const absoluteUrl = (path = "/") => {
  if (!path || path === "/") return `${SEO.siteUrl}/`;
  return `${SEO.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
