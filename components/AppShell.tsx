'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default';
  className?: string;
}

export function AppShell({ 
  children, 
  variant = 'default', 
  className 
}: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen bg-bg',
      variant === 'default' && 'pb-safe',
      className
    )}>
      <div className="container mx-auto max-w-xl px-4">
        {children}
      </div>
    </div>
  );
}
