import { useEffect } from 'react';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  canonical?: string;
}

export const useSEO = (data: SEOData) => {
  useEffect(() => {
    // Set document title
    document.title = data.title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let tag = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, property);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', data.description, true);
    if (data.keywords) {
      updateMetaTag('keywords', data.keywords, true);
    }

    // Open Graph tags
    updateMetaTag('og:title', data.title);
    updateMetaTag('og:description', data.description);
    updateMetaTag('og:type', data.type || 'website');
    if (data.image) {
      updateMetaTag('og:image', data.image);
    }
    if (data.url) {
      updateMetaTag('og:url', data.url);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', data.title);
    updateMetaTag('twitter:description', data.description);
    if (data.image) {
      updateMetaTag('twitter:image', data.image);
    }

    // Canonical link
    if (data.canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', data.canonical);
    }
  }, [data]);
};

export const defaultSEO: SEOData = {
  title: 'Snaggle - Premium Live Auction Platform',
  description: 'Join Snaggle, the premium live auction platform where every bid counts. Discover unique items, participate in exciting auctions, and win extraordinary finds.',
  keywords: 'auction, live auction, bidding, premium items, collectibles, online auction',
  type: 'website',
};