export const SEO = {
  siteName: "Pakhsa",
  siteUrl: "https://pakhsa.in",
  defaultTitle: "Pakhsa - Kashmir's First Bike Taxi App | Explore Srinagar, Gulmarg, Pahalgam",
  titleTemplate: "%s | Pakhsa",
  defaultDescription:
    "Book Kashmir cab and Kashmir taxi options with trusted local drivers. Explore Kashmir travels, tours and travels, bike rentals, itineraries, stays, and verified agencies across Srinagar and beyond.",
  defaultKeywords: [
    "Kashmir bike taxi",
    "Srinagar bike taxi",
    "Kashmir travel guide",
    "Kashmir Travels",
    "Kashmire Tours",
    "Kashmir Tours and travels",
    "Kashmir Bike rentals",
    "kashmir itenirary",
    "Kashmir stays",
    "Kashmir cab",
    "Kashmir taxi",
    "Gulmarg transport",
    "Pahalgam travel",
    "Sonamarg travel",
    "verified travel agencies Kashmir",
    "Kashmir local drivers",
    "Kashmir tourism",
    "Pakhsa",
  ],
  defaultImage:
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1200&h=630&fit=crop",
  defaultImageAlt: "Mountain landscape in Kashmir representing travel with Pakhsa",
  locale: "en_IN",
  twitterCard: "summary_large_image",
} as const;

export const absoluteUrl = (path = "/") => {
  if (!path || path === "/") return `${SEO.siteUrl}/`;
  return `${SEO.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
