'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const callbackUrl = searchParams.get('callbackUrl') ?? '/app';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl
    });

    if (result?.error) {
      setError('Invalid email or password.');
    } else if (result?.url) {
      window.location.href = result.url;
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="surface space-y-6 p-8">
        <div>
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-muted">Access your partner dashboard or admin console.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs uppercase text-muted">Email</label>
            <Input name="email" type="email" required placeholder="admin@portal.local" />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Password</label>
            <Input name="password" type="password" required placeholder="••••••••" />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            className="w-full rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
