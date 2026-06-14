import { defaultSiteContent } from '@/lib/default-content';
import type { Credential } from '@/types';

/**
 * Returns the live credentials when the CMS has them, otherwise the bundled
 * defaults. Mirrors the resilience the homepage hero strip already has, so
 * every layout variant shows the proof points instead of an empty block when
 * the published content omits the credentials array.
 */
export function resolveCredentials(credentials?: Credential[]): Credential[] {
    return credentials && credentials.length > 0
        ? credentials
        : defaultSiteContent.value.credentials;
}
