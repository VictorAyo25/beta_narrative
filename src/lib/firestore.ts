/**
 * Firestore Utilities
 * 
 * Functions for reading and writing site content to Firestore.
 */

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { SiteContent } from '@/types';
import { defaultSiteContent } from './default-content';

const CONTENT_DOC_ID = 'site-content';
const CONTENT_COLLECTION = 'content';

/**
 * Fetches the site content from Firestore.
 * Returns default content if no content exists.
 */
export async function getSiteContent(): Promise<SiteContent> {
    try {
        const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                updatedAt: data.updatedAt?.toDate() || new Date(),
            } as SiteContent;
        }

        // If no content exists, initialize with defaults
        await initializeSiteContent();
        return {
            id: CONTENT_DOC_ID,
            ...defaultSiteContent,
            updatedAt: new Date(),
        };
    } catch (error) {
        console.error('Error fetching site content:', error);
        // Return defaults on error
        return {
            id: CONTENT_DOC_ID,
            ...defaultSiteContent,
            updatedAt: new Date(),
        };
    }
}

/**
 * Initializes the site content in Firestore with default values.
 */
export async function initializeSiteContent(): Promise<void> {
    try {
        const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
        await setDoc(docRef, {
            ...defaultSiteContent,
            updatedAt: serverTimestamp(),
        });
        console.log('Site content initialized with defaults');
    } catch (error) {
        console.error('Error initializing site content:', error);
        throw error;
    }
}

/**
 * Updates the site content in Firestore.
 */
export async function updateSiteContent(
    content: Partial<Omit<SiteContent, 'id' | 'updatedAt'>>
): Promise<void> {
    try {
        const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
        await updateDoc(docRef, {
            ...content,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error updating site content:', error);
        throw error;
    }
}
