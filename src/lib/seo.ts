export const SEO = {
  siteName: "Pakhsa",
  siteUrl: "https://pakhsa.in",
  defaultTitle: "Pakhsa — Kashmir Ride Sharing | Split fares with verified locals",
  titleTemplate: "%s | Pakhsa",
  defaultDescription:
    "Share rides across Kashmir with PVC-verified locals. Split fares, no surge pricing, built for mountain roads. Join early access — launching in Srinagar.",
  defaultKeywords: [
    "ride sharing Kashmir",
    "shared rides Srinagar",
    "carpool Kashmir",
    "affordable transport Kashmir",
    "Srinagar rides",
    "Gulmarg transport",
    "Pahalgam rides",
    "PVC verified drivers",
    "Kashmir mobility",
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
