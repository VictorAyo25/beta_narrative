// Shared navigation model for the Atelier (/v2) layout.
// Used by both the fixed desktop sidebar and the mobile slide-down menu so the
// active-section tracking and link list stay in sync.

export interface AtelierNavItem {
    id: string;
    label: string;
}

export const atelierNavItems: AtelierNavItem[] = [
    { id: 'problem', label: 'The Problem' },
    { id: 'why', label: 'Why Us' },
    { id: 'results', label: 'Results' },
    { id: 'offer', label: 'Offer' },
    { id: 'contact', label: 'Apply' },
];
