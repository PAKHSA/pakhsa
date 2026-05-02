import { useEffect } from "react";
import { SEO as SEO_DEFAULTS, absoluteUrl } from "@/lib/seo";

type StructuredData = Record<string, unknown> | Record<string, unknown>[];

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  robots?: string;
  type?: "website" | "article";
  structuredData?: StructuredData;
};

const setMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const setLink = (selector: string, rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
};

const upsertStructuredData = (items: Record<string, unknown>[]) => {
  document
    .querySelectorAll('script[data-paksha-seo="structured-data"]')
    .forEach((node) => node.remove());

  items.forEach((item) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pakshaSeo = "structured-data";
    script.text = JSON.stringify(item);
    document.head.appendChild(script);
  });
};

const SEO = ({
  title,
  description = SEO_DEFAULTS.defaultDescription,
  path = "/",
  image = SEO_DEFAULTS.defaultImage,
  imageAlt = SEO_DEFAULTS.defaultImageAlt,
  keywords = [...SEO_DEFAULTS.defaultKeywords],
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  type = "website",
  structuredData = [],
}: SEOProps) => {
  useEffect(() => {
    const fullTitle = title
      ? SEO_DEFAULTS.titleTemplate.replace("%s", title)
      : SEO_DEFAULTS.defaultTitle;
    const url = absoluteUrl(path);
    const schemaItems = Array.isArray(structuredData) ? structuredData : [structuredData];

    document.title = fullTitle;

    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[name="keywords"]', { name: "keywords", content: keywords.join(", ") });
    setMeta('meta[name="robots"]', { name: "robots", content: robots });
    setMeta('meta[name="googlebot"]', { name: "googlebot", content: robots });
    setMeta('meta[name="author"]', { name: "author", content: SEO_DEFAULTS.siteName });
    setMeta('meta[name="application-name"]', {
      name: "application-name",
      content: SEO_DEFAULTS.siteName,
    });

    setMeta('meta[property="og:type"]', { property: "og:type", content: type });
    setMeta('meta[property="og:url"]', { property: "og:url", content: url });
    setMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    setMeta('meta[property="og:image"]', { property: "og:image", content: image });
    setMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: imageAlt });
    setMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SEO_DEFAULTS.siteName,
    });
    setMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: SEO_DEFAULTS.locale,
    });

    setMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: SEO_DEFAULTS.twitterCard,
    });
    setMeta('meta[name="twitter:url"]', { name: "twitter:url", content: url });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    setMeta('meta[name="twitter:image:alt"]', {
      name: "twitter:image:alt",
      content: imageAlt,
    });

    setLink('link[rel="canonical"]', "canonical", url);

    upsertStructuredData(schemaItems);
  }, [description, image, imageAlt, keywords, path, robots, structuredData, title, type]);

  return null;
};

export default SEO;
