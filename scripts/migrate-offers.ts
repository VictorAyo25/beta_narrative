/**
 * Firestore Migration Script for Offers
 * 
 * Updates the 'offer' document in Firestore with the new two-plan configuration.
 * Run with: npx tsx scripts/migrate-offers.ts
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Load .env.local from project root
dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

// The new offer structure
const newOffer = {
    sectionLabel: 'The Investment',
    title: 'Three months to own',
    titleEmphasis: 'your narrative.',
    offers: [
        {
            packageName: 'THE STARTER',
            badge: 'Rising Professionals',
            tagline: 'For rising professionals ready to be seen',
            hook: "You're good at what you do. Your LinkedIn doesn't show it.",
            price: '₦800,000',
            priceNote: '3-month engagement',
            description: 'This is for Senior Managers, Directors, and emerging leaders who are building toward the next level, and know that visibility is part of getting there. In 3 months, we build your digital presence from the ground up: your voice, your story, your content : consistent, strategic, and unmistakably you.',
            includes: [
                'Brand voice & tone guidelines',
                'Narrative pillars & content structure',
                '12 strategic LinkedIn posts shaped around your voice',
                '1 professionally crafted article (publication-ready)',
                '1 placement on Business Day',
                'Executive bio',
                '4 Branded graphics',
                'Monthly strategy session',
                'Performance tracking & reporting',
            ],
        },
        {
            packageName: 'THE EXECUTIVE',
            badge: 'Premium Brand Package',
            tagline: 'For leaders ready to be sought after',
            hook: "You're already in the room. The internet needs to know it.",
            price: '₦2,000,000',
            priceSecond: 'USD 2,500',
            priceNote: '3-month engagement',
            description: 'This is for C-suite leaders, founders, and senior executives who are ready for strategic, consistent visibility that opens doors; consulting mandates, board seats, speaking invitations, media calls. In 3 months, we build a narrative so sharp and so unmistakably yours that the right people cannot scroll past, and we make sure the right platforms carry it.',
            includes: [
                'Strategic Narrative Plan',
                'Brand voice & tone guidelines',
                'Narrative pillars & content structure',
                '12 strategic LinkedIn posts shaped around your voice',
                '3 professionally crafted thought leadership articles tailored for publication in BusinessDay and one additional top-tier platform such as Techpoint Africa, TechCabal, or Nairametrics.',
                '3 media placements (2 Premium + 1 Standard outlet)',
                'Executive bio',
                '4 Branded graphics',
                'Monthly strategy sessions (×3)',
                'Performance tracking & reporting',
                'TV feature opportunity (where applicable)',
            ],
        },
    ],
};

async function migrateOffers() {
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

    console.log('🔄 Migrating offer content in Firestore...');
    
    // Check if the document exists first
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
        console.log('⚠️ Document does not exist. Creating it now...');
        await docRef.set({
            offer: newOffer,
            updatedAt: FieldValue.serverTimestamp(),
        });
    } else {
        await docRef.update({
            offer: newOffer,
            updatedAt: FieldValue.serverTimestamp(),
        });
    }

    console.log('✅ Offer content successfully migrated in Firestore!');
}

migrateOffers().catch((error) => {
    console.error('❌ Error migrating content:', error);
    process.exit(1);
});
