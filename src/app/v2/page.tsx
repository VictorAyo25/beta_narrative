import { ContentProvider } from '@/context/ContentContext';
import { getServerSiteContent } from '@/lib/server-content';
import VersionSwitcher from '@/components/VersionSwitcher';
import AtelierShell from '@/components/v2/AtelierShell';

export const dynamic = 'force-dynamic';

export default async function V2Page({
    searchParams,
}: {
    searchParams: Promise<{ preview?: string }> | { preview?: string };
}) {
    const resolved = await searchParams;
    const isPreview = resolved?.preview === 'true';
    const content = await getServerSiteContent(isPreview);

    return (
        <ContentProvider initialContent={content}>
            <AtelierShell />
            <VersionSwitcher />
        </ContentProvider>
    );
}
