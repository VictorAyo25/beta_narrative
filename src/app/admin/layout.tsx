import { grotesk } from '../fonts';
import AdminGuard from './AdminGuard';

// Space Grotesk is admin-only, so it loads here rather than in the root
// layout — the public site never downloads it.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={grotesk.variable}>
            <AdminGuard>{children}</AdminGuard>
        </div>
    );
}
