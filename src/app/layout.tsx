import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CoreBiz + B5 Partner Portal',
  description: 'Premium partner network for AI and digital delivery.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen bg-background">
          <header className="border-b border-border bg-surface/60 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold tracking-wide">
                CoreBiz + B5
              </Link>
              <nav className="flex items-center gap-6 text-sm text-muted">
                <Link className="hover:text-foreground" href="/partners">
                  Partners
                </Link>
                <Link className="hover:text-foreground" href="/request">
                  Request Intro
                </Link>
                <Link className="hover:text-foreground" href="/become-a-partner">
                  Become a Partner
                </Link>
                <Link
                  className="rounded-2xl border border-border bg-surfaceMuted px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground transition hover:bg-surface"
                  href="/login"
                >
                  Login
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
        </div>
      </body>
    </html>
  );
}
