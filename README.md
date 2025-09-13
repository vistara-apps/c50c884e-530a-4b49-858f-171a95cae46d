# CryptoStart Buddy

Your friendly guide to crypto, jargon-free and scam-free.

## Overview

CryptoStart Buddy is a production-ready Base Mini App designed to help everyday people understand and safely get started with cryptocurrency through personalized education and securely guided setup. Built with Next.js 15, TypeScript, and integrated with Base network and OpenAI.

## Features

### Core Educational Features
- **Jargon-Free Concept Explainer**: Simple explanations of crypto concepts using everyday analogies
- **Secure Wallet & Exchange Setup**: Interactive step-by-step guided walkthroughs for wallet creation on Base network
- **Crypto Scam Identification Training**: Interactive quiz and modules to recognize and avoid common scams
- **Personalized Risk Assessment**: Tailored investment guidance based on user risk tolerance and financial situation

### Technical Features
- **AI-Powered Chat**: Conversational learning assistant using OpenAI GPT
- **Progress Tracking**: User learning progress and completion tracking
- **Interactive Quizzes**: Gamified learning with immediate feedback
- **Base Network Integration**: Direct wallet connection and transaction guidance
- **Micro-transactions**: Pay-per-feature business model

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Base network wallet (MetaMask recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vistara-apps/c50c884e-530a-4b49-858f-171a95cae46d.git
   cd c50c884e-530a-4b49-858f-171a95cae46d
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your `.env.local`:
   ```env
   # MiniKit Configuration
   NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key

   # OnchainKit Configuration
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key

   # Database (for production)
   DATABASE_URL=your_database_url
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
Ensure all required environment variables are set in your production environment:

- `NODE_ENV=production`
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API key
- `NEXT_PUBLIC_MINIKIT_API_KEY` - MiniKit API key
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - OnchainKit API key

### Database Setup
The app uses Prisma ORM with PostgreSQL. Run migrations in production:
```bash
npx prisma migrate deploy
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base network via OnchainKit
- **Mini App**: Coinbase MiniKit integration
- **AI**: OpenAI API (via OpenRouter)
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: React hooks
- **Icons**: Lucide React

## Architecture

### Directory Structure
```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── chat/         # AI chat endpoint
│   │   ├── payments/     # Payment processing
│   │   ├── sessions/     # Session management
│   │   └── users/        # User management
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/           # Reusable UI components
│   ├── AppShell.tsx     # Main layout
│   ├── ChatBubble.tsx   # Chat interface
│   ├── Quiz.tsx         # Interactive quizzes
│   ├── WalletSetup.tsx  # Wallet setup guide
│   └── ...
├── lib/                 # Utilities and configuration
│   ├── constants.ts     # App constants and content
│   ├── db.ts           # Database configuration
│   ├── error-handling.ts # Error handling utilities
│   ├── logger.ts       # Logging utilities
│   ├── types.ts        # TypeScript definitions
│   └── utils.ts        # Helper functions
└── public/             # Static assets
```

### Key Components

- **AppShell**: Main layout wrapper with navigation
- **ChatBubble**: AI-powered conversational interface
- **GuideCard**: Educational content cards
- **QuestionnaireItem**: Risk assessment questions
- **ProgressBar**: Learning progress tracking
- **CallToAction**: Interactive buttons and CTAs
- **WalletSetup**: Step-by-step wallet configuration
- **Quiz**: Interactive learning assessments

## Business Model

### Micro-transactions Pricing
- **Basic Session**: $10 for 30-minute personalized onboarding
- **Scam Masterclass**: $25 for comprehensive scam prevention training
- **Premium Monthly**: $15/month for unlimited access
- **Wallet Setup Guide**: $20 for detailed wallet configuration

### Payment Integration
- Simulated payment processing (ready for Stripe/Coinbase Commerce integration)
- Session tracking and billing
- Purchase history and feature access management

## API Documentation

### Chat API
```typescript
POST /api/chat
{
  "message": "What is blockchain?",
  "context": "beginner_education",
  "userId": "optional_user_id"
}
```

### Payments API
```typescript
POST /api/payments
{
  "userId": "user_id",
  "feature": "basic_session",
  "amount": 10,
  "paymentMethod": "crypto"
}
```

### User Management
```typescript
POST /api/users
{
  "userId": "unique_user_id",
  "farcasterId": "optional_farcaster_id"
}
```

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Quality
- ESLint for code linting
- TypeScript for type safety
- Pre-commit hooks for quality assurance
- Comprehensive error handling and logging

## Security Features

- Input validation and sanitization
- Rate limiting on API endpoints
- Secure environment variable management
- HTTPS enforcement in production
- Content Security Policy headers
- XSS protection

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes with proper TypeScript types
4. Add tests if applicable
5. Run linting: `npm run lint`
6. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support or questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ for crypto beginners everywhere**
