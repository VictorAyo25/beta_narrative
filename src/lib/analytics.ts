/**
 * Client-Side Analytics Tracker
 * 
 * Utility functions for tracking user visits, CTA clicks, referrer channels, and custom events.
 */

export function getVisitorId(): string {
    if (typeof window === 'undefined') return '';
    let visitorId = localStorage.getItem('visitor_id') || '';
    if (!visitorId) {
        visitorId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
}

export function shouldIgnoreAnalytics(): boolean {
    if (typeof window === 'undefined') return false;
    // Clear the old persistent localStorage flag if present (migration from old behaviour)
    if (localStorage.getItem('ignore_analytics')) {
        localStorage.removeItem('ignore_analytics');
    }
    // Only ignore if the current tab is an admin session (sessionStorage is tab-scoped)
    return sessionStorage.getItem('ignore_analytics') === 'true' || window.location.pathname.startsWith('/admin');
}

export async function trackEvent(
    eventType: 'page_view' | 'cta_click' | 'form_submit' | 'booking_complete' | 'link_click',
    eventDetails?: string
): Promise<void> {
    if (shouldIgnoreAnalytics()) return;

    try {
        const visitorId = getVisitorId();
        const pathname = window.location.pathname;
        const referrer = document.referrer || '';

        await fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                page: pathname,
                visitorId,
                eventType,
                eventDetails,
                referrer,
            }),
        });
    } catch (error) {
        // Silently catch error to prevent blocking user actions
        console.warn('Analytics tracking error:', error);
    }
}
