import { ContentProvider } from '@/context/ContentContext';
import { getServerSiteContent } from '@/lib/server-content';
import VersionSwitcher from '@/components/VersionSwitcher';
import SalonShell from '@/components/v3/SalonShell';
import SalonResultsMotion from '@/components/v3/SalonResultsMotion';

export const dynamic = 'force-dynamic';

// Layout 3b — Salon with the motion-enhanced bento Results.
export default async function V3bPage({
    searchParams,
}: {
    searchParams: Promise<{ preview?: string }> | { preview?: string };
}) {
    const resolved = await searchParams;
    const isPreview = resolved?.preview === 'true';
    const content = await getServerSiteContent(isPreview);

    return (
        <ContentProvider initialContent={content}>
            <SalonShell results={<SalonResultsMotion />} />
            <VersionSwitcher />
        </ContentProvider>
    );
}
