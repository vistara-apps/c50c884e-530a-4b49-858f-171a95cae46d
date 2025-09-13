'use client';

import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  variant: 'user' | 'assistant';
  timestamp?: Date;
  className?: string;
}

export function ChatBubble({ 
  message, 
  variant, 
  timestamp, 
  className 
}: ChatBubbleProps) {
  const isUser = variant === 'user';

  return (
    <div className={cn(
      'flex gap-3 mb-4 animate-fade-in',
      isUser ? 'flex-row-reverse' : 'flex-row',
      className
    )}>
      <div className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        isUser ? 'bg-primary text-white' : 'bg-accent text-white'
      )}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>
      
      <div className={cn(
        'max-w-[80%] rounded-lg px-4 py-3 shadow-card',
        isUser 
          ? 'bg-primary text-white rounded-br-sm' 
          : 'bg-surface text-text rounded-bl-sm'
      )}>
        <p className="text-base leading-relaxed">{message}</p>
        {timestamp && (
          <p className={cn(
            'text-xs mt-2 opacity-70',
            isUser ? 'text-white/70' : 'text-text/70'
          )}>
            {timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        )}
      </div>
    </div>
  );
}
