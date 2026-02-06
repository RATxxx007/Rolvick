import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8 lg:py-14">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
