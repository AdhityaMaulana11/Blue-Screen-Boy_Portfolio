import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
}

const BASE_TITLE = "Blue Screen Boy | Adhitya Maulana Wijaya";
const SITE_URL = "https://blue-screen-boy-portfolio.vercel.app";

export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    // Title
    document.title = `${title} | ${BASE_TITLE}`;

    // Description
    let metaDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (metaDesc) metaDesc.content = description;

    // OG title
    let ogTitle = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]'
    );
    if (ogTitle) ogTitle.content = `${title} | ${BASE_TITLE}`;

    // OG description
    let ogDesc = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]'
    );
    if (ogDesc) ogDesc.content = description;

    // OG URL
    let ogUrl = document.querySelector<HTMLMetaElement>(
      'meta[property="og:url"]'
    );
    if (ogUrl) ogUrl.content = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

    // Twitter title
    let twTitle = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:title"]'
    );
    if (twTitle) twTitle.content = `${title} | ${BASE_TITLE}`;

    // Twitter description
    let twDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:description"]'
    );
    if (twDesc) twDesc.content = description;

    // Canonical
    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonicalLink && canonical) {
      canonicalLink.href = `${SITE_URL}${canonical}`;
    }

    // Reset on unmount to base
    return () => {
      document.title = `${BASE_TITLE} | Full-Stack Developer & Automation Engineer`;
    };
  }, [title, description, canonical]);
}
