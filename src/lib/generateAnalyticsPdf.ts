/**
 * generateAnalyticsPdf.ts
 *
 * Generates a branded, multi-section PDF analytics report
 * from the stats object returned by /api/analytics/stats.
 *
 * Runs entirely client-side — no server required.
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Brand colours
const ORANGE = [232, 114, 26] as [number, number, number];
const PURPLE = [107, 63, 192] as [number, number, number];
const DARK   = [14, 10, 30]  as [number, number, number];
const LIGHT  = [250, 249, 252] as [number, number, number];
const MUTED  = [120, 110, 140] as [number, number, number];

function hex(r: number, g: number, b: number) {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function generateAnalyticsPdf(stats: any, range: '24h' | '7d') {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentW = pageW - margin * 2;
  let y = 0;

  // ─── helpers ────────────────────────────────────────────────────────────────

  const newPage = () => {
    doc.addPage();
    drawPageFooter();
    y = 20;
  };

  const guardY = (needed: number) => {
    if (y + needed > pageH - 20) newPage();
  };

  const drawPageFooter = () => {
    const total = (doc as any).internal.getNumberOfPages();
    const curr  = (doc as any).internal.getCurrentPageInfo().pageNumber;
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text(
      `Beta Narrative  ·  Analytics Report  ·  Page ${curr} of ${total}`,
      pageW / 2, pageH - 8,
      { align: 'center' }
    );
    doc.setDrawColor(...MUTED);
    doc.setLineWidth(0.2);
    doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
  };

  const sectionTitle = (title: string) => {
    guardY(14);
    doc.setFillColor(...PURPLE);
    doc.roundedRect(margin, y, contentW, 8, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), margin + 4, y + 5.5);
    y += 13;
  };

  const kv = (label: string, value: string, valueColor?: [number, number, number]) => {
    guardY(7);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED);
    doc.text(label, margin + 2, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...(valueColor ?? DARK));
    doc.text(value, margin + 60, y);
    y += 6;
  };

  // ─── cover header ───────────────────────────────────────────────────────────

  // Full-width header bar
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pageW, 42, 'F');

  // Orange accent strip
  doc.setFillColor(...ORANGE);
  doc.rect(0, 38, pageW, 4, 'F');

  // Wordmark
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Beta', margin, 18);
  doc.setTextColor(...ORANGE);
  doc.text('Narrative', margin + 22, 18);

  doc.setFontSize(8);
  doc.setTextColor(180, 170, 210);
  doc.setFont('helvetica', 'normal');
  doc.text('ANALYTICS REPORT', margin, 27);

  const now = new Date();
  const rangeLabel = range === '24h' ? 'Last 24 Hours' : 'Last 7 Days';
  const generated  = now.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  doc.setFontSize(7.5);
  doc.setTextColor(160, 150, 190);
  doc.text(`Period: ${rangeLabel}`, pageW - margin, 18, { align: 'right' });
  doc.text(`Generated: ${generated}`, pageW - margin, 25, { align: 'right' });

  y = 52;

  // ─── key metrics ────────────────────────────────────────────────────────────

  sectionTitle('Key Metrics');

  const boxH = 22;
  const boxW = (contentW - 6) / 2;

  // Unique Visitors
  doc.setFillColor(...LIGHT);
  doc.roundedRect(margin, y, boxW, boxH, 3, 3, 'F');
  doc.setDrawColor(...PURPLE);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, boxW, boxH, 3, 3, 'S');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MUTED);
  doc.text('UNIQUE VISITORS', margin + 4, y + 6);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...PURPLE);
  doc.text(String(stats.uniqueVisitors ?? 0), margin + 4, y + 18);

  // Total Page Views
  const bx2 = margin + boxW + 6;
  doc.setFillColor(...LIGHT);
  doc.roundedRect(bx2, y, boxW, boxH, 3, 3, 'F');
  doc.setDrawColor(...ORANGE);
  doc.roundedRect(bx2, y, boxW, boxH, 3, 3, 'S');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MUTED);
  doc.text('TOTAL PAGE VIEWS', bx2 + 4, y + 6);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ORANGE);
  doc.text(String(stats.totalPageViews ?? 0), bx2 + 4, y + 18);

  y += boxH + 10;

  // ─── conversion funnel ──────────────────────────────────────────────────────

  sectionTitle('Conversion Funnel');

  const uv   = stats.uniqueVisitors || 1;
  const fs   = stats.conversions?.formSubmissions   || 0;
  const bc   = stats.conversions?.bookingsCompleted || 0;
  const fsPct = Math.round((fs / uv) * 100);
  const bcPct = Math.round((bc / uv) * 100);

  const stages = [
    { label: '1. Total Visitors',     value: uv, pct: 100,   color: PURPLE },
    { label: '2. Profiles Submitted', value: fs, pct: fsPct, color: [99, 102, 241] as [number,number,number] },
    { label: '3. Calls Scheduled',    value: bc, pct: bcPct, color: [52, 211, 153] as [number,number,number] },
  ];

  for (const s of stages) {
    guardY(13);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...DARK);
    doc.text(s.label, margin + 2, y + 4);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...s.color);
    doc.text(`${s.value}  (${s.pct}%)`, margin + 80, y + 4);

    // progress bar background
    doc.setFillColor(220, 215, 235);
    doc.roundedRect(margin + 2, y + 6, contentW - 4, 3, 1, 1, 'F');
    // fill
    const fillW = Math.max(((s.pct / 100) * (contentW - 4)), 2);
    doc.setFillColor(...s.color);
    doc.roundedRect(margin + 2, y + 6, fillW, 3, 1, 1, 'F');

    y += 14;
  }

  y += 4;

  // ─── referral sources ───────────────────────────────────────────────────────

  if (stats.referrers && stats.referrers.length > 0) {
    sectionTitle('Referral Sources');
    guardY(10);
    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Source', 'Page Views']],
      body: stats.referrers.map((r: any) => [r.name, r.count]),
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: PURPLE, textColor: 255, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: [245, 243, 252] },
      columnStyles: { 1: { halign: 'right', fontStyle: 'bold' } },
    });
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // ─── CTA engagement ─────────────────────────────────────────────────────────

  if (stats.ctaClicks && stats.ctaClicks.length > 0) {
    sectionTitle('CTA Button Engagement');
    guardY(10);
    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Button', 'Clicks']],
      body: stats.ctaClicks.map((c: any) => [
        c.name.replace('package:', '').replace(/_/g, ' '),
        c.count,
      ]),
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: ORANGE, textColor: 255, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: [255, 248, 240] },
      columnStyles: { 1: { halign: 'right', fontStyle: 'bold' } },
    });
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // ─── top pages ──────────────────────────────────────────────────────────────

  if (stats.pages && stats.pages.length > 0) {
    sectionTitle('Top Pages');
    guardY(10);
    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Page', 'Views', 'Unique Visitors']],
      body: stats.pages.slice(0, 20).map((p: any) => [p.page, p.views, p.uniqueVisitors]),
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: DARK, textColor: 255, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: [245, 245, 250] },
      columnStyles: {
        1: { halign: 'right' },
        2: { halign: 'right', fontStyle: 'bold' },
      },
    });
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // ─── visitor countries ──────────────────────────────────────────────────────

  if (stats.countries && stats.countries.length > 0) {
    sectionTitle('Visitor Countries');
    guardY(10);
    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Country', 'Views', 'Unique Visitors']],
      body: stats.countries.slice(0, 30).map((c: any) => [c.country, c.views, c.uniqueVisitors]),
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: PURPLE, textColor: 255, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: [245, 243, 252] },
      columnStyles: {
        1: { halign: 'right' },
        2: { halign: 'right', fontStyle: 'bold' },
      },
    });
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // ─── traffic history ────────────────────────────────────────────────────────

  if (stats.trafficHistory && stats.trafficHistory.length > 0) {
    sectionTitle(`Traffic History (${rangeLabel})`);
    guardY(10);
    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Period', 'Views', 'Unique Visitors']],
      body: stats.trafficHistory.map((h: any) => [h.date, h.views, h.visitors]),
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: DARK, textColor: 255, fontStyle: 'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: [245, 245, 250] },
      columnStyles: {
        1: { halign: 'right' },
        2: { halign: 'right', fontStyle: 'bold' },
      },
    });
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // ─── recent visits ──────────────────────────────────────────────────────────

  if (stats.recentVisits && stats.recentVisits.length > 0) {
    sectionTitle('Recent Visitor Activity');
    guardY(10);
    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Time', 'Visitor ID', 'Location', 'Referrer']],
      body: stats.recentVisits.slice(0, 30).map((v: any) => [
        new Date(v.timestamp).toLocaleString('en-US', {
          month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit',
        }),
        v.visitorId?.slice(0, 10) + '…',
        `${v.city}, ${v.country}`,
        v.referrer || 'Direct',
      ]),
      styles: { fontSize: 7.5, cellPadding: 2.5, overflow: 'ellipsize' },
      headStyles: { fillColor: DARK, textColor: 255, fontStyle: 'bold', fontSize: 7 },
      alternateRowStyles: { fillColor: [245, 245, 250] },
      columnStyles: {
        0: { cellWidth: 28 },
        1: { cellWidth: 28, font: 'courier' },
        2: { cellWidth: 40 },
        3: { cellWidth: 'auto' },
      },
    });
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // ─── footer on every page ───────────────────────────────────────────────────

  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawPageFooter();
  }

  // ─── save ───────────────────────────────────────────────────────────────────

  const dateSlug = now.toISOString().slice(0, 10);
  doc.save(`betanarrative-analytics-${range}-${dateSlug}.pdf`);
}
