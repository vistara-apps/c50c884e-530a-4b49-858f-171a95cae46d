# CryptoStart Buddy

Your friendly guide to crypto, jargon-free and scam-free.

## Overview

CryptoStart Buddy is a Base Mini App designed to help everyday people understand and safely get started with cryptocurrency through personalized education and securely guided setup.

## Features

- **Jargon-Free Concept Explainer**: Simple explanations of crypto concepts using everyday analogies
- **Secure Wallet & Exchange Setup**: Step-by-step guided walkthroughs for wallet creation
- **Crypto Scam Identification Training**: Interactive modules to recognize and avoid scams
- **Personalized Risk Assessment**: Tailored investment guidance based on risk tolerance

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your API keys to `.env.local`:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY`: Your OpenAI API key

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Blockchain**: Base network via OnchainKit
- **Mini App**: MiniKit integration
- **AI**: OpenAI API for conversational learning
- **TypeScript**: Full type safety

## Architecture

The app follows a modular component architecture with:

- `components/`: Reusable UI components
- `app/`: Next.js App Router pages and API routes
- `lib/`: Utilities, types, and constants
- `app/api/`: API routes for chat functionality

## Key Components

- **AppShell**: Main layout wrapper
- **ChatBubble**: Chat interface for AI conversations
- **GuideCard**: Educational content cards
- **QuestionnaireItem**: Risk assessment questions
- **ProgressBar**: Learning progress tracking
- **CallToAction**: Interactive buttons and CTAs

## Business Model

Micro-transactions model with:
- $10 for 30-minute personalized sessions
- $25 for Scam-Proofing Masterclass
- $15/month for premium content access
- $20 for comprehensive wallet setup guide

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
