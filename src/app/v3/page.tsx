import { ContentProvider } from '@/context/ContentContext';
import { getServerSiteContent } from '@/lib/server-content';
import VersionSwitcher from '@/components/VersionSwitcher';
import SalonShell from '@/components/v3/SalonShell';
import SalonResults from '@/components/v3/SalonResults';

export const dynamic = 'force-dynamic';

// Layout 3a — Salon with the bento Results.
export default async function V3Page({
    searchParams,
}: {
    searchParams: Promise<{ preview?: string }> | { preview?: string };
}) {
    const resolved = await searchParams;
    const isPreview = resolved?.preview === 'true';
    const content = await getServerSiteContent(isPreview);

    return (
        <ContentProvider initialContent={content}>
            <SalonShell results={<SalonResults />} />
            <VersionSwitcher />
        </ContentProvider>
    );
}
