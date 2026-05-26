'use client';

/**
 * WordPress-Style Admin Dashboard Page
 * 
 * Provides a structured, modern tabbed customizer dashboard to edit all site content stored in Firestore.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { SiteContent } from '@/types';
import { defaultSiteContent } from '@/lib/default-content';
import { 
    LogOut, Save, RefreshCw, CheckCircle, AlertCircle, 
    Layout, FileText, Settings, Database, Plus, Trash2, 
    Server, Check, ArrowRight, ExternalLink, Menu, X, 
    Sparkles, HelpCircle, Eye, Edit3, ArrowUpRight, Award, Compass, MessageSquare,
    BarChart, LayoutGrid, Target, ShieldCheck, TrendingUp, Tag, Mail, Layers,
    RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Subcomponents for Live Mock Previews
function HeroPreview({ eyebrow, title, titleEmphasis, titleHighlight, subtitle, ctaText }: any) {
    return (
        <div className="border border-[#BCAED9]/25 rounded-2xl bg-white p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-2 right-3 text-[10px] uppercase tracking-wider text-[#3D2A6E]/40 font-semibold flex items-center gap-1 select-none">
                <Sparkles size={10} className="text-[#E8721A]" /> Live Preview
            </div>
            <div className="space-y-3 pt-2">
                <span className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-[#E8721A]">
                    {eyebrow || 'Eyebrow Text'}
                </span>
                <h1 className="font-serif text-xl sm:text-2xl text-[#1A0E35] leading-tight">
                    {title || 'Your expertise is'}{' '}
                    <em className="italic text-[#E8721A]">{titleEmphasis || 'undeniable.'}</em>{' '}
                    <span className="text-[#6B3FC0]">{titleHighlight || "Your visibility shouldn't lag behind."}</span>
                </h1>
                <p className="text-xs text-[#3D2A6E]/80 leading-relaxed">
                    {subtitle || 'Subtitle explanation paragraph...'}
                </p>
                <div className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase text-white bg-[#E8721A] px-4 py-2 rounded-full">
                    {ctaText || 'Button Text'}
                </div>
            </div>
        </div>
    );
}

function PainPreview({ sectionLabel, title, titleEmphasis, lead, items }: any) {
    return (
        <div className="border border-[#BCAED9]/25 rounded-2xl bg-[#E4DAEF]/40 p-6 shadow-sm">
            <div className="space-y-3">
                <span className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-[#6B3FC0]">
                    {sectionLabel || 'Section Label'}
                </span>
                <h2 className="font-serif text-lg text-[#1A0E35] leading-snug">
                    {title || 'Title'}{' '}
                    <em className="italic text-[#E8721A]">{titleEmphasis || 'Emphasis'}</em>
                </h2>
                <p className="text-[11px] text-[#6B3FC0]/85 leading-relaxed">{lead || 'Lead paragraph text...'}</p>
                {(items || []).length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#BCAED9]/15">
                        {(items || []).map((item: string, idx: number) => (
                            <div key={idx} className="flex gap-2 items-start text-[10px] text-[#1A0E35]/85">
                                <span className="text-[#E8721A] mt-0.5 shrink-0">⚠</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function ValuePreview({ sectionLabel, title, titleEmphasis, body, credentials, profileName, profileRole, profileLinkedin, profileImage }: any) {
    return (
        <div className="border border-[#BCAED9]/25 rounded-2xl bg-white p-6 shadow-sm">
            <div className="space-y-4">
                <div>
                    <span className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-[#6B3FC0]">
                        {sectionLabel || 'Section Label'}
                    </span>
                    <h2 className="font-serif text-lg text-[#1A0E35] leading-snug mt-1">
                        {title || 'Title'}{' '}
                        <em className="italic text-[#E8721A]">{titleEmphasis || 'Emphasis'}</em>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
                    <div className="order-2 sm:order-1 sm:col-span-3 text-[10px] text-[#1A0E35]/80 leading-relaxed whitespace-pre-line">
                        {body || 'Body description paragraph...'}
                    </div>
                    <div className="order-1 sm:order-2 sm:col-span-2 flex flex-col items-center bg-[#FAF9FC] p-3 rounded-xl border border-[#E4DAEF]/50 relative group shrink-0">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#6B3FC0]/30 mb-1.5">
                            <img
                                src={profileImage || "/images/Favour.JPG"}
                                alt="Profile mockup"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-center min-w-0 w-full">
                            <div className="text-[9px] font-bold text-[#1A0E35] truncate">{profileName || "Favour Egbogun"}</div>
                            <div className="text-[7.5px] text-[#6B3FC0] font-bold uppercase tracking-wider truncate mt-0.5">{profileRole || "Communications Strategist"}</div>
                        </div>
                        {profileLinkedin && (
                            <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-[#6B3FC0]/10 text-[#6B3FC0] flex items-center justify-center text-[7px] font-bold">
                                in
                            </div>
                        )}
                    </div>
                </div>

                {(credentials || []).length > 0 && (
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#BCAED9]/15">
                        {(credentials || []).map((cred: any, idx: number) => (
                            <div key={idx} className="text-center">
                                <div className="text-[#E8721A] text-xs font-bold font-serif">{cred.number || '0'}</div>
                                <div className="text-[8px] text-[#3D2A6E]/60 leading-tight mt-1">{cred.label || 'Label'}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function OfferPreview({ packageName, badge, tagline, hook, price, priceSecond, priceNote, description, includes }: any) {
    return (
        <div className="border border-[#E8721A]/20 rounded-2xl bg-gradient-to-b from-[#E8721A]/5 to-[#6B3FC0]/5 p-5 shadow-sm">
            <div className="space-y-3">
                <span className="inline-block text-[9px] font-semibold bg-[#E8721A]/10 text-[#E8721A] px-2 py-0.5 rounded">
                    {badge || 'Badge'}
                </span>
                <h3 className="font-serif text-sm font-bold text-[#1A0E35] tracking-wide">{packageName || 'PLAN NAME'}</h3>
                <p className="text-[10px] text-[#3D2A6E]/70 italic">{tagline || 'Tagline description'}</p>
                <div className="py-1.5 border-t border-[#BCAED9]/15 flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-base font-serif font-bold text-[#6B3FC0]">{price || 'Price'}</span>
                    {priceSecond && (
                        <span className="text-[10px] text-[#E8721A]">or {priceSecond}</span>
                    )}
                    {priceNote && (
                        <span className="text-[9px] text-[#3D2A6E]/50 ml-auto">{priceNote}</span>
                    )}
                </div>
                {hook && (
                    <div className="p-2.5 rounded-lg bg-white/70 border border-[#BCAED9]/10 text-[10px] text-[#1A0E35] italic leading-relaxed">
                        &ldquo;{hook}&rdquo;
                    </div>
                )}
                {description && (
                    <div className="pt-2 border-t border-[#BCAED9]/15">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#3D2A6E]/50 mb-1.5">Overview</p>
                        <p className="text-[10px] text-[#3D2A6E]/80 leading-relaxed whitespace-pre-line">{description}</p>
                    </div>
                )}
                {(includes || []).filter((item: string) => item && item.trim() !== '').length > 0 && (
                    <div className="pt-2 border-t border-[#BCAED9]/15 space-y-1.5">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#3D2A6E]/50 mb-1.5">What&apos;s included</p>
                        {(includes || []).filter((item: string) => item && item.trim() !== '').map((item: string, idx: number) => (
                            <div key={idx} className="flex gap-1.5 items-start text-[10px] text-[#1A0E35]/85">
                                <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Visual Form Field component
function FormField({
    label,
    value,
    onChange,
    multiline = false,
    placeholder = '',
    helper = '',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    placeholder?: string;
    helper?: string;
}) {
    const baseClasses =
        'w-full px-4 py-3 bg-[#130E26]/50 border border-white/15 rounded-2xl text-sm text-white placeholder-white/25 focus:border-[#E8721A] focus:ring-1 focus:ring-[#E8721A] focus:outline-none transition-all duration-200';

    return (
        <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-white/75 uppercase tracking-wider">
                    {label}
                </label>
                {helper && (
                    <span className="text-[10px] text-white/40 italic font-normal">
                        {helper}
                    </span>
                )}
            </div>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={4}
                    className={`${baseClasses} resize-none`}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={baseClasses}
                />
            )}
        </div>
    );
}

function MockupWindow({ children }: { children: React.ReactNode }) {
    return (
        <div className="border border-[#E4DAEF] rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            {/* Window chrome header */}
            <div className="bg-[#FAF9FC] border-b border-[#E4DAEF]/70 px-4 py-3 flex items-center justify-between select-none">
                <div className="flex gap-1.5 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
                </div>
                <div className="px-3 py-1 bg-white border border-[#E4DAEF]/50 rounded-lg text-[9px] text-[#3D2A6E]/50 font-mono tracking-wide w-40 text-center truncate">
                    betanarrative.com
                </div>
                <div className="w-10" />
            </div>
            
            {/* Window frame content */}
            <div className="p-5 bg-white overflow-y-auto max-h-[680px]">
                {children}
            </div>
        </div>
    );
}

