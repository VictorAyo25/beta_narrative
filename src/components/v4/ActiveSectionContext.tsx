'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import { FRAME_SECTIONS, type FrameSectionId } from './frame-shared';

interface ActiveSectionValue {
    /** The story beat currently driving the sticky stage. */
    active: FrameSectionId;
    /**
     * Registers a narrative block's DOM node so an IntersectionObserver can
     * decide when it owns the centre band of the viewport. Returns a cleanup.
     */
    register: (id: FrameSectionId, node: HTMLElement | null) => void;
}

const ActiveSectionContext = createContext<ActiveSectionValue | undefined>(undefined);

/**
 * Tracks which narrative block sits in the centre of the viewport using a
 * single IntersectionObserver (rootMargin trims the top/bottom 45%, so only a
 * block crossing the middle is "active"). The active id morphs the left stage.
 */
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
    const [active, setActive] = useState<FrameSectionId>('hero');
    const nodesRef = useRef<Map<HTMLElement, FrameSectionId>>(new Map());
    const observerRef = useRef<IntersectionObserver | null>(null);
    // Ordered set of ids currently intersecting the centre band.
    const visibleRef = useRef<Set<FrameSectionId>>(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = visibleRef.current;
                for (const entry of entries) {
                    const id = nodesRef.current.get(entry.target as HTMLElement);
                    if (!id) continue;
                    if (entry.isIntersecting) {
                        visible.add(id);
                    } else {
                        visible.delete(id);
                    }
                }
                // Pick the earliest section (by story order) currently centred,
                // so scrolling up/down resolves to a single stable beat.
                const next = FRAME_SECTIONS.find((id) => visible.has(id));
                if (next) setActive(next);
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
        );
        observerRef.current = observer;
        // Observe any nodes registered before the observer existed.
        nodesRef.current.forEach((_, node) => observer.observe(node));

        return () => {
            observer.disconnect();
            observerRef.current = null;
        };
    }, []);

    const register = useCallback((id: FrameSectionId, node: HTMLElement | null) => {
        const nodes = nodesRef.current;
        const observer = observerRef.current;

        if (node) {
            nodes.set(node, id);
            observer?.observe(node);
        } else {
            // Cleanup path: find + remove any node previously mapped to this id.
            for (const [existing, existingId] of nodes) {
                if (existingId === id) {
                    observer?.unobserve(existing);
                    nodes.delete(existing);
                }
            }
            visibleRef.current.delete(id);
        }
    }, []);

    const value = useMemo<ActiveSectionValue>(() => ({ active, register }), [active, register]);

    return <ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>;
}

export function useActiveSection(): ActiveSectionValue {
    const ctx = useContext(ActiveSectionContext);
    if (!ctx) throw new Error('useActiveSection must be used within an ActiveSectionProvider');
    return ctx;
}

/**
 * Convenience hook for a narrative block: returns a ref callback to attach to
 * the block's root element so it participates in active-section tracking.
 */
export function useRegisterSection(id: FrameSectionId) {
    const { register } = useActiveSection();
    return useCallback(
        (node: HTMLElement | null) => register(id, node),
        [register, id],
    );
}
