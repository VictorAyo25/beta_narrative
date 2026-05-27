import dotenv from 'dotenv';
import { resolve } from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

async function updateCalendly() {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        console.error('Missing credentials');
        process.exit(1);
    }

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
    
    // Update live content
    const liveDocRef = db.collection('content').doc('site-content');
    const liveDoc = await liveDocRef.get();
    if (liveDoc.exists) {
        const contact = liveDoc.data()?.contact || {};
        contact.calendlyUrl = 'https://calendly.com/egbogunfavour/30min';
        await liveDocRef.update({ contact });
        console.log('✅ Updated site-content live document.');
    }

    // Update draft content
    const draftDocRef = db.collection('content').doc('site-content-draft');
    const draftDoc = await draftDocRef.get();
    if (draftDoc.exists) {
        const contact = draftDoc.data()?.contact || {};
        contact.calendlyUrl = 'https://calendly.com/egbogunfavour/30min';
        await draftDocRef.update({ contact });
        console.log('✅ Updated site-content-draft document.');
    }
}

updateCalendly().catch(console.error);
