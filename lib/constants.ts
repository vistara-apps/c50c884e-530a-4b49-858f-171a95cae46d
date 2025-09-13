export const EDUCATIONAL_MODULES = [
  {
    moduleId: 'crypto-basics',
    title: 'What is Cryptocurrency?',
    content: 'Think of cryptocurrency like digital money that lives on the internet...',
    type: 'text' as const,
    category: 'basics' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 5,
    isPremium: false,
  },
  {
    moduleId: 'blockchain-explained',
    title: 'Understanding Blockchain',
    content: 'Imagine a notebook that everyone can see but no one can erase...',
    type: 'interactive' as const,
    category: 'basics' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 8,
    isPremium: false,
  },
  {
    moduleId: 'wallet-setup',
    title: 'Setting Up Your First Wallet',
    content: 'A crypto wallet is like a digital bank account...',
    type: 'video' as const,
    category: 'wallet' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 15,
    isPremium: true,
  },
  {
    moduleId: 'scam-identification',
    title: 'Spotting Crypto Scams',
    content: 'Learn to identify common red flags and protect yourself...',
    type: 'quiz' as const,
    category: 'scams' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 12,
    isPremium: true,
  },
];

export const SCAM_EXAMPLES = [
  {
    id: 'fake-giveaway',
    title: 'Fake Celebrity Giveaway',
    description: 'Scammers impersonate celebrities offering to double your crypto',
    type: 'fake_giveaway' as const,
    redFlags: [
      'Too good to be true promises',
      'Urgency tactics',
      'Requests to send crypto first',
      'Unverified social media accounts'
    ],
    prevention: [
      'Verify official accounts',
      'Never send crypto to receive more',
      'Check for verification badges',
      'Research before acting'
    ]
  },
  {
    id: 'phishing-wallet',
    title: 'Fake Wallet Website',
    description: 'Malicious websites that steal your wallet credentials',
    type: 'phishing' as const,
    redFlags: [
      'Suspicious URLs',
      'Poor website design',
      'Requests for seed phrases',
      'No HTTPS security'
    ],
    prevention: [
      'Always check URLs carefully',
      'Bookmark official sites',
      'Never share seed phrases',
      'Use official app stores'
    ]
  }
];

export const RISK_ASSESSMENT_QUESTIONS = [
  {
    id: 'experience',
    question: 'How familiar are you with investing?',
    type: 'single-choice',
    options: [
      { value: 1, label: 'Complete beginner' },
      { value: 2, label: 'Some experience with stocks/bonds' },
      { value: 3, label: 'Experienced investor' },
      { value: 4, label: 'Professional trader' }
    ]
  },
  {
    id: 'risk-tolerance',
    question: 'How would you react if your investment lost 20% in a day?',
    type: 'single-choice',
    options: [
      { value: 1, label: 'Panic and sell immediately' },
      { value: 2, label: 'Feel worried but hold' },
      { value: 3, label: 'See it as a buying opportunity' },
      { value: 4, label: 'Not be concerned at all' }
    ]
  },
  {
    id: 'investment-amount',
    question: 'What percentage of your savings would you consider investing?',
    type: 'single-choice',
    options: [
      { value: 1, label: 'Less than 5%' },
      { value: 2, label: '5-10%' },
      { value: 3, label: '10-25%' },
      { value: 4, label: 'More than 25%' }
    ]
  }
];

export const PRICING = {
  BASIC_SESSION: 10,
  SCAM_MASTERCLASS: 25,
  PREMIUM_MONTHLY: 15,
  WALLET_SETUP_GUIDE: 20,
};
