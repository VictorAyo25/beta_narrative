/**
 * Firebase Admin SDK Configuration
 * 
 * This file initializes the Firebase Admin SDK for server-side operations.
 * Used for verifying authentication tokens and server-side Firestore operations.
 */

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Check if Firebase Admin credentials are properly configured.
 */
function hasValidCredentials(): boolean {
    return !!(
        process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_CLIENT_EMAIL &&
        process.env.FIREBASE_PRIVATE_KEY &&
        !process.env.FIREBASE_PRIVATE_KEY.includes('your_') &&
        process.env.FIREBASE_PRIVATE_KEY.length > 100
    );
}

// Initialize Firebase Admin app only if credentials are valid
let adminApp;
if (hasValidCredentials()) {
    const firebaseAdminConfig = {
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    };

    adminApp = !getApps().length ? initializeApp(firebaseAdminConfig) : getApps()[0];
} else {
    // Create a dummy app for build time when credentials are not set
    console.warn('Firebase Admin credentials not configured. Using dummy initialization.');
    try {
        adminApp = !getApps().length ? initializeApp() : getApps()[0];
    } catch {
        // If initialization fails, we'll handle it in the API routes
        console.warn('Firebase Admin initialization skipped.');
    }
}

// Initialize Admin services (will throw at runtime if not properly configured)
export const adminAuth = adminApp ? getAuth(adminApp) : null;
export const adminDb = adminApp ? getFirestore(adminApp) : null;

export default adminApp;
