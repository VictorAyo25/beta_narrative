/**
 * Firestore Seed Script
 * 
 * Seeds the default site content into Firestore.
 * Run with: npx tsx scripts/seed-content.ts
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Load .env.local from project root
dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

// Default site content
const defaultSiteContent = {
    hero: {
        eyebrow: 'Executive Brand Strategy',
        title: 'Your expertise is',
        titleEmphasis: 'undeniable.',
        titleHighlight: "Your visibility shouldn't lag behind.",
        subtitle: 'Built for leaders ready to stop blending in and start being sought after: consistently, strategically, and on their own terms.',
        ctaText: 'Build My Brand',
    },
    pain: {
        sectionLabel: 'The Problem',
        title: "You're leading rooms.",
        titleEmphasis: "The internet doesn't know it.",
        lead: 'The leaders who get called to speak, consult, and serve on boards aren\'t always the most qualified. They\'re the most visible.',
        items: [
            'You worry about sounding like every other executive: generic, forgettable, corporate.',
            "You post inconsistently, if at all, because you're unsure what to say or how to frame it.",
            "Your visibility doesn't reflect the weight of your experience and the value you carry.",
            "You're ready for consultancy and speaking gigs, but the right people can't find you.",
        ],
    },
    value: {
        sectionLabel: 'Why Beta Narrative',
        title: 'Strategic visibility,',
        titleEmphasis: 'not just content.',
        body: 'With a foundation in public relations and strategic communication, Beta Narrative positions leaders for the opportunities their calibre deserves. We work with C-suite executives at multinationals, crafting narratives tailored to their target audience, and building the architecture around it. Your audience, your pillars, your voice, your legacy.',
        credentials: [
            {
                number: '4+',
                label: 'Years crafting executive narratives for multinational leaders',
            },
            {
                number: '5×',
                label: 'LinkedIn reach growth in 90 days for a senior leader',
            },
            {
                number: '20%',
                label: 'LinkedIn engagement lift from op-eds and ghost-written content',
            },
        ],
    },
    results: {
        sectionLabel: 'The Results',
        title: 'What strategic visibility',
        titleEmphasis: 'actually',
        titleEmphasisEnd: 'looks like.',
        results: [
            {
                stat: '5× Reach',
                description: 'A senior leader grew their LinkedIn reach 5× within 90 days, attracting inbound from decision-makers and industry peers.',
            },
            {
                stat: '+20% Engagement',
                description: 'Ghost-written articles and op-eds drove a 20% LinkedIn engagement lift, turning followers into conversations that convert.',
            },
            {
                stat: 'BusinessDay',
                description: 'Clients featured in national publications, positioning them as credible voices in their industries, not just practitioners.',
            },
            {
                stat: 'TV Features',
                description: 'Visibility strategy has placed executives in broadcast conversations, widening reach far beyond LinkedIn.',
            },
        ],
    },
    offer: {
        sectionLabel: 'The Investment',
        title: 'Three months to own',
        titleEmphasis: 'your narrative.',
        badge: 'Beta Launch Offer',
        packageName: 'Executive Brand Package',
        price: '₦500,000',
        priceNote: '3-month engagement · Beta pricing',
        description: 'Designed for mid-level professionals stepping into leadership and executives ready for strategic, consistent visibility that positions them for consultancy, speaking, and thought leadership.',
        timeline: [
            {
                month: 'Month 1',
                title: 'Foundation & Strategy',
                content: 'Brand voice, tone guidelines, UVP document, target audience mapping, narrative pillars and content structure',
            },
            {
                month: 'Month 2',
                title: 'Content & Visibility',
                content: 'Articles, LinkedIn posts, branded graphics, executive bio, op-ed placement and media outreach',
            },
            {
                month: 'Month 3',
                title: 'Amplification',
                content: 'TV feature opportunity, newsletter setup, visibility plan refinement and handover',
            },
        ],
        includes: [
            '3 professionally crafted articles (BusinessDay-ready)',
            '12 strategic LinkedIn posts shaped around your voice',
            'Branded graphics for your content',
            'Executive bio: compelling, clear, conversion-ready',
            'Brand voice and tone guideline',
            'Monthly strategy sessions',
            'Narrative pillars and content structure strategy',
            'Tracking & Reporting',
            'TV feature opportunity (where applicable)',
            'Newsletter setup possibility',
        ],
    },
    contact: {
        sectionLabel: 'Apply Now',
        title: 'Ready to be',
        titleEmphasis: 'found?',
        subtitle: 'We work with a limited number of leaders per cohort to ensure every brand gets the depth it deserves.',
        finePrint: 'Limited spots available at beta pricing. Once the cohort is full, the offer closes.',
        calendlyUrl: 'https://calendly.com/egbogunfavour/30min',
    },
};

async function seedContent() {
    // Validate environment variables
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        console.error('❌ Missing Firebase Admin credentials in environment variables.');
        console.error('   Make sure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in .env.local');
        process.exit(1);
    }

    // Initialize Firebase Admin
    if (!getApps().length) {
        initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey: privateKey.replace(/\\n/g, '\n'),
            }),
        });
    }

    const db = getFirestore();
    const docRef = db.collection('content').doc('site-content');

    // Check if content already exists
    const existing = await docRef.get();
    if (existing.exists) {
        console.log('⚠️  Site content already exists in Firestore.');
        console.log('   To overwrite, delete the document first or use the admin panel.');
        process.exit(0);
    }

    // Seed the content
    await docRef.set({
        ...defaultSiteContent,
        updatedAt: FieldValue.serverTimestamp(),
    });

    console.log('✅ Site content seeded successfully to Firestore!');
    console.log('   Collection: content');
    console.log('   Document: site-content');
}

seedContent().catch((error) => {
    console.error('❌ Error seeding content:', error);
    process.exit(1);
});
