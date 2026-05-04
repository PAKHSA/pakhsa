export const SEO = {
  siteName: "Pakhsa",
  siteUrl: "https://www.pakhsa.in",
  defaultTitle: "Pakhsa: Share Rides in Kashmir | Carpooling App Srinagar | No Surge Pricing",
  titleTemplate: "%s | Pakhsa",
  defaultDescription:
    "Pakhsa is Kashmir's upcoming ride-sharing app. Connect with verified riders, split costs, and enjoy affordable, surge-free carpooling in Srinagar and across Kashmir.",
  defaultKeywords: [
    "ride sharing Kashmir",
    "carpool Srinagar",
    "affordable rides Kashmir",
    "Pakhsa ride share",
    "Kashmir carpooling app",
    "Srinagar ride hailing",
    "share a ride Kashmir",
    "connect with riders Srinagar",
    "cost-effective travel Kashmir",
    "local ride sharing app",
    "safe carpooling Kashmir",
    "commute Srinagar",
    "travel Kashmir",
    "no surge pricing app",
    "Pakhsa app",
    "ride sharing platform India",
    "shared rides Srinagar",
    "carpool Kashmir",
    "Gulmarg transport",
    "Pahalgam rides",
    "PVC verified drivers",
    "Kashmir mobility",
    "Kashmir travel guide",
    "Kashmir cab",
    "Kashmir taxi",
    "Pahalgam travel",
    "Sonamarg travel",
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
