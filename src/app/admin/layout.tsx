import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="surface h-fit p-6">
        <div className="mb-6">
          <p className="text-xs uppercase text-muted">Admin console</p>
          <p className="text-sm">{session?.user?.email}</p>
        </div>
        <nav className="space-y-3 text-sm">
          <Link className="block text-muted hover:text-foreground" href="/admin">
            Dashboard
          </Link>
          <Link className="block text-muted hover:text-foreground" href="/admin/partners">
            Partners
          </Link>
          <Link className="block text-muted hover:text-foreground" href="/admin/requests">
            Requests
          </Link>
          <Link className="block text-muted hover:text-foreground" href="/admin/intros">
            Intros
          </Link>
          <Link className="block text-muted hover:text-foreground" href="/admin/commissions">
            Commission rules
          </Link>
          <Link className="block text-muted hover:text-foreground" href="/logout">
            Sign out
          </Link>
        </nav>
      </aside>
      <section className="space-y-6">{children}</section>
    </div>
  );
}
