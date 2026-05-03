export const SEO = {
  siteName: "Pakhsa",
  siteUrl: "https://pakhsa.in",
  defaultTitle: "Pakhsa — Share Rides in Kashmir",
  titleTemplate: "%s | Pakhsa",
  defaultDescription:
    "Find someone going your way. Split the cost. No surge pricing. Launching in Srinagar.",
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
  defaultImageAlt: "Pakhsa — ride sharing in Kashmir",
  locale: "en_IN",
  twitterCard: "summary_large_image",
} as const;

export const absoluteUrl = (path = "/") => {
  if (!path || path === "/") return `${SEO.siteUrl}/`;
  return `${SEO.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