type TabType = 'dashboard' | 'hero' | 'pain' | 'value' | 'results' | 'offer' | 'contact';

export default function AdminDashboardPage() {
    const { user, logout } = useAuth();
    const [content, setContent] = useState<SiteContent | null>(null);
    const [originalContent, setOriginalContent] = useState<SiteContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [saveError, setSaveError] = useState<string>('');
    const [saveAction, setSaveAction] = useState<'draft' | 'publish'>('draft');
    
    // Customizer layout states
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [offerActiveTab, setOfferActiveTab] = useState<number>(0);
    const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/content');
            const data = await response.json();
            if (data.success) {
                const contentData = data.content;
                // Safe migration fallback
                if (contentData && contentData.offer && !('offers' in contentData.offer)) {
                    contentData.offer = defaultSiteContent.offer;
                }
                setContent(contentData);
                setOriginalContent(JSON.parse(JSON.stringify(contentData)));
            }
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch content on mount
    useEffect(() => {
        fetchContent();
    }, []);

    const handleSave = async (action: 'draft' | 'publish' = 'draft') => {
        if (!content) return;

        try {
            setSaving(true);
            setSaveAction(action);
            setSaveStatus('idle');

            const token = await user?.getIdToken();

            const response = await fetch('/api/content', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    action,
                    content: {
                        hero: content.hero,
                        pain: content.pain,
                        value: content.value,
                        results: content.results,
                        offer: content.offer,
                        contact: content.contact,
                    },
                }),
            });

            if (response.ok) {
                setSaveStatus('success');
                setOriginalContent(JSON.parse(JSON.stringify(content)));
                setTimeout(() => setSaveStatus('idle'), 4000);
            } else {
                const data = await response.json().catch(() => ({}));
                setSaveError(data.error || `Server error ${response.status}`);
                setSaveStatus('error');
            }
        } catch (error) {
            console.error('Error saving content:', error);
            setSaveError(error instanceof Error ? error.message : 'Network error');
            setSaveStatus('error');
        } finally {
            setSaving(false);
        }
    };

    const undoSectionChanges = (sectionKey: keyof Omit<SiteContent, 'id' | 'updatedAt'>) => {
        if (!originalContent || !content) return;
        setContent({
            ...content,
            [sectionKey]: JSON.parse(JSON.stringify(originalContent[sectionKey])),
        });
    };

    // Form Update Handlers
    const updateHero = (field: string, value: string) => {
        if (!content) return;
        setContent({
            ...content,
            hero: { ...content.hero, [field]: value },
        });
    };

    const updatePain = (field: string, value: string | string[]) => {
        if (!content) return;
        setContent({
            ...content,
            pain: { ...content.pain, [field]: value },
        });
    };

    // Pain points array editing
    const updatePainItem = (index: number, value: string) => {
        if (!content || !content.pain?.items) return;
        const updatedItems = [...content.pain.items];
        updatedItems[index] = value;
        setContent({
            ...content,
            pain: { ...content.pain, items: updatedItems },
        });
    };

    const addPainItem = () => {
        if (!content) return;
        const items = content.pain?.items || [];
        setContent({
            ...content,
            pain: { ...content.pain, items: [...items, ''] },
        });
    };

    const removePainItem = (index: number) => {
        if (!content || !content.pain?.items) return;
        const updatedItems = content.pain.items.filter((_, i) => i !== index);
        setContent({
            ...content,
            pain: { ...content.pain, items: updatedItems },
        });
    };

    const updateValue = (field: string, value: string) => {
        if (!content) return;
        setContent({
            ...content,
            value: { ...content.value, [field]: value },
        });
    };

    // Credentials array editing
    const updateCredential = (index: number, field: string, value: string) => {
        if (!content || !content.value?.credentials) return;
        const updatedCreds = [...content.value.credentials];
        updatedCreds[index] = {
            ...updatedCreds[index],
            [field]: value
        };
        setContent({
            ...content,
            value: { ...content.value, credentials: updatedCreds },
        });
    };

    const addCredential = () => {
        if (!content) return;
        const creds = content.value?.credentials || [];
        setContent({
            ...content,
            value: { 
                ...content.value, 
                credentials: [...creds, { number: '10×', label: 'Metric label text' }] 
            },
        });
    };

    const removeCredential = (index: number) => {
        if (!content || !content.value?.credentials) return;
        const updatedCreds = content.value.credentials.filter((_, i) => i !== index);
        setContent({
            ...content,
            value: { ...content.value, credentials: updatedCreds },
        });
    };

    const updateResults = (field: string, value: string) => {
        if (!content) return;
        setContent({
            ...content,
            results: { ...content.results, [field]: value },
        });
    };

    // Results cards array editing
    const updateResultItem = (index: number, field: string, value: string) => {
        if (!content || !content.results?.results) return;
        const updatedResultsList = [...content.results.results];
        updatedResultsList[index] = {
            ...updatedResultsList[index],
            [field]: value
        };
        setContent({
            ...content,
            results: { ...content.results, results: updatedResultsList },
        });
    };

    const addResultItem = () => {
        if (!content) return;
        const items = content.results?.results || [];
        setContent({
            ...content,
            results: {
                ...content.results,
                results: [...items, { stat: '10%', description: 'Stat outcome description' }]
            },
        });
    };

    const removeResultItem = (index: number) => {
        if (!content || !content.results?.results) return;
        const updatedResultsList = content.results.results.filter((_, i) => i !== index);
        setContent({
            ...content,
            results: { ...content.results, results: updatedResultsList },
        });
    };

    const updateOfferSection = (field: string, value: string) => {
        if (!content) return;
        setContent({
            ...content,
            offer: { ...content.offer, [field]: value },
        });
    };

    const updateOfferPlan = (index: number, field: string, value: any) => {
        if (!content || !content.offer || !content.offer.offers) return;
        const updatedOffers = [...content.offer.offers];
        updatedOffers[index] = {
            ...updatedOffers[index],
            [field]: value,
        };
        setContent({
            ...content,
            offer: { ...content.offer, offers: updatedOffers },
        });
    };

    const updateContact = (field: string, value: string) => {
        if (!content) return;
        setContent({
            ...content,
            contact: { ...content.contact, [field]: value },
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#EEE8F8] flex flex-col items-center justify-center">
                <RefreshCw className="w-8 h-8 text-[#E8721A] animate-spin mb-4" />
                <div className="text-[#3D2A6E] font-medium text-sm tracking-wide">Loading Beta Narrative Dashboard...</div>
            </div>
        );
    }

    // Sidebar navigation definitions
    const sidebarMenuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, section: 'core' },
        { id: 'hero', label: 'Hero Header', icon: Layers, section: 'pages' },
        { id: 'pain', label: 'Pain Section', icon: Target, section: 'pages' },
        { id: 'value', label: 'Value Section', icon: ShieldCheck, section: 'pages' },
        { id: 'results', label: 'Results Section', icon: TrendingUp, section: 'pages' },
        { id: 'offer', label: 'Offer Section', icon: Tag, section: 'pages' },
        { id: 'contact', label: 'Contact Section', icon: Mail, section: 'pages' },
    ];

    const getBreadcrumbName = (tab: TabType) => {
        if (tab === 'dashboard') return 'Overview';
        const item = sidebarMenuItems.find(i => i.id === tab);
        return item ? `Edit Section > ${item.label}` : 'Section Settings';
    };

    return (
        <div className="h-screen bg-[#07050F] flex flex-col md:flex-row text-white antialiased relative overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#6B3FC0]/15 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#E8721A]/10 blur-[160px] pointer-events-none" />
            <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/8 blur-[140px] pointer-events-none" />
            
            {/* Sidebar drawer on mobile / static on desktop */}
            <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#0E0A1E]/80 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 flex flex-col justify-between ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}>
                
                <div>
                    {/* Header Logo */}
                    <div className="p-6 border-b border-white/5 bg-black/20 flex items-center justify-between">
                        <div>
                            <Link href="/" target="_blank" className="flex items-center gap-1.5 font-serif text-lg tracking-wide text-white group">
                                <span className="font-normal">Beta</span>
                                <span className="text-[#E8721A] font-medium">Narrative</span>
                                <ArrowUpRight size={13} className="text-[#8B5CF6] group-hover:text-[#E8721A] transition-colors" />
                            </Link>
                            <div className="text-[9px] uppercase tracking-widest text-[#8B5CF6] mt-1 font-semibold">
                                Content Customizer
                            </div>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white/80 hover:text-[#E8721A]">
                            <X size={18} />
                        </button>
                    </div>
                    {/* Navigation Menu */}
                    <nav className="p-4 space-y-6">
                        
                        {/* Logout & User Info */}
                        <div className="px-3 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
                            <div className="overflow-hidden">
                                <p className="text-[8px] text-white/30 uppercase tracking-widest font-bold">Session Email</p>
                                <p className="text-[11px] text-white/80 truncate font-semibold mt-0.5" title={user?.email || ''}>{user?.email}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#E8721A]/10 border border-[#E8721A]/20 text-[#E8721A] hover:bg-[#E8721A] hover:text-white rounded-xl text-xs font-bold transition-all duration-200 select-none shadow-[0_2px_8px_rgba(232,114,26,0.05)] active:scale-[0.97]"
                            >
                                <LogOut size={13} />
                                <span>Log Out</span>
                            </button>
                        </div>

                        {/* Dashboard Group */}
                        <div>
                            <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest px-3 mb-2 select-none">
                                Main Admin
                            </div>
                            <div className="space-y-1">
                                {sidebarMenuItems.filter(i => i.section === 'core').map(item => {
                                    const Icon = item.icon;
                                    const active = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActiveTab(item.id as TabType); setSidebarOpen(false); }}
                                            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                                                active 
                                                    ? 'bg-gradient-to-r from-[#6B3FC0] to-[#8B5CF6] text-white shadow-[0_0_20px_rgba(107,63,192,0.3)]' 
                                                     : 'text-white/60 hover:text-white hover:bg-white/5'
                                            }`}
                                        >
                                            <Icon size={16} />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Page Sections Group */}
                        <div>
                            <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest px-3 mb-2 select-none">
                                Landing Sections
                            </div>
                            <div className="space-y-1">
                                {sidebarMenuItems.filter(i => i.section === 'pages').map(item => {
                                    const Icon = item.icon;
                                    const active = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActiveTab(item.id as TabType); setSidebarOpen(false); }}
                                            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                                                active 
                                                    ? 'bg-gradient-to-r from-[#E8721A] to-[#F5A96A] text-white shadow-[0_0_20px_rgba(232,114,26,0.25)]' 
                                                     : 'text-white/60 hover:text-white hover:bg-white/5'
                                            }`}
                                        >
                                            <Icon size={16} />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Settings & Core section removed */}

                    </nav>
                </div>

            </aside>

            {/* Main Editor Panel */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
                
                {/* Sticky Header Actions */}
                <header className="sticky top-0 z-40 bg-[#07050F] border-b border-white/5 h-16 flex items-center justify-between px-4 sm:px-6">
                    
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden p-2 text-white/80 hover:text-[#E8721A] hover:bg-white/5 rounded-xl transition-all shrink-0"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="min-w-0">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-[#8B5CF6] block leading-none">
                                Beta Narrative CMS
                            </span>
                            <span className="text-[11px] sm:text-xs font-semibold text-white mt-1 block truncate max-w-[100px] xs:max-w-[140px] sm:max-w-none">
                                {getBreadcrumbName(activeTab)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                        <a
                            href="/?preview=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 sm:px-4 sm:py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all select-none"
                            title="Open landing page with dynamic draft preview in a new tab"
                        >
                            <Eye size={14} className="sm:w-3.5 sm:h-3.5" />
                            <span className="hidden sm:inline">Preview Draft</span>
                        </a>

                        <button
                            onClick={() => handleSave('draft')}
                            disabled={saving}
                            title="Save Draft copy in draft collection"
                            className="p-2 sm:px-4 sm:py-2.5 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white rounded-2xl text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed select-none"
                        >
                            {saving && saveAction === 'draft' ? (
                                <RefreshCw size={14} className="animate-spin sm:w-3.5 sm:h-3.5" />
                            ) : (
                                <FileText size={14} className="sm:w-3.5 sm:h-3.5" />
                            )}
                            <span className="hidden sm:inline">Save Draft</span>
                        </button>

                        <button
                            onClick={() => handleSave('publish')}
                            disabled={saving}
                            title="Publish content to live database"
                            className="relative p-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-[#E8721A] to-[#F08C3A] hover:shadow-[0_0_24px_rgba(232,114,26,0.4)] text-white rounded-2xl text-xs font-extrabold tracking-wide flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ring-1 ring-white/10 select-none"
                        >
                            {saving && saveAction === 'publish' ? (
                                <RefreshCw size={14} className="animate-spin sm:w-3.5 sm:h-3.5" />
                            ) : (
                                <Check size={14} className="sm:w-3.5 sm:h-3.5" />
                            )}
                            <span className="hidden sm:inline">Publish Live</span>
                        </button>
                    </div>

                </header>

                {/* Body Area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-6xl w-full mx-auto">
                    


                    {/* Active Editor Panel Router */}
                    <div className="bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-4 sm:p-6 md:p-8 min-h-[500px]">
                        
                        {/* 1. DASHBOARD VIEW */}
                        {activeTab === 'dashboard' && (
                            <div className="space-y-8">
                                
                                {/* Welcome Header */}
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#6B3FC0] via-[#5a32a3] to-[#1A0E35] text-white relative overflow-hidden shadow-lg border border-[#BCAED9]/10">
                                    <div className="absolute top-[-50%] right-[-20%] w-96 h-96 rounded-full bg-[#E8721A]/20 blur-[80px] pointer-events-none" />
                                    <div className="absolute bottom-[-40%] left-[-10%] w-72 h-72 rounded-full bg-[#8B5CF6]/30 blur-[70px] pointer-events-none" />
                                    
                                    <div className="relative z-10 space-y-4">
                                        <div className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase bg-[#E8721A] text-white px-3 py-1 rounded-full shadow-sm">
                                            Command Center
                                        </div>
                                        <h2 className="font-serif text-3xl font-normal leading-tight">
                                            Design & Customize Your Brand Presence.
                                        </h2>
                                        <p className="text-[#D9CFF2]/90 text-xs leading-relaxed max-w-2xl font-light">
                                            Modify copy, structure, price points, and highlights across the entire landing page. All edits are updated on the live site instantly upon saving.
                                        </p>
                                        <div className="pt-2 flex flex-wrap gap-3">
                                            <a href="/" target="_blank" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8721A] hover:bg-[#C05A0E] transition-all text-xs font-semibold rounded-xl shadow-md hover:shadow-lg">
                                                <span>Visit Website</span>
                                                <ExternalLink size={13} />
                                            </a>
                                            <button onClick={() => setActiveTab('hero')} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 transition-all text-xs font-semibold rounded-xl border border-white/10 backdrop-blur-sm">
                                                <span>Begin Customizing</span>
                                                <ArrowRight size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                {/* Visual Landing Page Flow Map */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Landing Page Architecture</h3>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        
                                        {/* Card 1: Hero */}
                                        <div 
                                            onClick={() => setActiveTab('hero')}
                                            className="p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#6B3FC0]/50 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#6B3FC0]/10 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2.5 bg-[#6B3FC0]/15 text-[#A78BFA] rounded-xl">
                                                    <Layers size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-white">1. Hero Section</h4>
                                                    <span className="text-[9px] font-bold text-[#E8721A] bg-[#E8721A]/10 px-2 py-0.5 rounded-full">Top Banner</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-white/60 leading-relaxed font-light mb-4">
                                                The hook of the page. Sets eyebrow texts, main bold titles, and italicized emphasis tags.
                                            </p>
                                            <div className="flex items-center text-xs font-bold text-[#A78BFA] group-hover:translate-x-1.5 transition-transform duration-300">
                                                <span>Customize Page Hook</span>
                                                <ArrowRight size={14} className="ml-1" />
                                            </div>
                                        </div>

                                        {/* Card 2: Pain */}
                                        <div 
                                            onClick={() => setActiveTab('pain')}
                                            className="p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#6B3FC0]/50 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#6B3FC0]/10 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2.5 bg-[#6B3FC0]/15 text-[#A78BFA] rounded-xl">
                                                    <Target size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-white">2. Pain Points</h4>
                                                    <span className="text-[9px] font-bold text-[#6B3FC0] bg-[#6B3FC0]/10 px-2 py-0.5 rounded-full">Conflict</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-white/60 leading-relaxed font-light mb-4">
                                                States the user&apos;s dilemma. Lists up to 4 major warning items that outline why they need a personal brand.
                                            </p>
                                            <div className="flex items-center text-xs font-bold text-[#A78BFA] group-hover:translate-x-1.5 transition-transform duration-300">
                                                <span>Edit Audience Pain</span>
                                                <ArrowRight size={14} className="ml-1" />
                                            </div>
                                        </div>

                                        {/* Card 3: Value */}
                                        <div 
                                            onClick={() => setActiveTab('value')}
                                            className="p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#6B3FC0]/50 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#6B3FC0]/10 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2.5 bg-[#6B3FC0]/15 text-[#A78BFA] rounded-xl">
                                                    <ShieldCheck size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-white">3. Value Pillar</h4>
                                                    <span className="text-[9px] font-bold text-[#6B3FC0] bg-[#6B3FC0]/10 px-2 py-0.5 rounded-full">Resolution</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-white/60 leading-relaxed font-light mb-4">
                                                Resolves conflicts by presenting your core credentials, brand pillars, and numerical milestones.
                                            </p>
                                            <div className="flex items-center text-xs font-bold text-[#A78BFA] group-hover:translate-x-1.5 transition-transform duration-300">
                                                <span>Configure Credentials</span>
                                                <ArrowRight size={14} className="ml-1" />
                                            </div>
                                        </div>

                                        {/* Card 4: Results */}
                                        <div 
                                            onClick={() => setActiveTab('results')}
                                            className="p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#6B3FC0]/50 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#6B3FC0]/10 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2.5 bg-[#E8721A]/15 text-[#F5A96A] rounded-xl">
                                                    <TrendingUp size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-white">4. Results Metrics</h4>
                                                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">Evidence</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-white/60 leading-relaxed font-light mb-4">
                                                Highlights the direct outcome of your executive strategy, showing quantitative client statistics.
                                            </p>
                                            <div className="flex items-center text-xs font-bold text-[#A78BFA] group-hover:translate-x-1.5 transition-transform duration-300">
                                                <span>Edit Outcome Cards</span>
                                                <ArrowRight size={14} className="ml-1" />
                                            </div>
                                        </div>

                                        {/* Card 5: Offer */}
                                        <div 
                                            onClick={() => setActiveTab('offer')}
                                            className="p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#6B3FC0]/50 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#6B3FC0]/10 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2.5 bg-[#E8721A]/15 text-[#F5A96A] rounded-xl">
                                                    <Tag size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-white">5. Pricing Tiers</h4>
                                                    <span className="text-[9px] font-bold text-[#E8721A] bg-[#E8721A]/10 px-2 py-0.5 rounded-full">Tiers</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-white/60 leading-relaxed font-light mb-4">
                                                Defines prices, taglines, quotes, and points included in the Starter and Executive brand plans.
                                            </p>
                                            <div className="flex items-center text-xs font-bold text-[#A78BFA] group-hover:translate-x-1.5 transition-transform duration-300">
                                                <span>Edit Plan Pricing</span>
                                                <ArrowRight size={14} className="ml-1" />
                                            </div>
                                        </div>

                                        {/* Card 6: Contact */}
                                        <div 
                                            onClick={() => setActiveTab('contact')}
                                            className="p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-[#6B3FC0]/50 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#6B3FC0]/10 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2.5 bg-[#E8721A]/15 text-[#F5A96A] rounded-xl">
                                                    <Mail size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-white">6. Lead Acquisition</h4>
                                                    <span className="text-[9px] font-bold text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded-full border border-blue-500/20">Conversion</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-white/60 leading-relaxed font-light mb-4">
                                                The final CTA section. Edit heading copy, email targets, and footer privacy disclaimers.
                                            </p>
                                            <div className="flex items-center text-xs font-bold text-[#A78BFA] group-hover:translate-x-1.5 transition-transform duration-300">
                                                <span>Update Form Settings</span>
                                                <ArrowRight size={14} className="ml-1" />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        )}

                        {/* 2. HERO EDIT SECTION */}
                        {activeTab === 'hero' && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className={`lg:col-span-7 ${showPreviewOnMobile ? 'hidden lg:block' : 'block'}`}>
                                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
                                        <h3 className="font-serif text-lg text-white">Edit Hero Section</h3>
                                        <button
                                            onClick={() => undoSectionChanges('hero')}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/10 shadow-sm"
                                            title="Revert this section back to its last saved state"
                                        >
                                            <RotateCcw size={13} />
                                            <span>Undo Changes</span>
                                        </button>
                                    </div>
                                    
                                    <FormField
                                        label="Hero Eyebrow Text"
                                        value={content?.hero?.eyebrow || ''}
                                        onChange={(v) => updateHero('eyebrow', v)}
                                        placeholder="Executive Brand Strategy"
                                        helper="Small capitalized tag at the top"
                                    />
                                    
                                    <FormField
                                        label="Primary Title"
                                        value={content?.hero?.title || ''}
                                        onChange={(v) => updateHero('title', v)}
                                        placeholder="Your expertise is"
                                        helper="Beginning text of your main header"
                                    />
                                    
                                    <FormField
                                        label="Title Emphasis (Italics)"
                                        value={content?.hero?.titleEmphasis || ''}
                                        onChange={(v) => updateHero('titleEmphasis', v)}
                                        placeholder="undeniable."
                                        helper="This word renders in orange italic font style"
                                    />
                                    
                                    <FormField
                                        label="Title Highlight Text"
                                        value={content?.hero?.titleHighlight || ''}
                                        onChange={(v) => updateHero('titleHighlight', v)}
                                        placeholder="Your visibility shouldn't lag behind."
                                        helper="Follow-up highlight text in the header"
                                    />
                                    
                                    <FormField
                                        label="Hero Subtitle"
                                        value={content?.hero?.subtitle || ''}
                                        onChange={(v) => updateHero('subtitle', v)}
                                        placeholder="Subtitle text..."
                                        multiline
                                        helper="Description paragraph explaining the core value"
                                    />
                                    
                                    <FormField
                                        label="Call To Action Button Label"
                                        value={content?.hero?.ctaText || ''}
                                        onChange={(v) => updateHero('ctaText', v)}
                                        placeholder="Claim Your Spot"
                                        helper="Wording inside the main landing page button"
                                    />
                                </div>

                                <div className={`lg:col-span-5 ${showPreviewOnMobile ? 'block' : 'hidden lg:block'} space-y-6`}>
                                    <h4 className="font-semibold text-xs text-[#3D2A6E]/85 uppercase tracking-widest pl-1">Live Preview Frame</h4>
                                    <MockupWindow>
                                        <HeroPreview 
                                            eyebrow={content?.hero?.eyebrow}
                                            title={content?.hero?.title}
                                            titleEmphasis={content?.hero?.titleEmphasis}
                                            titleHighlight={content?.hero?.titleHighlight}
                                            subtitle={content?.hero?.subtitle}
                                            ctaText={content?.hero?.ctaText}
                                        />
                                    </MockupWindow>
                                </div>
                            </div>
                        )}

                        {/* 3. PAIN EDIT SECTION */}
                        {activeTab === 'pain' && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className={`lg:col-span-7 ${showPreviewOnMobile ? 'hidden lg:block' : 'block'}`}>
                                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
                                        <h3 className="font-serif text-lg text-white">Edit Pain Points Section</h3>
                                        <button
                                            onClick={() => undoSectionChanges('pain')}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/10 shadow-sm"
                                            title="Revert this section back to its last saved state"
                                        >
                                            <RotateCcw size={13} />
                                            <span>Undo Changes</span>
                                        </button>
                                    </div>
                                    
                                    <FormField
                                        label="Section Eyebrow Label"
                                        value={content?.pain?.sectionLabel || ''}
                                        onChange={(v) => updatePain('sectionLabel', v)}
                                        placeholder="The Problem"
                                    />

                                    <FormField
                                        label="Main Title Text"
                                        value={content?.pain?.title || ''}
                                        onChange={(v) => updatePain('title', v)}
                                        placeholder="You're leading rooms."
                                    />

                                    <FormField
                                        label="Italicized Title Emphasis"
                                        value={content?.pain?.titleEmphasis || ''}
                                        onChange={(v) => updatePain('titleEmphasis', v)}
                                        placeholder="The internet doesn't know it."
                                    />

                                    <FormField
                                        label="Introductory Lead Text"
                                        value={content?.pain?.lead || ''}
                                        onChange={(v) => updatePain('lead', v)}
                                        placeholder="Lead narrative sentence..."
                                        multiline
                                    />

                                    {/* Array Pain Points Editor */}
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">Configure Individual Pain Points</h4>
                                            <button
                                                onClick={addPainItem}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold transition-all border border-white/10"
                                            >
                                                <Plus size={14} />
                                                <span>Add Pain Point</span>
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {(content?.pain?.items || []).map((item, idx) => (
                                                <div key={idx} className="flex gap-3 items-center">
                                                    <span className="text-xs font-bold text-white/40 w-6">#{idx + 1}</span>
                                                    <input
                                                        type="text"
                                                        value={item}
                                                        onChange={(e) => updatePainItem(idx, e.target.value)}
                                                        placeholder={`Pain point target #${idx + 1}`}
                                                        className="flex-1 px-4 py-2 bg-[#130E26]/50 border border-white/15 rounded-xl text-sm text-white placeholder-white/25 focus:border-[#E8721A] focus:outline-none transition-colors"
                                                    />
                                                    <button
                                                        onClick={() => removePainItem(idx)}
                                                        className="p-2 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                                                        title="Delete this point"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            {(content?.pain?.items || []).length === 0 && (
                                                <p className="text-xs text-white/40 italic">No pain points configured. Add one using the button above.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={`lg:col-span-5 ${showPreviewOnMobile ? 'block' : 'hidden lg:block'} space-y-6`}>
                                    <h4 className="font-semibold text-xs text-[#3D2A6E]/85 uppercase tracking-widest pl-1">Live Preview Frame</h4>
                                    <MockupWindow>
                                        <PainPreview 
                                            sectionLabel={content?.pain?.sectionLabel}
                                            title={content?.pain?.title}
                                            titleEmphasis={content?.pain?.titleEmphasis}
                                            lead={content?.pain?.lead}
                                            items={content?.pain?.items}
                                        />
                                    </MockupWindow>
                                </div>
                            </div>
                        )}

                        {/* 4. VALUE EDIT SECTION */}
                        {activeTab === 'value' && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className={`lg:col-span-7 ${showPreviewOnMobile ? 'hidden lg:block' : 'block'}`}>
                                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
                                        <h3 className="font-serif text-lg text-white">Edit Value Proposition</h3>
                                        <button
                                            onClick={() => undoSectionChanges('value')}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/10 shadow-sm"
                                            title="Revert this section back to its last saved state"
                                        >
                                            <RotateCcw size={13} />
                                            <span>Undo Changes</span>
                                        </button>
                                    </div>
                                    
                                    <FormField
                                        label="Section Label"
                                        value={content?.value?.sectionLabel || ''}
                                        onChange={(v) => updateValue('sectionLabel', v)}
                                        placeholder="Why Beta Narrative"
                                    />

                                    <FormField
                                        label="Section Title"
                                        value={content?.value?.title || ''}
                                        onChange={(v) => updateValue('title', v)}
                                        placeholder="Strategic visibility,"
                                    />

                                    <FormField
                                        label="Italicized Title Emphasis"
                                        value={content?.value?.titleEmphasis || ''}
                                        onChange={(v) => updateValue('titleEmphasis', v)}
                                        placeholder="not just content."
                                    />

                                    <FormField
                                        label="Core Value Text Body"
                                        value={content?.value?.body || ''}
                                        onChange={(v) => updateValue('body', v)}
                                        placeholder="Write description paragraph. Use double linebreaks for spacing..."
                                        multiline
                                    />

                                    {/* Profile Details Editor */}
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider mb-4">Configure Profile Details Card</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <FormField
                                                label="Profile Name"
                                                value={content?.value?.profileName || ''}
                                                onChange={(v) => updateValue('profileName', v)}
                                                placeholder="Favour Egbogun"
                                            />
                                            <FormField
                                                label="Profile Role/Designation"
                                                value={content?.value?.profileRole || ''}
                                                onChange={(v) => updateValue('profileRole', v)}
                                                placeholder="Communications Strategist"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <FormField
                                                label="LinkedIn Profile URL"
                                                value={content?.value?.profileLinkedin || ''}
                                                onChange={(v) => updateValue('profileLinkedin', v)}
                                                placeholder="https://www.linkedin.com/in/favour-egbogun-3b748b166/"
                                            />
                                            <FormField
                                                label="Profile Image Path"
                                                value={content?.value?.profileImage || ''}
                                                onChange={(v) => updateValue('profileImage', v)}
                                                placeholder="/images/Favour.JPG"
                                                helper="Path to uploaded image asset"
                                            />
                                        </div>
                                    </div>

                                    {/* Array Credentials Editor */}
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">Configure Metrics/Credentials</h4>
                                            <button
                                                onClick={addCredential}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold transition-all border border-white/10"
                                            >
                                                <Plus size={14} />
                                                <span>Add Metric</span>
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {(content?.value?.credentials || []).map((cred, idx) => (
                                                <div key={idx} className="flex flex-col sm:flex-row gap-3 items-start border border-white/10 p-4 rounded-2xl relative bg-white/[0.02]">
                                                    <div className="absolute top-2 right-2 flex items-center gap-1">
                                                        <span className="text-[10px] font-bold text-white/40">Metric #{idx + 1}</span>
                                                        <button
                                                            onClick={() => removeCredential(idx)}
                                                            className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                                                            title="Delete credential metric"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="w-full sm:w-1/4">
                                                        <label className="text-[9px] font-bold text-white/70 uppercase mb-1 block">Value/Stat</label>
                                                        <input
                                                            type="text"
                                                            value={cred.number}
                                                            onChange={(e) => updateCredential(idx, 'number', e.target.value)}
                                                            placeholder="4+ / 5×"
                                                            className="w-full px-3 py-1.5 bg-[#130E26]/50 border border-white/15 rounded-lg text-xs font-bold text-[#E8721A] focus:outline-none"
                                                        />
                                                    </div>

                                                    <div className="w-full sm:w-3/4">
                                                        <label className="text-[9px] font-bold text-white/70 uppercase mb-1 block">Detail Description</label>
                                                        <input
                                                            type="text"
                                                            value={cred.label}
                                                            onChange={(e) => updateCredential(idx, 'label', e.target.value)}
                                                            placeholder="Describe the milestone details..."
                                                            className="w-full px-3 py-1.5 bg-[#130E26]/50 border border-white/15 rounded-lg text-xs text-white placeholder-white/20 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {(content?.value?.credentials || []).length === 0 && (
                                                <p className="text-xs text-white/40 italic">No metrics configured. Add one using the button above.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={`lg:col-span-5 ${showPreviewOnMobile ? 'block' : 'hidden lg:block'} space-y-6`}>
                                    <h4 className="font-semibold text-xs text-[#3D2A6E]/85 uppercase tracking-widest pl-1">Live Preview Frame</h4>
                                    <MockupWindow>
                                        <ValuePreview 
                                            sectionLabel={content?.value?.sectionLabel}
                                            title={content?.value?.title}
                                            titleEmphasis={content?.value?.titleEmphasis}
                                            body={content?.value?.body}
                                            credentials={content?.value?.credentials}
                                            profileName={content?.value?.profileName}
                                            profileRole={content?.value?.profileRole}
                                            profileLinkedin={content?.value?.profileLinkedin}
                                            profileImage={content?.value?.profileImage}
                                        />
                                    </MockupWindow>
                                </div>
                            </div>
                        )}

                        {/* 5. RESULTS EDIT SECTION */}
                        {activeTab === 'results' && (
                            <div>
                                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
                                    <h3 className="font-serif text-lg text-white">Edit Client Results Section</h3>
                                    <button
                                        onClick={() => undoSectionChanges('results')}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/10 shadow-sm"
                                        title="Revert this section back to its last saved state"
                                    >
                                        <RotateCcw size={13} />
                                        <span>Undo Changes</span>
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <FormField
                                        label="Section Label"
                                        value={content?.results?.sectionLabel || ''}
                                        onChange={(v) => updateResults('sectionLabel', v)}
                                        placeholder="The Results"
                                    />

                                    <FormField
                                        label="Main Title Prefix"
                                        value={content?.results?.title || ''}
                                        onChange={(v) => updateResults('title', v)}
                                        placeholder="What strategic visibility"
                                    />

                                    <FormField
                                        label="Italicized Title Emphasis"
                                        value={content?.results?.titleEmphasis || ''}
                                        onChange={(v) => updateResults('titleEmphasis', v)}
                                        placeholder="actually"
                                    />

                                    <FormField
                                        label="Title End Label"
                                        value={content?.results?.titleEmphasisEnd || ''}
                                        onChange={(v) => updateResults('titleEmphasisEnd', v)}
                                        placeholder="looks like."
                                    />
                                </div>

                                {/* Results list grids */}
                                <div className="border-t border-white/10 pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">Results Statistics Cards</h4>
                                        <button
                                            onClick={addResultItem}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold transition-all border border-white/10"
                                        >
                                            <Plus size={14} />
                                            <span>Add Outcome Card</span>
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {(content?.results?.results || []).map((card, idx) => (
                                            <div key={idx} className="border border-white/10 p-5 rounded-2xl bg-white/[0.02] relative shadow-sm hover:border-[#E8721A]/35 transition-all">
                                                <button
                                                    onClick={() => removeResultItem(idx)}
                                                    className="absolute top-3 right-3 text-white/40 hover:text-red-400 p-1 rounded transition-colors"
                                                    title="Remove card"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                <span className="text-[9px] font-bold text-white/40 uppercase block mb-3">Card #{idx + 1}</span>
                                                
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="text-[10px] font-bold text-white/70 uppercase mb-1 block">Highlight Stat / Header</label>
                                                        <input
                                                            type="text"
                                                            value={card.stat}
                                                            onChange={(e) => updateResultItem(idx, 'stat', e.target.value)}
                                                            placeholder="5× Reach / BusinessDay"
                                                            className="w-full px-4 py-2 bg-[#130E26]/50 border border-white/15 rounded-xl text-sm font-bold text-[#E8721A] focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-bold text-white/70 uppercase mb-1 block">Stat Description Narrative</label>
                                                        <textarea
                                                            value={card.description}
                                                            onChange={(e) => updateResultItem(idx, 'description', e.target.value)}
                                                            placeholder="Describe the context of the metrics achieved..."
                                                            rows={3}
                                                            className="w-full px-4 py-2 bg-[#130E26]/50 border border-white/15 rounded-xl text-xs text-white placeholder-white/20 resize-none focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {(content?.results?.results || []).length === 0 && (
                                        <p className="text-xs text-white/40 italic text-center py-8">No results cards configured. Add some outcomes using the button above.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 6. OFFER PLANS SECTION */}
                        {activeTab === 'offer' && (
                            <div className="space-y-8">
                                <div>
                                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
                                    <h3 className="font-serif text-lg text-white">Edit Pricing & Offers Section</h3>
                                    <button
                                        onClick={() => undoSectionChanges('offer')}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/10 shadow-sm"
                                        title="Revert this section back to its last saved state"
                                    >
                                        <RotateCcw size={13} />
                                        <span>Undo Changes</span>
                                    </button>
                                </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            label="Section Eyebrow Label"
                                            value={content?.offer?.sectionLabel || ''}
                                            onChange={(v) => updateOfferSection('sectionLabel', v)}
                                            placeholder="The Investment"
                                        />
                                        <FormField
                                            label="Overall Title prefix"
                                            value={content?.offer?.title || ''}
                                            onChange={(v) => updateOfferSection('title', v)}
                                            placeholder="Three months to own"
                                        />
                                        <FormField
                                            label="Title Emphasis (Italics)"
                                            value={content?.offer?.titleEmphasis || ''}
                                            onChange={(v) => updateOfferSection('titleEmphasis', v)}
                                            placeholder="your narrative."
                                        />
                                    </div>
                                </div>

                                {/* Offers Sub-Tabs */}
                                <div className="border-t border-white/10 pt-6">
                                    <div className="flex border-b border-white/10 mb-6">
                                        {(content?.offer?.offers || []).map((plan, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setOfferActiveTab(idx)}
                                                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all duration-200 ${
                                                    offerActiveTab === idx 
                                                        ? 'border-[#E8721A] text-[#E8721A]' 
                                                        : 'border-transparent text-white/50 hover:text-white'
                                                }`}
                                            >
                                                Tier #{idx + 1}: {plan.packageName || `Offer ${idx + 1}`}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Active Plan Form Content */}
                                    {(content?.offer?.offers || []).map((plan, index) => {
                                        if (index !== offerActiveTab) return null;
                                        return (
                                            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                                
                                                <div className={`lg:col-span-7 ${showPreviewOnMobile ? 'hidden lg:block' : 'block'} space-y-5`}>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <FormField
                                                            label="Package Name"
                                                            value={plan.packageName || ''}
                                                            onChange={(v) => updateOfferPlan(index, 'packageName', v)}
                                                            placeholder="THE STARTER"
                                                        />
                                                        <FormField
                                                            label="Card Badge Label"
                                                            value={plan.badge || ''}
                                                            onChange={(v) => updateOfferPlan(index, 'badge', v)}
                                                            placeholder="Rising Professionals"
                                                        />
                                                    </div>

                                                    <FormField
                                                        label="Card Tagline"
                                                        value={plan.tagline || ''}
                                                        onChange={(v) => updateOfferPlan(index, 'tagline', v)}
                                                        placeholder="For rising professionals ready to be seen"
                                                    />

                                                    <FormField
                                                        label="Hook Quote (Without Quotation Marks)"
                                                        value={plan.hook || ''}
                                                        onChange={(v) => updateOfferPlan(index, 'hook', v)}
                                                        placeholder="You're good at what you do. Your LinkedIn doesn't show it."
                                                        helper="Quotes are styled automatically, do not type quotation characters"
                                                    />

                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                        <FormField
                                                            label="Primary Price"
                                                            value={plan.price || ''}
                                                            onChange={(v) => updateOfferPlan(index, 'price', v)}
                                                            placeholder="₦800,000"
                                                        />
                                                        <FormField
                                                            label="Secondary Price (Optional)"
                                                            value={plan.priceSecond || ''}
                                                            onChange={(v) => updateOfferPlan(index, 'priceSecond', v)}
                                                            placeholder="USD 2,500"
                                                        />
                                                        <FormField
                                                            label="Price Duration Note"
                                                            value={plan.priceNote || ''}
                                                            onChange={(v) => updateOfferPlan(index, 'priceNote', v)}
                                                            placeholder="3-month engagement"
                                                        />
                                                    </div>

                                                    <FormField
                                                        label="Tier Description Overview"
                                                        value={plan.description || ''}
                                                        onChange={(v) => updateOfferPlan(index, 'description', v)}
                                                        placeholder="Description detailing package details..."
                                                        multiline
                                                    />

                                                    {/* Inclusions Lines Box */}
                                                    <FormField
                                                        label="What's Included (One Item Per Line)"
                                                        value={plan.includes?.join('\n') || ''}
                                                        onChange={(v) => updateOfferPlan(index, 'includes', v.split('\n'))}
                                                        placeholder="Brand voice & tone guidelines&#10;12 strategic posts&#10;Executive bio..."
                                                        multiline
                                                        helper="Type each feature listing on a new line"
                                                    />
                                                </div>

                                                <div className={`lg:col-span-5 ${showPreviewOnMobile ? 'block' : 'hidden lg:block'} space-y-6`}>
                                                    <h4 className="font-semibold text-xs text-[#3D2A6E]/85 uppercase tracking-widest pl-1">Live Preview Frame</h4>
                                                    <MockupWindow>
                                                        <OfferPreview 
                                                            packageName={plan.packageName}
                                                            badge={plan.badge}
                                                            tagline={plan.tagline}
                                                            hook={plan.hook}
                                                            price={plan.price}
                                                            priceSecond={plan.priceSecond}
                                                            priceNote={plan.priceNote}
                                                            description={plan.description}
                                                            includes={plan.includes}
                                                        />
                                                    </MockupWindow>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* 7. CONTACT EDIT SECTION */}
                        {activeTab === 'contact' && (
                            <div>
                                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
                                    <h3 className="font-serif text-lg text-white">Edit Contact Form Settings</h3>
                                    <button
                                        onClick={() => undoSectionChanges('contact')}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/10 shadow-sm"
                                        title="Revert this section back to its last saved state"
                                    >
                                        <RotateCcw size={13} />
                                        <span>Undo Changes</span>
                                    </button>
                                </div>
                                
                                <div className="max-w-2xl space-y-4">
                                    <FormField
                                        label="Section Label"
                                        value={content?.contact?.sectionLabel || ''}
                                        onChange={(v) => updateContact('sectionLabel', v)}
                                        placeholder="Apply Now"
                                    />

                                    <FormField
                                        label="Primary Heading Prefix"
                                        value={content?.contact?.title || ''}
                                        onChange={(v) => updateContact('title', v)}
                                        placeholder="Ready to be"
                                    />

                                    <FormField
                                        label="Heading Emphasis (Italics)"
                                        value={content?.contact?.titleEmphasis || ''}
                                        onChange={(v) => updateContact('titleEmphasis', v)}
                                        placeholder="found?"
                                    />

                                    <FormField
                                        label="Form Subtitle text"
                                        value={content?.contact?.subtitle || ''}
                                        onChange={(v) => updateContact('subtitle', v)}
                                        placeholder="Explanation note displayed directly above form inputs..."
                                        multiline
                                    />

                                    <FormField
                                        label="Calendly Booking URL"
                                        value={content?.contact?.calendlyUrl || ''}
                                        onChange={(v) => updateContact('calendlyUrl', v)}
                                        placeholder="https://calendly.com/favour-egbogun/30min"
                                        helper="Providing a URL will show a scheduling calendar automatically after successful form submissions."
                                    />

                                    <FormField
                                        label="Fine Print Footer"
                                        value={content?.contact?.finePrint || ''}
                                        onChange={(v) => updateContact('finePrint', v)}
                                        placeholder="Limited spots available at beta pricing..."
                                        multiline
                                    />
                                </div>
                            </div>
                        )}

                        {/* Settings & Plugins panels removed */}

                    </div>

                </main>

                {/* Fixed Toast Notifications — always visible, never scrolls away */}
                <AnimatePresence>
                    {saveStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 bg-[#0D1F17] border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-semibold shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl whitespace-nowrap"
                        >
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            </span>
                            {saveAction === 'publish' 
                                ? 'Content successfully published — the changes are now live!' 
                                : 'Draft saved successfully — preview it using the "Preview Draft" button.'}
                        </motion.div>
                    )}
                    {saveStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 bg-[#1F0D0D] border border-rose-500/40 rounded-2xl text-rose-300 text-xs font-semibold shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl max-w-sm text-center"
                        >
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/20 shrink-0">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                            </span>
                            {saveError || 'Save failed — check your connection and try again.'}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Preview Toggle Pill */}
                {activeTab !== 'dashboard' && (
                    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0E0A1E]/85 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center gap-1 select-none">
                        <button
                            onClick={() => setShowPreviewOnMobile(false)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 ${
                                !showPreviewOnMobile 
                                    ? 'bg-gradient-to-r from-[#E8721A] to-[#F08C3A] text-white shadow-[0_2px_10px_rgba(232,114,26,0.3)]' 
                                    : 'text-white/60 hover:text-white'
                            }`}
                        >
                            Edit Form
                        </button>
                        <button
                            onClick={() => setShowPreviewOnMobile(true)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 ${
                                showPreviewOnMobile 
                                    ? 'bg-gradient-to-r from-[#E8721A] to-[#F08C3A] text-white shadow-[0_2px_10px_rgba(232,114,26,0.3)]' 
                                    : 'text-white/60 hover:text-white'
                            }`}
                        >
                            Live Preview
                        </button>
                    </div>
                )}
            </div>
            
            {/* Sidebar mobile overlay background */}
            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} className="md:hidden fixed inset-0 bg-[#000000]/60 backdrop-blur-sm z-40 transition-all duration-300" />
            )}

        </div>
    );
}
