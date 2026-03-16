import siteData from '../data/site-data.json';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export function getCanonicalUrl(path: string): string {
  const base = siteData.company.siteUrl;
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "name": siteData.company.name,
    "telephone": siteData.company.phone,
    "email": siteData.company.email,
    "url": siteData.company.siteUrl,
    "image": `${siteData.company.siteUrl}${siteData.company.logo}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteData.company.address.street,
      "addressLocality": siteData.company.address.city,
      "postalCode": siteData.company.address.postalCode,
      "addressRegion": "Auvergne-Rhône-Alpes",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.7578,
      "longitude": 4.8320
    },
    "areaServed": [
      "Lyon", "Lyon 1er", "Lyon 2e", "Lyon 3e", "Lyon 4e", "Lyon 5e",
      "Lyon 6e", "Lyon 7e", "Lyon 8e", "Lyon 9e",
      "Villeurbanne", "Bron", "Caluire-et-Cuire", "Vénissieux", "Décines-Charpieu"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": siteData.company.rating.value,
      "reviewCount": siteData.company.rating.count,
      "bestRating": 5
    }
  };
}

export function generateArticleSchema(article: {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "datePublished": article.datePublished,
    "url": `${siteData.company.siteUrl}${article.url}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteData.company.siteUrl}${article.url}`
    },
    "image": article.image ? `${siteData.company.siteUrl}${article.image}` : undefined,
    "author": {
      "@type": "Organization",
      "name": siteData.company.name,
      "url": siteData.company.siteUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": siteData.company.name,
      "url": siteData.company.siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteData.company.siteUrl}${siteData.company.logo}`,
      },
    },
  };
}

export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howTo.name,
    "description": howTo.description,
    "step": howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
