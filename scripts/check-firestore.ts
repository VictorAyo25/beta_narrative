import dotenv from 'dotenv';
import { resolve } from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

async function checkFirestore() {
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
    const liveDoc = await db.collection('content').doc('site-content').get();
    const draftDoc = await db.collection('content').doc('site-content-draft').get();

    console.log('=== LIVE DOCUMENT site-content ===');
    if (liveDoc.exists) {
        console.log(JSON.stringify(liveDoc.data(), null, 2));
    } else {
        console.log('Document site-content does not exist!');
    }

    console.log('\n=== DRAFT DOCUMENT site-content-draft ===');
    if (draftDoc.exists) {
        console.log(JSON.stringify(draftDoc.data(), null, 2));
    } else {
        console.log('Document site-content-draft does not exist!');
    }
}

checkFirestore().catch(console.error);
