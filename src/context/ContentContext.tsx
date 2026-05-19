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

// Create default content object once
const fallbackContent: SiteContent = {
    id: 'default',
    ...defaultSiteContent,
    updatedAt: new Date(),
};

export function ContentProvider({ children }: { children: ReactNode }) {
    // Initialize with default content immediately — no loading flash
    const [content, setContent] = useState<SiteContent>(fallbackContent);
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
            // Keep existing content on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch from Firestore in background — content already shows defaults
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
