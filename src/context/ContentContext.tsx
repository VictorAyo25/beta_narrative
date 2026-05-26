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
        // Only do the client-side fetch if no server-provided content was given
        if (!initialContent) {
            fetchContent();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isDark = content.theme === 'dark';
            if (isDark) {
                document.documentElement.classList.add('dark-theme');
                document.documentElement.classList.remove('light-theme');
            } else {
                document.documentElement.classList.add('light-theme');
                document.documentElement.classList.remove('dark-theme');
            }
        }
    }, [content.theme]);


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
