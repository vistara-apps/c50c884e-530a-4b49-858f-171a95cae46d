import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function calculateRiskScore(answers: Record<string, number>): number {
  const values = Object.values(answers);
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Math.round((sum / (values.length * 4)) * 100);
}

export function getRiskLevel(score: number): {
  level: string;
  color: string;
  description: string;
} {
  if (score <= 25) {
    return {
      level: 'Conservative',
      color: 'text-green-600',
      description: 'You prefer low-risk investments with steady returns.'
    };
  } else if (score <= 50) {
    return {
      level: 'Moderate',
      color: 'text-yellow-600',
      description: 'You can handle some risk for potentially higher returns.'
    };
  } else if (score <= 75) {
    return {
      level: 'Aggressive',
      color: 'text-orange-600',
      description: 'You\'re comfortable with higher risk for growth potential.'
    };
  } else {
    return {
      level: 'Very Aggressive',
      color: 'text-red-600',
      description: 'You seek maximum growth despite high volatility.'
    };
  }
}

export function generateRecommendations(score: number): string[] {
  const riskLevel = getRiskLevel(score);
  
  const baseRecommendations = [
    'Never invest more than you can afford to lose',
    'Start with small amounts to learn',
    'Research before investing in any cryptocurrency',
    'Use reputable exchanges and wallets',
    'Enable two-factor authentication on all accounts'
  ];

  if (score <= 25) {
    return [
      ...baseRecommendations,
      'Consider starting with just $10-50',
      'Focus on Bitcoin and Ethereum initially',
      'Avoid day trading and complex strategies',
      'Take time to learn before increasing investments'
    ];
  } else if (score <= 50) {
    return [
      ...baseRecommendations,
      'Consider investing 5-10% of your portfolio',
      'Diversify across 3-5 different cryptocurrencies',
      'Learn about dollar-cost averaging',
      'Set clear profit-taking and loss limits'
    ];
  } else {
    return [
      ...baseRecommendations,
      'You may consider higher allocations, but be cautious',
      'Learn about advanced strategies like DeFi',
      'Consider professional advice for large amounts',
      'Stay updated on market trends and regulations'
    ];
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
