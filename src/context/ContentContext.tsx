'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent } from '@/types';
import { getSiteContent } from '@/lib/firestore';
import { defaultSiteContent } from '@/lib/default-content';

interface ContentContextType {
    content: SiteContent;
    loading: boolean;
    error: string | null;
    refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const fallbackContent: SiteContent = {
    id: 'default',
    ...defaultSiteContent,
    updatedAt: new Date(),
};

export function ContentProvider({
    children,
    initialContent,
}: {
    children: ReactNode;
    initialContent?: SiteContent;
}) {
    // If the server already fetched real content, use it — no flash of defaults
    const [content, setContent] = useState<SiteContent>(initialContent ?? fallbackContent);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchContent = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getSiteContent();
            setContent(data);
        } catch (err) {
            console.error('Error fetching content:', err);
            setError('Failed to load content');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only run a client-side fetch if the server didn't supply content.
        // When initialContent is present it came from a fresh Admin SDK read on
        // the server — re-fetching on the client risks overwriting that with a
        // stale browser-cached (IndexedDB) Firestore snapshot.
        if (!initialContent) {
            fetchContent();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);





    return (
        <ContentContext.Provider
            value={{
                content,
                loading,
                error,
                refreshContent: fetchContent,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
}
