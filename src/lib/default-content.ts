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
        body: "Founded by Favour Egbogun, Beta Narrative translates executive experience into undeniable digital authority. Drawing from a deep foundation in strategic communications, we work with leaders at every stage, from rising professionals stepping into their power, to seasoned executives ready for the world to catch up.\n\nWe take your expertise, refined, real, and underrepresented online, and build a narrative so sharp, so unmistakably you, that the right people cannot scroll past.\n\nYour audience, your pillars, your voice, your legacy. We just make sure the world finally hears it.",
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
        offers: [
            {
                packageName: 'THE STARTER',
                badge: 'Rising Professionals',
                tagline: 'For rising professionals ready to be seen',
                hook: "You're good at what you do. Your LinkedIn doesn't show it.",
                price: '₦800,000',
                priceNote: '3-month engagement',
                description: 'This is for Senior Managers, Directors, and emerging leaders who are building toward the next level, and know that visibility is part of getting there. In 3 months, we build your digital presence from the ground up: your voice, your story, your content : consistent, strategic, and unmistakably you.',
                includes: [
                    'Brand voice & tone guidelines',
                    'Narrative pillars & content structure',
                    '12 strategic LinkedIn posts shaped around your voice',
                    '1 professionally crafted article (publication-ready)',
                    '1 placement on Business Day',
                    'Executive bio',
                    '4 Branded graphics',
                    'Monthly strategy session',
                    'Performance tracking & reporting',
                ],
            },
            {
                packageName: 'THE EXECUTIVE',
                badge: 'Premium Brand Package',
                tagline: 'For leaders ready to be sought after',
                hook: "You're already in the room. The internet needs to know it.",
                price: '₦2,000,000',
                priceSecond: 'USD 2,500',
                priceNote: '3-month engagement',
                description: 'This is for C-suite leaders, founders, and senior executives who are ready for strategic, consistent visibility that opens doors; consulting mandates, board seats, speaking invitations, media calls. In 3 months, we build a narrative so sharp and so unmistakably yours that the right people cannot scroll past, and we make sure the right platforms carry it.',
                includes: [
                    'Strategic Narrative Plan',
                    'Brand voice & tone guidelines',
                    'Narrative pillars & content structure',
                    '12 strategic LinkedIn posts shaped around your voice',
                    '3 professionally crafted thought leadership articles tailored for publication in BusinessDay and one additional top-tier platform such as Techpoint Africa, TechCabal, or Nairametrics.',
                    '3 media placements (2 Premium + 1 Standard outlet)',
                    'Executive bio',
                    '4 Branded graphics',
                    'Monthly strategy sessions (×3)',
                    'Performance tracking & reporting',
                    'TV feature opportunity (where applicable)',
                ],
            },
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
