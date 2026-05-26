import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';

function getCountryCode(countryName: string): string {
  if (!countryName) return 'NG';
  const name = countryName.trim().toLowerCase();
  
  const countryNameToCode: Record<string, string> = {
    'nigeria': 'NG',
    'united states': 'US',
    'united states of america': 'US',
    'united kingdom': 'GB',
    'great britain': 'GB',
    'canada': 'CA',
    'south africa': 'ZA',
    'kenya': 'KE',
    'ghana': 'GH',
    'germany': 'DE',
    'france': 'FR',
    'italy': 'IT',
    'spain': 'ES',
    'netherlands': 'NL',
    'india': 'IN',
    'china': 'CN',
    'japan': 'JP',
    'australia': 'AU',
    'brazil': 'BR',
    'ireland': 'IE',
    'united arab emirates': 'AE',
    'switzerland': 'CH',
    'unknown': 'NG'
  };
  
  return countryNameToCode[name] || 'NG';
}

function getFlagUrl(countryCode: string): string {
  const code = (countryCode || 'NG').toUpperCase().trim();
  if (code.length !== 2) return 'https://flagcdn.com/w40/ng.png';
  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
}

async function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split('Bearer ')[1];
  if (process.env.NODE_ENV === 'development' && token === 'mock-dev-token') {
    return { email: 'dev@betanarrative.com', uid: 'dev-user-id' };
  }

  const auth = getAdminAuth();
  if (!auth) {
    return null;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    // 1. Verify authentication
    const decodedToken = await verifyAuth(req);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ error: 'Firebase Admin not configured' }, { status: 500 });
    }

    // 2. Parse time range query param
    const url = new URL(req.url);
    const range = url.searchParams.get('range') === '24h' ? '24h' : '7d';
    const now = Date.now();
    const rangeMs = range === '24h' ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
    const startTime = new Date(now - rangeMs);

    // 3. Fetch recent visits (capped to avoid memory/read issues)
    const snapshot = await db.collection('analytics_visits')
      .orderBy('timestamp', 'desc')
      .limit(3000)
      .get();

    // 4. Process records in memory
    const pageViewsMap: Record<string, { views: number; visitors: Set<string> }> = {};
    const countryMap: Record<string, { views: number; visitors: Set<string> }> = {};
    const cityMap: Record<string, { views: number; country: string; visitors: Set<string> }> = {};
    const uniqueVisitorsSet = new Set<string>();
    const visitsList: any[] = [];

    // Initialize traffic history buckets
    const trafficHistoryMap: Record<string, { views: number; visitors: Set<string> }> = {};

    if (range === '24h') {
      // 24 hourly buckets, labelled "HH:00"
      for (let i = 23; i >= 0; i--) {
        const d = new Date(now - i * 60 * 60 * 1000);
        const label = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        trafficHistoryMap[label] = { views: 0, visitors: new Set() };
      }
    } else {
      // 7 daily buckets, labelled "May 26"
      const oneDayMs = 24 * 60 * 60 * 1000;
      for (let i = 6; i >= 0; i--) {
        const label = new Date(now - i * oneDayMs).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        trafficHistoryMap[label] = { views: 0, visitors: new Set() };
      }
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const timestamp = data.timestamp?.toDate?.() || new Date();

      // Filter to selected time range
      if (timestamp < startTime) return;

      const visitorId = data.visitorId || 'unknown';
      const page = data.page || '/';

      let country = data.country || 'Nigeria';
      let city = data.city || 'Lagos';

      if (country === 'Unknown' || country === '') country = 'Nigeria';
      if (city === 'Unknown' || city === '') city = 'Lagos';

      const docCountryCode = data.countryCode || getCountryCode(country);
      const flagUrl = getFlagUrl(docCountryCode);

      // Mask IP address for privacy
      let ip = data.ip || 'unknown';
      if (ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1') {
        const parts = ip.split('.');
        if (parts.length === 4) ip = `${parts[0]}.${parts[1]}.*.*`;
      }

      uniqueVisitorsSet.add(visitorId);

      // Track page views
      if (!pageViewsMap[page]) pageViewsMap[page] = { views: 0, visitors: new Set() };
      pageViewsMap[page].views += 1;
      pageViewsMap[page].visitors.add(visitorId);

      // Track countries
      if (!countryMap[country]) countryMap[country] = { views: 0, visitors: new Set() };
      countryMap[country].views += 1;
      countryMap[country].visitors.add(visitorId);

      // Track cities
      const cityKey = `${city}, ${country}`;
      if (!cityMap[cityKey]) cityMap[cityKey] = { views: 0, country, visitors: new Set() };
      cityMap[cityKey].views += 1;
      cityMap[cityKey].visitors.add(visitorId);

      // Track traffic history bucket
      let bucketLabel: string;
      if (range === '24h') {
        bucketLabel = timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      } else {
        bucketLabel = timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      if (bucketLabel in trafficHistoryMap) {
        trafficHistoryMap[bucketLabel].views += 1;
        trafficHistoryMap[bucketLabel].visitors.add(visitorId);
      }

      // Save to recent visits list (cap at 50)
      if (visitsList.length < 50) {
        visitsList.push({ id: doc.id, visitorId, page, city, country, flagUrl, ip, timestamp });
      }
    });

    // Formatting breakdowns for charts/tables
    const pages = Object.entries(pageViewsMap)
      .map(([page, stats]) => ({
        page,
        views: stats.views,
        uniqueVisitors: stats.visitors.size,
      }))
      .sort((a, b) => b.views - a.views);

    const countries = Object.entries(countryMap)
      .map(([country, stats]) => {
        const code = getCountryCode(country);
        return {
          country,
          flagUrl: getFlagUrl(code),
          views: stats.views,
          uniqueVisitors: stats.visitors.size,
        };
      })
      .sort((a, b) => b.uniqueVisitors - a.uniqueVisitors);

    const cities = Object.entries(cityMap)
      .map(([cityKey, stats]) => {
        const cityName = cityKey.split(', ')[0];
        const code = getCountryCode(stats.country);
        return {
          city: cityName,
          country: stats.country,
          flagUrl: getFlagUrl(code),
          views: stats.views,
          uniqueVisitors: stats.visitors.size,
        };
      })
      .sort((a, b) => b.uniqueVisitors - a.uniqueVisitors);

    const trafficHistory = Object.entries(trafficHistoryMap).map(([date, stats]) => ({
      date,
      views: stats.views,
      visitors: stats.visitors.size,
    }));

    // Total filtered views = sum of all page view counts
    const totalFilteredViews = Object.values(pageViewsMap).reduce((sum, p) => sum + p.views, 0);

    return NextResponse.json({
      success: true,
      range,
      stats: {
        totalPageViews: totalFilteredViews,
        uniqueVisitors: uniqueVisitorsSet.size,
        pages,
        countries,
        cities,
        recentVisits: visitsList,
        trafficHistory,
      },
    });
  } catch (error) {
    console.error('Failed to aggregate analytics stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
