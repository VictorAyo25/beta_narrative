import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

function isPrivateIp(ip: string): boolean {
  return ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.16.');
}

function isBot(userAgent: string): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  const botKeywords = [
    'bot', 'spider', 'crawler', 'crawling', 'lighthouse',
    'google-read-aloud', 'google-weblight', 'headless',
    'inspect', 'prerender', 'axios', 'node-fetch', 'got',
    'python-requests', 'curl', 'wget', 'http-client'
  ];
  return botKeywords.some((keyword) => ua.includes(keyword));
}

export async function POST(req: NextRequest) {
  try {
    const userAgent = req.headers.get('user-agent') || '';
    if (isBot(userAgent)) {
      return NextResponse.json({ success: true, message: 'Ignored bot' });
    }

    const { page, visitorId } = await req.json();
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    let city = 'Unknown';
    let country = 'Unknown';
    
    // 1. Edge Geolocation Headers
    const edgeCity = req.headers.get('x-vercel-ip-city');
    const edgeCountryCode = req.headers.get('x-vercel-ip-country');
    
    if (edgeCountryCode) {
      try {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        country = regionNames.of(edgeCountryCode) || edgeCountryCode;
      } catch (err) {
        country = edgeCountryCode;
      }
    }
    if (edgeCity) city = decodeURIComponent(edgeCity);

    // 2. IP Lookup Fallback
    if ((country === 'Unknown' || city === 'Unknown') && ip !== 'unknown' && !isPrivateIp(ip)) {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, { signal: AbortSignal.timeout(3000) });
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (!geo.error) {
            city = geo.city || city;
            country = geo.country_name || country;
          }
        }
      } catch (err) { /* Best effort */ }
    }

    // Save to Firestore using adminDb
    const db = getAdminDb();
    if (db) {
      await db.collection('analytics_visits').add({
        visitorId,
        ip,
        city,
        country,
        page,
        timestamp: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
