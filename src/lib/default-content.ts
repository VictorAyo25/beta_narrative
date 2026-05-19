/**
 * Default Site Content
 * 
 * This is the initial content that will be loaded into Firestore
 * when the site is first set up. It's based on the original landing page.
 */

import { SiteContent } from '@/types';

export const defaultSiteContent: Omit<SiteContent, 'id' | 'updatedAt'> = {
    hero: {
        eyebrow: 'Executive Brand Strategy',
        title: 'Your expertise is',
        titleEmphasis: 'undeniable.',
        titleHighlight: "Your visibility shouldn't lag behind.",
        subtitle: 'Built for leaders ready to stop blending in and start being sought after — consistently, strategically, and on their own terms.',
        ctaText: 'Build My Brand →',
    },
    pain: {
        sectionLabel: 'The Problem',
        title: "You're leading rooms.",
        titleEmphasis: "The internet doesn't know it.",
        lead: 'The leaders who get called to speak, consult, and serve on boards aren\'t always the most qualified. They\'re the most visible.',
        items: [
            'You worry about sounding like every other executive — generic, forgettable, corporate.',
            "You post inconsistently, if at all, because you're unsure what to say or how to frame it.",
            "Your visibility doesn't reflect the weight of your experience and the value you carry.",
            "You're ready for consultancy and speaking gigs — but the right people can't find you.",
        ],
    },
    value: {
        sectionLabel: 'Why Beta Narrative',
        title: 'Strategic visibility,',
        titleEmphasis: 'not just content.',
        body: 'Founded by Communications Strategist Favour Egbogun, Beta Narrative translates executive experience into undeniable digital authority. Drawing from a deep foundation in strategic communication, we work directly with C-suite leaders at multinationals to craft narratives that command rooms. We don\'t just write content; we build the architecture around your expertise — your audience, your pillars, your voice, your legacy.',
        credentials: [
            {
                number: '4+',
                label: 'Years crafting executive narratives for multinational leaders',
            },
            {
                number: '5×',
                label: 'LinkedIn reach growth in 90 days for a senior leader',
            },
            {
                number: '20%',
                label: 'LinkedIn engagement lift from op-eds and ghost-written content',
            },
        ],
    },
    results: {
        sectionLabel: 'The Results',
        title: 'What strategic visibility',
        titleEmphasis: 'actually',
        titleEmphasisEnd: 'looks like.',
        results: [
            {
                stat: '5× Reach',
                description: 'A senior leader\'s LinkedIn reach grew from 2,000 to 10,000+ impressions per post within 90 days — attracting inbound opportunities from decision-makers and industry peers.',
            },
            {
                stat: '+20% Engagement',
                description: 'Ghost-written articles and op-eds drove a 20% LinkedIn engagement lift — turning followers into conversations that convert.',
            },
            {
                stat: 'BusinessDay',
                description: 'Clients featured in national publications, positioning them as credible voices in their industries — not just practitioners.',
            },
            {
                stat: 'TV Features',
                description: 'Visibility strategy has placed executives in broadcast conversations — widening reach far beyond LinkedIn.',
            },
        ],
    },
    offer: {
        sectionLabel: 'The Investment',
        title: 'Three months to own',
        titleEmphasis: 'your narrative.',
        badge: 'Beta Launch Offer',
        packageName: 'Executive Brand Package',
        price: '₦500,000',
        priceNote: '3-month engagement · Beta pricing',
        description: 'Designed for mid-level professionals stepping into leadership and executives ready for strategic, consistent visibility that positions them for consultancy, speaking, and thought leadership.',
        timeline: [
            {
                month: 'Month 1',
                title: 'Foundation & Strategy',
                content: 'Brand voice, tone guidelines, UVP document, target audience mapping, narrative pillars and content structure',
            },
            {
                month: 'Month 2',
                title: 'Content & Visibility',
                content: 'Articles, LinkedIn posts, branded graphics, executive bio, op-ed placement and media outreach',
            },
            {
                month: 'Month 3',
                title: 'Amplification',
                content: 'TV feature opportunity, newsletter setup, visibility plan refinement and handover',
            },
        ],
        includes: [
            '3 professionally crafted articles (BusinessDay-ready)',
            '12 strategic LinkedIn posts shaped around your voice',
            'Branded graphics for your content',
            'Executive bio — compelling, clear, conversion-ready',
            'Brand voice and tone guideline',
            'Unique Value Proposition document — your story, your edge, your positioning',
            'Narrative pillars and content structure strategy',
            'Target audience mapping and visibility plan',
            'TV feature opportunity (where applicable)',
            'Newsletter setup possibility',
        ],
    },
    contact: {
        sectionLabel: 'Apply Now',
        title: 'Ready to be',
        titleEmphasis: 'found?',
        subtitle: 'We work with a limited number of leaders per cohort to ensure every brand gets the depth it deserves.',
        finePrint: 'Limited spots available at beta pricing. Once the cohort is full, the offer closes.',
    },
};
