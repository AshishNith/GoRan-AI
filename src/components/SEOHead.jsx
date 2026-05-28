import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'GoRan AI';
const SITE_URL = 'https://goran.in';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION = 'GoRan AI is India\'s leading AI automation agency. We build custom AI calling agents, voice agents, WhatsApp agents, AI-powered CRMs, and autonomous business workflows. Founded by Ashish Ranjan.';

/**
 * SEOHead — injects per-page SEO metadata into <head>.
 * 
 * @param {string} title — Page title (will be appended with " | GoRan AI" unless noSuffix)
 * @param {string} description — Meta description (150-160 chars ideal)
 * @param {string} [canonicalPath] — Override canonical path (defaults to current pathname)
 * @param {string} [ogImage] — Open Graph image URL
 * @param {string} [ogType] — Open Graph type (default: 'website')
 * @param {object} [schema] — JSON-LD structured data object (or array)
 * @param {boolean} [noIndex] — Set true for pages that should not be indexed
 * @param {boolean} [noSuffix] — If true, don't append " | GoRan AI" to title
 * @param {string} [article] — Article metadata object { publishedTime, modifiedTime, author, section, tags }
 */
export default function SEOHead({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  schema,
  noIndex = false,
  noSuffix = false,
  article,
}) {
  const location = useLocation();
  const fullTitle = noSuffix ? title : `${title} | ${SITE_NAME}`;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const canonical = `${SITE_URL}${canonicalPath || location.pathname}`;
  const ogImg = ogImage || DEFAULT_OG_IMAGE;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Helper to set/create meta tags
    const setMeta = (attribute, key, content) => {
      let el = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Basic meta tags
    setMeta('name', 'description', metaDescription);

    // Robots
    if (noIndex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);

    // Open Graph tags
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', metaDescription);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', ogImg);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'en_IN');

    // Article-specific OG tags
    if (article) {
      if (article.publishedTime) setMeta('property', 'article:published_time', article.publishedTime);
      if (article.modifiedTime) setMeta('property', 'article:modified_time', article.modifiedTime);
      if (article.author) setMeta('property', 'article:author', article.author);
      if (article.section) setMeta('property', 'article:section', article.section);
      if (article.tags) {
        article.tags.forEach((tag, i) => {
          setMeta('property', `article:tag:${i}`, tag);
        });
      }
    }

    // Twitter Card tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', metaDescription);
    setMeta('name', 'twitter:image', ogImg);

    // JSON-LD structured data
    // Remove previous dynamic schema
    const existingScript = document.getElementById('seo-schema-jsonld');
    if (existingScript) existingScript.remove();

    if (schema) {
      const scriptEl = document.createElement('script');
      scriptEl.id = 'seo-schema-jsonld';
      scriptEl.type = 'application/ld+json';
      scriptEl.textContent = JSON.stringify(Array.isArray(schema) ? schema : schema);
      document.head.appendChild(scriptEl);
    }

    // Cleanup on unmount
    return () => {
      const dynamicScript = document.getElementById('seo-schema-jsonld');
      if (dynamicScript) dynamicScript.remove();
    };
  }, [fullTitle, metaDescription, canonical, ogImg, ogType, schema, noIndex, article]);

  return null; // This component renders nothing visible
}

// Export constants for use in schema builders
export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, DEFAULT_DESCRIPTION };
