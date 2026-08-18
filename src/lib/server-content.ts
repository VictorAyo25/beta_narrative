import { getAdminDb } from '@/lib/firebase-admin';
import { defaultSiteContent } from '@/lib/default-content';
import { SiteContent } from '@/types';

/**
 * Published site content, or the draft when `isPreview` is true. Falls back to
 * the bundled defaults if Firestore is unavailable. Shared by / and /alt.
 */
export async function getServerSiteContent(isPreview: boolean): Promise<SiteContent> {
  try {
    const db = getAdminDb();
    if (!db) throw new Error('Admin DB unavailable');

    const docId = isPreview ? 'site-content-draft' : 'site-content';
    let docSnap = await db.collection('content').doc(docId).get();

    // Fallback if draft document doesn't exist yet
    if (!docSnap.exists && isPreview) {
      docSnap = await db.collection('content').doc('site-content').get();
    }

    if (docSnap.exists) {
      const data = docSnap.data()!;
      return {
        id: docSnap.id,
        ...data,
        updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
      } as SiteContent;
    }
  } catch (err) {
    console.error('Error fetching Firestore content:', err);
  }

  return {
    id: 'default',
    ...defaultSiteContent,
    updatedAt: new Date(),
  };
}
