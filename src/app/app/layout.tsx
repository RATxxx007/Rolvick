import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="surface h-fit p-6">
        <div className="mb-6">
          <p className="text-xs uppercase text-muted">Partner console</p>
          <p className="text-sm">{session?.user?.email}</p>
        </div>
        <nav className="space-y-3 text-sm">
          <Link className="block text-muted hover:text-foreground" href="/app">
            Dashboard
          </Link>
          <Link className="block text-muted hover:text-foreground" href="/app/profile">
            Profile
          </Link>
          <Link className="block text-muted hover:text-foreground" href="/app/cases">
            Case studies
          </Link>
          <Link className="block text-muted hover:text-foreground" href="/app/intros">
            Intros
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
