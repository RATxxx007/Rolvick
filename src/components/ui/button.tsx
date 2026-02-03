import * as React from 'react';
import { cn } from '@/lib/utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-white text-black hover:bg-accent focus-visible:ring-2 focus-visible:ring-glow',
  secondary:
    'bg-surfaceMuted text-foreground hover:bg-surface border border-border focus-visible:ring-2 focus-visible:ring-glow',
  ghost: 'bg-transparent text-foreground hover:bg-surfaceMuted'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold tracking-wide transition',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
