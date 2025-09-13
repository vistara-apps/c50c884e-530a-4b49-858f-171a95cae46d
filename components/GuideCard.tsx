'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Clock, Lock, CheckCircle } from 'lucide-react';

interface GuideCardProps {
  title: string;
  description: string;
  estimatedTime?: number;
  isPremium?: boolean;
  isCompleted?: boolean;
  variant?: 'overview' | 'detail';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function GuideCard({
  title,
  description,
  estimatedTime,
  isPremium = false,
  isCompleted = false,
  variant = 'overview',
  icon,
  onClick,
  className
}: GuideCardProps) {
  return (
    <div
      className={cn(
        'bg-surface rounded-lg shadow-card border border-border transition-smooth cursor-pointer hover:shadow-lg hover:scale-[1.02]',
        variant === 'overview' && 'p-4',
        variant === 'detail' && 'p-6',
        isCompleted && 'ring-2 ring-accent/20',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={cn(
              'font-semibold text-text',
              variant === 'overview' && 'text-lg',
              variant === 'detail' && 'text-xl'
            )}>
              {title}
            </h3>
            
            {isCompleted && (
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
            )}
            
            {isPremium && (
              <Lock className="w-4 h-4 text-yellow-600 flex-shrink-0" />
            )}
          </div>
          
          <p className={cn(
            'text-text/70 leading-relaxed',
            variant === 'overview' && 'text-sm',
            variant === 'detail' && 'text-base'
          )}>
            {description}
          </p>
          
          {estimatedTime && (
            <div className="flex items-center gap-1 mt-3 text-text/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {estimatedTime} min read
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
