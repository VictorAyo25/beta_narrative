'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function usePageTracking() {
  const pathname = usePathname();
  const firedForPath = useRef<string | null>(null);

  useEffect(() => {
    // 1. Skip admin routes
    if (pathname.startsWith('/admin')) return;

    // 2. Skip if current user is admin/owner
    if (typeof window !== 'undefined' && localStorage.getItem('ignore_analytics') === 'true') {
      return;
    }

    // 3. Prevent double firing during current mount cycle
    if (firedForPath.current === pathname) return;
    firedForPath.current = pathname;

    // 4. Retrieve/Create Visitor ID
    let visitorId = '';
    if (typeof window !== 'undefined') {
      visitorId = localStorage.getItem('visitor_id') || '';
      if (!visitorId) {
        visitorId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('visitor_id', visitorId);
      }
    }

    // 5. Send track payload
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pathname, visitorId }),
    }).catch(() => { /* Silently ignore errors to avoid breaking UI */ });
  }, [pathname]);
}
