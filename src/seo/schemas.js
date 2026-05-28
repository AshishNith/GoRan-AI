const SITE_URL = 'https://goran.in';
const LOGO_URL = `${SITE_URL}/GoRanLogo.png`;

// ─── Organization Schema ───
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GoRan AI',
  alternateName: ['Goran AI', 'GoRan', 'Goran'],
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description: 'GoRan AI is India\'s leading AI automation agency specializing in AI calling agents, voice agents, WhatsApp agents, AI-powered CRM, AI audits, and autonomous business workflow automation.',
  foundingDate: '2023',
  founder: {
    '@type': 'Person',
    name: 'Ashish Ranjan',
    url: `${SITE_URL}/founder`,
    jobTitle: 'Founder & AI Systems Architect',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-9934225353',
      contactType: 'sales',
      email: 'goran.dotin@gmail.com',
      areaServed: ['IN', 'US', 'GB', 'SG'],
      availableLanguage: ['English', 'Hindi'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/goran-ai',
    'https://x.com/GoRanAI',
    'https://github.com/AshishNith',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  knowsAbout: [
    'Artificial Intelligence',
    'AI Agents',
    'Voice AI',
    'Calling Agents',
    'WhatsApp Automation',
    'AI CRM',
    'Business Automation',
    'AI Audit',
    'Multi-Agent Systems',
    'Prompt Engineering',
  ],
};

// ─── LocalBusiness Schema ───
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'GoRan AI',
  alternateName: 'Goran AI Agency',
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description: 'AI automation agency in India offering custom AI calling agents, voice agents, WhatsApp bots, AI-powered CRM systems, and enterprise workflow automation.',
  telephone: '+91-9934225353',
  email: 'goran.dotin@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  priceRange: '₹₹₹',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '47',
  },
};

// ─── WebSite Schema ───
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GoRan AI',
  alternateName: 'Goran AI',
  url: SITE_URL,
  description: 'GoRan AI builds custom AI agents, voice AI systems, WhatsApp bots, and autonomous business automation for companies in India and globally.',
  publisher: {
    '@type': 'Organization',
    name: 'GoRan AI',
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
  },
};

// ─── Person Schema (Ashish Ranjan) ───
export const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ashish Ranjan',
  alternateName: 'Ashish Ranjan GoRan',
  url: `${SITE_URL}/founder`,
  jobTitle: 'Founder & AI Systems Architect',
  description: 'Ashish Ranjan is the founder of GoRan AI, India\'s leading AI automation agency. He architects autonomous multi-agent systems, voice AI pipelines, and enterprise automation solutions for businesses worldwide.',
  worksFor: {
    '@type': 'Organization',
    name: 'GoRan AI',
    url: SITE_URL,
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Multi-Agent Systems',
    'Voice AI',
    'AI Automation',
    'Prompt Engineering',
    'AI CRM Systems',
    'WhatsApp Agents',
  ],
  sameAs: [
    'https://www.linkedin.com/in/ashish-ranjan-goran',
    'https://github.com/AshishNith',
  ],
};

// ─── Service Schema Builder ───
export function buildServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description || service.subtitle,
    provider: {
      '@type': 'Organization',
      name: 'GoRan AI',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: service.tag || service.name,
    url: `${SITE_URL}/services/${service.slug}`,
  };
}

// ─── FAQ Schema Builder ───
export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── BlogPosting Schema Builder ───
export function buildBlogPostSchema(post, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${SITE_URL}/founder`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GoRan AI',
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
    keywords: post.tags ? post.tags.join(', ') : '',
    articleSection: post.category,
    inLanguage: 'en',
  };
}

// ─── Breadcrumb Schema Builder ───
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

// ─── CaseStudy/Project Schema ───
export function buildCaseStudySchema(caseStudy, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: caseStudy.headline,
    description: caseStudy.challenge,
    creator: {
      '@type': 'Organization',
      name: 'GoRan AI',
      url: SITE_URL,
    },
    url: `${SITE_URL}/case-studies/${slug}`,
    about: {
      '@type': 'Thing',
      name: caseStudy.tag,
    },
  };
}
