/**
 * Content API Route
 * 
 * Handles fetching and updating site content.
 * Protected by Firebase Admin authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { defaultSiteContent } from '@/lib/default-content';

const CONTENT_DOC_ID = 'site-content';
const CONTENT_COLLECTION = 'content';

/**
 * Verify the Firebase ID token from the Authorization header.
 */
async function verifyAuth(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }

    if (!adminAuth) {
        return null;
    }

    const token = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

/**
 * GET /api/content
 * Fetches the current site content.
 */
export async function GET() {
    try {
        // Check if Firebase Admin is initialized
        if (!adminDb) {
            return NextResponse.json({
                success: true,
                content: {
                    id: CONTENT_DOC_ID,
                    ...defaultSiteContent,
                    updatedAt: new Date(),
                },
            });
        }

        const docRef = adminDb.collection(CONTENT_COLLECTION).doc(CONTENT_DOC_ID);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();
            return NextResponse.json({
                success: true,
                content: {
                    id: docSnap.id,
                    ...data,
                    updatedAt: data?.updatedAt?.toDate?.() || new Date(),
                },
            });
        }

        // Return defaults if no content exists
        return NextResponse.json({
            success: true,
            content: {
                id: CONTENT_DOC_ID,
                ...defaultSiteContent,
                updatedAt: new Date(),
            },
        });
    } catch (error) {
        console.error('Error fetching content:', error);
        return NextResponse.json(
            { error: 'Failed to fetch content' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/content
 * Updates the site content. Requires authentication.
 */
export async function PUT(request: NextRequest) {
    try {
        // Check if Firebase Admin is initialized
        if (!adminDb || !adminAuth) {
            return NextResponse.json(
                { error: 'Firebase Admin not configured' },
                { status: 500 }
            );
        }

        // Verify authentication
        const decodedToken = await verifyAuth(request);
        if (!decodedToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { content } = body;

        if (!content) {
            return NextResponse.json(
                { error: 'Content is required' },
                { status: 400 }
            );
        }

        // Update content in Firestore
        const docRef = adminDb.collection(CONTENT_COLLECTION).doc(CONTENT_DOC_ID);
        await docRef.set(
            {
                ...content,
                updatedAt: new Date(),
            },
            { merge: true }
        );

        return NextResponse.json({
            success: true,
            message: 'Content updated successfully',
        });
    } catch (error) {
        console.error('Error updating content:', error);
        return NextResponse.json(
            { error: 'Failed to update content' },
            { status: 500 }
        );
    }
}
