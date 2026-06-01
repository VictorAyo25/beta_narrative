'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export function usePageTracking() {
  const pathname = usePathname();
  const firedForPath = useRef<string | null>(null);

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    
    // Prevent double firing during current mount cycle
    if (firedForPath.current === pathname) return;
    firedForPath.current = pathname;

    // Send page_view track payload
    trackEvent('page_view');
  }, [pathname]);
}
