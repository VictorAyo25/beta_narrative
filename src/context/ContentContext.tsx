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
        // Always do a live client-side fetch after hydration so published
        // CMS changes are visible without needing a full redeploy.
        fetchContent();
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
