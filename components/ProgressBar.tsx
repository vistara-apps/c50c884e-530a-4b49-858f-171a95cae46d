'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: 'default';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  progress,
  variant = 'default',
  showLabel = true,
  className
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text">
            Learning Progress
          </span>
          <span className="text-sm text-text/70">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      
      <div className="w-full bg-border rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            variant === 'default' && 'bg-accent'
          )}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
