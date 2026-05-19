'use client';

/**
 * Content Context Provider
 * 
 * Provides site content throughout the application.
 * Fetches content from Firestore and makes it available to all components.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent } from '@/types';
import { getSiteContent } from '@/lib/firestore';
import { defaultSiteContent } from '@/lib/default-content';

interface ContentContextType {
    content: SiteContent | null;
    loading: boolean;
    error: string | null;
    refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
    const [content, setContent] = useState<SiteContent | null>(null);
    const [loading, setLoading] = useState(true);
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
            // Use defaults on error
            setContent({
                id: 'default',
                ...defaultSiteContent,
                updatedAt: new Date(),
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
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
