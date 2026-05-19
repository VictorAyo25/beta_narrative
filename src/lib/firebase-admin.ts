/**
 * Firebase Admin SDK Configuration
 * 
 * This file initializes the Firebase Admin SDK for server-side operations.
 * Used for verifying authentication tokens and server-side Firestore operations.
 * 
 * Initialization is lazy — only happens when getAdminAuth() or getAdminDb() is called,
 * not at module import time. This prevents build-time errors when env vars aren't set.
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;
let _adminAuth: Auth | null = null;
let _adminDb: Firestore | null = null;
let initAttempted = false;

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

/**
 * Lazily initialize Firebase Admin SDK.
 * Only runs once. Returns true if initialization succeeded.
 */
function tryInitialize(): boolean {
    if (initAttempted) {
        return adminApp !== null;
    }
    initAttempted = true;

    if (!hasValidCredentials()) {
        console.warn('Firebase Admin credentials not configured.');
        return false;
    }

    try {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n');

        // Validate the key looks like a PEM key
        if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
            console.error('Firebase Admin private key is missing PEM header.');
            return false;
        }

        const firebaseAdminConfig = {
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey,
            }),
        };

        adminApp = !getApps().length ? initializeApp(firebaseAdminConfig) : getApps()[0];
        return true;
    } catch (error) {
        console.error('Firebase Admin initialization failed:', error);
        return false;
    }
}

/**
 * Get the Firebase Admin Auth instance.
 * Lazily initializes on first access. Safe to call at build time.
 */
export function getAdminAuth(): Auth | null {
    if (!tryInitialize()) return null;
    if (!_adminAuth && adminApp) {
        _adminAuth = getAuth(adminApp);
    }
    return _adminAuth;
}

/**
 * Get the Firebase Admin Firestore instance.
 * Lazily initializes on first access. Safe to call at build time.
 */
export function getAdminDb(): Firestore | null {
    if (!tryInitialize()) return null;
    if (!_adminDb && adminApp) {
        _adminDb = getFirestore(adminApp);
    }
    return _adminDb;
}

/**
 * Legacy synchronous exports.
 * These will be null at build time if credentials aren't available.
 * API routes should use getAdminAuth() and getAdminDb() instead.
 */
export const adminAuth: Auth | null = null;
export const adminDb: Firestore | null = null;

export default adminApp;
