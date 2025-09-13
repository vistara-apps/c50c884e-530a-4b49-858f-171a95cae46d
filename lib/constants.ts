export const EDUCATIONAL_MODULES = [
  {
    moduleId: 'crypto-basics',
    title: 'What is Cryptocurrency?',
    content: 'Think of cryptocurrency like digital money that lives on the internet. Unlike traditional money from banks, crypto is decentralized - no single company or government controls it. It uses cryptography (advanced math) to keep transactions secure and verify ownership.',
    type: 'text' as const,
    category: 'basics' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 5,
    isPremium: false,
  },
  {
    moduleId: 'blockchain-explained',
    title: 'Understanding Blockchain',
    content: 'Imagine a notebook that everyone can see but no one can erase. Every time someone makes a transaction, it gets added to this shared notebook (the blockchain). Multiple computers around the world verify each transaction, making it extremely difficult to cheat or alter the record.',
    type: 'interactive' as const,
    category: 'basics' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 8,
    isPremium: false,
  },
  {
    moduleId: 'bitcoin-vs-ethereum',
    title: 'Bitcoin vs Ethereum: What\'s the Difference?',
    content: 'Bitcoin is like digital gold - it\'s primarily a store of value. Ethereum is like a computer that runs on the blockchain - it can execute smart contracts and run decentralized applications (dApps).',
    type: 'text' as const,
    category: 'basics' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 6,
    isPremium: false,
  },
  {
    moduleId: 'wallet-setup',
    title: 'Setting Up Your First Wallet',
    content: 'A crypto wallet is like a digital bank account. It stores your public address (like your account number) and private key (like your password). Never share your private key with anyone!',
    type: 'video' as const,
    category: 'wallet' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 15,
    isPremium: true,
  },
  {
    moduleId: 'wallet-security',
    title: 'Wallet Security Best Practices',
    content: 'Your crypto wallet security depends on protecting your private key. Use hardware wallets for large amounts, enable 2FA, backup your seed phrase offline, and never store crypto on exchanges long-term.',
    type: 'text' as const,
    category: 'wallet' as const,
    difficulty: 'intermediate' as const,
    estimatedTime: 10,
    isPremium: true,
  },
  {
    moduleId: 'base-network-intro',
    title: 'Getting Started with Base Network',
    content: 'Base is a Layer 2 network built on Ethereum, offering fast and cheap transactions. It\'s perfect for beginners because it inherits Ethereum\'s security while being much more affordable to use.',
    type: 'text' as const,
    category: 'wallet' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 7,
    isPremium: false,
  },
  {
    moduleId: 'scam-identification',
    title: 'Spotting Crypto Scams',
    content: 'Learn to identify common red flags and protect yourself from fraudulent schemes in the crypto space.',
    type: 'quiz' as const,
    category: 'scams' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 12,
    isPremium: true,
  },
  {
    moduleId: 'phishing-attacks',
    title: 'Recognizing Phishing Attacks',
    content: 'Phishing scams try to trick you into revealing your private keys or sending crypto to scammers. Always check URLs carefully and never click suspicious links.',
    type: 'interactive' as const,
    category: 'scams' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 8,
    isPremium: false,
  },
  {
    moduleId: 'rug-pull-detection',
    title: 'Avoiding Rug Pull Scams',
    content: 'A rug pull happens when developers abandon a project and steal investor funds. Research team backgrounds, check smart contract audits, and start with small investments.',
    type: 'text' as const,
    category: 'scams' as const,
    difficulty: 'intermediate' as const,
    estimatedTime: 10,
    isPremium: true,
  },
  {
    moduleId: 'investment-basics',
    title: 'Crypto Investment Fundamentals',
    content: 'Never invest more than you can afford to lose. Diversify your investments, do thorough research, and consider your risk tolerance before investing.',
    type: 'text' as const,
    category: 'risk' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 8,
    isPremium: false,
  },
  {
    moduleId: 'defi-explained',
    title: 'Introduction to DeFi',
    content: 'Decentralized Finance (DeFi) brings traditional financial services to the blockchain. You can lend, borrow, and earn interest without banks or intermediaries.',
    type: 'interactive' as const,
    category: 'advanced' as const,
    difficulty: 'intermediate' as const,
    estimatedTime: 12,
    isPremium: true,
  },
  {
    moduleId: 'nft-basics',
    title: 'Understanding NFTs',
    content: 'NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of specific items like art, music, or collectibles on the blockchain.',
    type: 'text' as const,
    category: 'advanced' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 6,
    isPremium: false,
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
      'Urgency tactics ("Send now or miss out!")',
      'Requests to send crypto first',
      'Unverified social media accounts',
      'Promises of guaranteed returns'
    ],
    prevention: [
      'Verify official accounts through official websites',
      'Never send crypto to receive more',
      'Check for verification badges (✓)',
      'Research the person/project independently',
      'Remember: legitimate giveaways don\'t ask for payment first'
    ]
  },
  {
    id: 'phishing-wallet',
    title: 'Fake Wallet Website',
    description: 'Malicious websites that steal your wallet credentials',
    type: 'phishing' as const,
    redFlags: [
      'Suspicious URLs (extra characters, wrong domain)',
      'Poor website design or grammar errors',
      'Requests for seed phrases or private keys',
      'No HTTPS security (check the lock icon)',
      'Unexpected pop-ups or download requests'
    ],
    prevention: [
      'Always check URLs carefully before entering',
      'Bookmark official wallet sites',
      'Never share seed phrases or private keys',
      'Use official app stores for wallet apps',
      'Enable browser security extensions'
    ]
  },
  {
    id: 'rug-pull',
    title: 'Rug Pull Scam',
    description: 'Developers abandon a project after collecting investor funds',
    type: 'rug_pull' as const,
    redFlags: [
      'Anonymous development team',
      'No smart contract audit',
      'Promises of unrealistic returns',
      'Pressure to invest quickly',
      'Lack of community governance'
    ],
    prevention: [
      'Research the development team background',
      'Check for smart contract audits',
      'Start with very small investments',
      'Look for community governance mechanisms',
      'Be wary of hyped projects with no track record'
    ]
  },
  {
    id: 'fake-exchange',
    title: 'Fake Crypto Exchange',
    description: 'Bogus exchanges that steal your funds',
    type: 'phishing' as const,
    redFlags: [
      'No regulatory compliance or licenses',
      'Too good to be true trading fees',
      'Requests for large deposits',
      'No customer support contact',
      'Unrealistic trading volume claims'
    ],
    prevention: [
      'Use only established, regulated exchanges',
      'Check exchange licensing and compliance',
      'Start with small deposits',
      'Read independent reviews',
      'Use exchanges with good reputations'
    ]
  },
  {
    id: 'investment-scheme',
    title: 'Ponzi Investment Scheme',
    description: 'Schemes that pay returns from new investors\' money',
    type: 'ponzi' as const,
    redFlags: [
      'Guaranteed high returns with no risk',
      'Payments from new investors',
      'Complex referral structures',
      'Pressure to recruit others',
      'Lack of transparent operations'
    ],
    prevention: [
      'Be skeptical of guaranteed returns',
      'Understand how the investment generates returns',
      'Avoid schemes requiring recruitment',
      'Check for regulatory approval',
      'Remember: high returns usually mean high risk'
    ]
  },
  {
    id: 'tech-support-scam',
    title: 'Fake Tech Support',
    description: 'Scammers posing as support to gain access to your wallet',
    type: 'phishing' as const,
    redFlags: [
      'Unsolicited contact about "problems"',
      'Requests for remote access',
      'Pressure to act immediately',
      'Asking for wallet credentials',
      'Claims of "security issues"'
    ],
    prevention: [
      'Never give remote access to strangers',
      'Don\'t share wallet credentials with anyone',
      'Contact official support through verified channels',
      'Be suspicious of unsolicited tech support',
      'Verify claims independently'
    ]
  },
  {
    id: 'fake-nft-project',
    title: 'Fake NFT Project',
    description: 'Counterfeit NFT collections that disappear after minting',
    type: 'rug_pull' as const,
    redFlags: [
      'Copycat artwork from popular collections',
      'Anonymous artists/developers',
      'No smart contract verification',
      'Pressure to mint quickly',
      'Unrealistic promises about value appreciation'
    ],
    prevention: [
      'Verify artist identity and portfolio',
      'Check smart contract on blockchain explorers',
      'Research the project on NFT communities',
      'Start with small investments',
      'Be patient - don\'t rush into hyped drops'
    ]
  },
  {
    id: 'wallet-drainer',
    title: 'Malicious Wallet Apps',
    description: 'Fake wallet apps that steal your funds',
    type: 'phishing' as const,
    redFlags: [
      'Apps not from official stores',
      'Requests for excessive permissions',
      'Poor app store ratings',
      'No official website verification',
      'Urgent security warnings'
    ],
    prevention: [
      'Only download from official app stores',
      'Check app permissions carefully',
      'Read user reviews and ratings',
      'Verify through official wallet websites',
      'Use hardware wallets when possible'
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
