'use client';

import { cn } from '@/lib/utils';

interface Option {
  value: number;
  label: string;
}

interface QuestionnaireItemProps {
  question: string;
  options: Option[];
  selectedValue?: number;
  variant?: 'singleChoice' | 'multiChoice';
  onSelect: (value: number) => void;
  className?: string;
}

export function QuestionnaireItem({
  question,
  options,
  selectedValue,
  variant = 'singleChoice',
  onSelect,
  className
}: QuestionnaireItemProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold text-text leading-relaxed">
        {question}
      </h3>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={cn(
              'w-full text-left p-4 rounded-lg border transition-smooth',
              'hover:border-primary hover:bg-primary/5',
              selectedValue === option.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-surface text-text'
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-4 h-4 rounded-full border-2 flex-shrink-0',
                selectedValue === option.value
                  ? 'border-primary bg-primary'
                  : 'border-border'
              )}>
                {selectedValue === option.value && (
                  <div className="w-full h-full rounded-full bg-white scale-50" />
                )}
              </div>
              <span className="text-base">{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
