'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/' });
  }, []);

  return (
    <div className="surface p-8 text-center">
      <p className="text-muted">Signing you out...</p>
    </div>
  );
}
