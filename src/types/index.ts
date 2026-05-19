/**
 * Type Definitions
 * 
 * Centralized type definitions for the entire application.
 */

// Site content structure stored in Firestore
export interface SiteContent {
    id: string;
    hero: HeroContent;
    pain: PainContent;
    value: ValueContent;
    results: ResultsContent;
    offer: OfferContent;
    contact: ContactContent;
    updatedAt: Date;
}

export interface HeroContent {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    titleHighlight: string;
    subtitle: string;
    ctaText: string;
}

export interface PainContent {
    sectionLabel: string;
    title: string;
    titleEmphasis: string;
    lead: string;
    items: string[];
}

export interface ValueContent {
    sectionLabel: string;
    title: string;
    titleEmphasis: string;
    body: string;
    credentials: Credential[];
}

export interface Credential {
    number: string;
    label: string;
}

export interface ResultsContent {
    sectionLabel: string;
    title: string;
    titleEmphasis: string;
    titleEmphasisEnd?: string;
    results: Result[];
}

export interface Result {
    stat: string;
    description: string;
}

export interface OfferContent {
    sectionLabel: string;
    title: string;
    titleEmphasis: string;
    badge: string;
    packageName: string;
    price: string;
    priceNote: string;
    description: string;
    timeline: TimelineItem[];
    includes: string[];
}

export interface TimelineItem {
    month: string;
    title: string;
    content: string;
}

export interface ContactContent {
    sectionLabel: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    finePrint: string;
}

// Contact form submission
export interface ContactFormData {
    fullName: string;
    email: string;
    role: string;
    journey: string;
    challenge?: string;
}

// Admin user session
export interface AdminUser {
    uid: string;
    email: string;
}
