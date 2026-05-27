import dotenv from 'dotenv';
import { resolve } from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

async function forcePublish() {
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
    const draftDoc = await db.collection('content').doc('site-content-draft').get();

    if (!draftDoc.exists) {
        console.error('No draft document found! Run seed or migration script first.');
        process.exit(1);
    }

    const draftData = draftDoc.data()!;
    console.log('Copying complete draft data to live document...');

    const liveDocRef = db.collection('content').doc('site-content');
    await liveDocRef.set({
        ...draftData,
        updatedAt: new Date(),
    });

    console.log('✅ Successfully published draft to live document in Firestore!');
}

forcePublish().catch(console.error);
