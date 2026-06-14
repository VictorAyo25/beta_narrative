/**
 * Shared constants, types and easing for the "FRAME" layout (/v4) —
 * a sticky split-stage, scroll-driven storytelling experience.
 */

/** The five story beats that drive the morphing left stage. */
export const FRAME_SECTIONS = ['hero', 'problem', 'why', 'results', 'offer'] as const;

export type FrameSectionId = (typeof FRAME_SECTIONS)[number];

/** Anchor ids used by in-page navigation. `hero` has no anchor (top of page). */
export const SECTION_ANCHOR: Record<FrameSectionId, string> = {
    hero: 'top',
    problem: 'problem',
    why: 'why',
    results: 'results',
    offer: 'offer',
};

/** Calm, premium easing shared across every reveal + stage cross-fade. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Cross-fade transition for the morphing stage (opacity + gentle rise). */
export const STAGE_TRANSITION = { duration: 0.55, ease: EASE } as const;
