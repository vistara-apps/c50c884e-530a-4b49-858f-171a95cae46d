'use client';

import { useState } from 'react';
import { CheckCircle, AlertTriangle, ExternalLink, Copy, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetupStep {
  id: string;
  title: string;
  description: string;
  details: string[];
  warning?: string;
  action?: {
    label: string;
    url?: string;
    onClick?: () => void;
  };
}

const WALLET_SETUP_STEPS: SetupStep[] = [
  {
    id: 'choose-wallet',
    title: 'Choose Your Wallet',
    description: 'Select a secure wallet that supports Base network',
    details: [
      'MetaMask - Most popular, works great with Base',
      'Coinbase Wallet - User-friendly mobile option',
      'Trust Wallet - Good mobile alternative',
      'Hardware wallets (Ledger, Trezor) for large amounts'
    ],
    action: {
      label: 'Download MetaMask',
      url: 'https://metamask.io/download/'
    }
  },
  {
    id: 'install-extension',
    title: 'Install Browser Extension',
    description: 'Add MetaMask to your browser for web access',
    details: [
      'Click the download link above',
      'Follow the installation prompts',
      'Create a strong password',
      'Accept the terms of service'
    ]
  },
  {
    id: 'create-wallet',
    title: 'Create Your Wallet',
    description: 'Set up your new crypto wallet securely',
    details: [
      'Write down your seed phrase on paper',
      'Store it in a safe, offline location',
      'Never take a photo or digital copy',
      'Test your backup by restoring on another device'
    ],
    warning: 'Your seed phrase is the key to your funds. If you lose it, you lose access forever. If someone finds it, they can steal your crypto.'
  },
  {
    id: 'add-base-network',
    title: 'Add Base Network',
    description: 'Configure MetaMask to work with Base network',
    details: [
      'Open MetaMask extension',
      'Click the network dropdown',
      'Select "Add Network"',
      'Use these Base network settings:'
    ],
    action: {
      label: 'Add Base Network',
      onClick: () => addBaseNetwork()
    }
  },
  {
    id: 'security-setup',
    title: 'Enable Security Features',
    description: 'Set up additional security measures',
    details: [
      'Enable biometric unlock if available',
      'Set up transaction confirmations',
      'Review privacy settings',
      'Consider enabling auto-lock'
    ]
  },
  {
    id: 'first-transaction',
    title: 'Make Your First Transaction',
    description: 'Send a small test transaction to verify everything works',
    details: [
      'Get a small amount of ETH on Base (from an exchange)',
      'Try sending 0.001 ETH to yourself',
      'Wait for confirmation',
      'Verify the transaction on Base explorer'
    ],
    action: {
      label: 'View on Base Explorer',
      url: 'https://basescan.org/'
    }
  }
];

const BASE_NETWORK_CONFIG = {
  chainId: '0x2105', // 8453 in decimal
  chainName: 'Base',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://mainnet.base.org'],
  blockExplorerUrls: ['https://basescan.org'],
};

function addBaseNetwork() {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    (window as any).ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [BASE_NETWORK_CONFIG],
    }).catch((error: any) => {
      console.error('Failed to add Base network:', error);
      alert('Failed to add Base network. Please add it manually in MetaMask.');
    });
  } else {
    alert('MetaMask not detected. Please install MetaMask first.');
  }
}

interface WalletSetupProps {
  className?: string;
}

export function WalletSetup({ className }: WalletSetupProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const copyNetworkConfig = () => {
    const config = `Network Name: Base
Chain ID: 8453
Currency Symbol: ETH
RPC URL: https://mainnet.base.org
Block Explorer: https://basescan.org`;

    navigator.clipboard.writeText(config);
    alert('Network configuration copied to clipboard!');
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-text">Wallet Setup Guide</h2>
        <p className="text-text/70">
          Follow these steps to set up your secure crypto wallet on Base network
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-surface rounded-lg p-4 shadow-card">
        <div className="flex justify-between text-sm text-text/70 mb-2">
          <span>Setup Progress</span>
          <span>{completedSteps.size} of {WALLET_SETUP_STEPS.length} completed</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.size / WALLET_SETUP_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Setup Steps */}
      <div className="space-y-4">
        {WALLET_SETUP_STEPS.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              'bg-surface rounded-lg p-6 shadow-card transition-all duration-200',
              completedSteps.has(step.id) && 'border-accent border-2'
            )}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleStep(step.id)}
                className={cn(
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors',
                  completedSteps.has(step.id)
                    ? 'bg-accent border-accent text-white'
                    : 'border-border hover:border-accent'
                )}
              >
                {completedSteps.has(step.id) ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </button>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text mb-2">
                  {step.title}
                </h3>
                <p className="text-text/70 mb-3">{step.description}</p>

                <ul className="space-y-1 mb-4">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-text/70">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                {step.warning && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-yellow-800 text-sm">{step.warning}</p>
                    </div>
                  </div>
                )}

                {/* Base Network Configuration for step 4 */}
                {step.id === 'add-base-network' && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-text">Base Network Details</h4>
                      <button
                        onClick={copyNetworkConfig}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Config
                      </button>
                    </div>
                    <div className="space-y-1 text-sm text-text/70 font-mono">
                      <div>Network Name: Base</div>
                      <div>Chain ID: 8453</div>
                      <div>Currency Symbol: ETH</div>
                      <div>RPC URL: https://mainnet.base.org</div>
                      <div>Block Explorer: https://basescan.org</div>
                    </div>
                  </div>
                )}

                {step.action && (
                  <div className="flex gap-2">
                    {step.action.url ? (
                      <a
                        href={step.action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        {step.action.label}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : step.action.onClick ? (
                      <button
                        onClick={step.action.onClick}
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        {step.action.label}
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {completedSteps.size === WALLET_SETUP_STEPS.length && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">
            Congratulations! 🎉
          </h3>
          <p className="text-green-700 mb-4">
            You've successfully set up your secure crypto wallet on Base network.
          </p>
          <div className="space-y-2 text-sm text-green-600">
            <p>✅ Your wallet is ready for transactions</p>
            <p>✅ Base network is configured</p>
            <p>✅ Security best practices applied</p>
          </div>
        </div>
      )}

      {/* Additional Resources */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-text mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://docs.base.org/docs/tools/wallet"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-border/50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">Base Wallet Documentation</span>
          </a>
          <a
            href="https://support.metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-border/50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">MetaMask Support</span>
          </a>
          <a
            href="https://basescan.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-border/50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">Base Block Explorer</span>
          </a>
          <a
            href="https://docs.base.org/docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-border/50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">Base Developer Docs</span>
          </a>
        </div>
      </div>
    </div>
  );
}
