import { defaultSiteContent } from '@/lib/default-content';
import type { Credential } from '@/types';

/** Live credentials when the CMS has them, otherwise the bundled defaults. */
export function resolveCredentials(credentials?: Credential[]): Credential[] {
    return credentials && credentials.length > 0
        ? credentials
        : defaultSiteContent.value.credentials;
}
