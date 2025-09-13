'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { GuideCard } from '@/components/GuideCard';
import { CallToAction } from '@/components/CallToAction';
import { ProgressBar } from '@/components/ProgressBar';
import { ChatBubble } from '@/components/ChatBubble';
import { QuestionnaireItem } from '@/components/QuestionnaireItem';
import { WalletSetup } from '@/components/WalletSetup';
import { Quiz, SAMPLE_SCAM_QUIZ_QUESTIONS } from '@/components/Quiz';
import { EDUCATIONAL_MODULES, SCAM_EXAMPLES, RISK_ASSESSMENT_QUESTIONS, PRICING } from '@/lib/constants';
import { formatCurrency, calculateRiskScore, getRiskLevel, generateRecommendations } from '@/lib/utils';
import { 
  BookOpen, 
  Shield, 
  Wallet, 
  TrendingUp, 
  MessageCircle, 
  Rocket,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Send
} from 'lucide-react';

type ViewState = 'home' | 'learn' | 'wallet' | 'scams' | 'risk' | 'chat' | 'scam-detail' | 'quiz';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function HomePage() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [progress, setProgress] = useState(15);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [riskAnswers, setRiskAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedScam, setSelectedScam] = useState<typeof SCAM_EXAMPLES[0] | null>(null);

  useEffect(() => {
    if (currentView === 'chat' && chatMessages.length === 0) {
      setChatMessages([{
        id: '1',
        role: 'assistant',
        content: "Hi there! I'm your CryptoStart Buddy. I'm here to help you understand crypto in simple terms. What would you like to learn about?",
        timestamp: new Date()
      }]);
    }
  }, [currentView, chatMessages.length]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: chatInput,
          context: 'Crypto education for beginners'
        })
      });

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I'm here to help! Could you ask me something about crypto?",
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble right now. Try asking me about crypto basics, wallets, or scam prevention!",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRiskAnswer = (value: number) => {
    const currentQuestion = RISK_ASSESSMENT_QUESTIONS[currentQuestionIndex];
    setRiskAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentQuestionIndex < RISK_ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const getRiskResults = () => {
    const score = calculateRiskScore(riskAnswers);
    const riskLevel = getRiskLevel(score);
    const recommendations = generateRecommendations(score);
    return { score, riskLevel, recommendations };
  };

  const isRiskAssessmentComplete = Object.keys(riskAnswers).length === RISK_ASSESSMENT_QUESTIONS.length;

  const renderHomeView = () => (
    <div className="py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-text">CryptoStart Buddy</h1>
        <p className="text-lg text-text/70 max-w-md mx-auto">
          Your friendly guide to crypto, jargon-free and scam-free.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-surface rounded-lg p-4 shadow-card">
        <ProgressBar progress={progress} />
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 gap-4">
        <GuideCard
          title="Learn About Crypto"
          description="Start with the basics - what is cryptocurrency and how does it work?"
          estimatedTime={5}
          icon={<BookOpen className="w-6 h-6 text-primary" />}
          onClick={() => setCurrentView('learn')}
        />
        
        <GuideCard
          title="Set Up a Wallet"
          description="Step-by-step guide to creating your first secure crypto wallet"
          estimatedTime={15}
          isPremium={true}
          icon={<Wallet className="w-6 h-6 text-primary" />}
          onClick={() => setCurrentView('wallet')}
        />
        
        <GuideCard
          title="Identify Scams"
          description="Learn to spot and avoid common crypto scams and frauds"
          estimatedTime={12}
          isPremium={true}
          icon={<Shield className="w-6 h-6 text-primary" />}
          onClick={() => setCurrentView('scams')}
        />
        
        <GuideCard
          title="Risk Assessment"
          description="Find out how much crypto investment is right for you"
          estimatedTime={8}
          icon={<TrendingUp className="w-6 h-6 text-primary" />}
          onClick={() => setCurrentView('risk')}
        />
      </div>

      {/* Chat CTA */}
      <div className="bg-accent/10 rounded-lg p-6 text-center">
        <MessageCircle className="w-8 h-8 text-accent mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-text mb-2">
          Have Questions?
        </h3>
        <p className="text-text/70 mb-4">
          Chat with me anytime for personalized crypto guidance
        </p>
        <CallToAction
          variant="primary"
          onClick={() => setCurrentView('chat')}
        >
          Start Chatting
        </CallToAction>
      </div>
    </div>
  );

  const renderLearnView = () => (
    <div className="py-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setCurrentView('home')}
          className="p-2 hover:bg-border rounded-lg transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold text-text">Learn About Crypto</h1>
      </div>

      <div className="space-y-4">
        {EDUCATIONAL_MODULES.filter(m => m.category === 'basics').map((module) => (
          <GuideCard
            key={module.moduleId}
            title={module.title}
            description={module.content}
            estimatedTime={module.estimatedTime}
            isPremium={module.isPremium}
            variant="detail"
            icon={<BookOpen className="w-6 h-6 text-primary" />}
            onClick={() => {
              // In a real app, this would navigate to the module content
              setProgress(prev => Math.min(100, prev + 10));
            }}
          />
        ))}
      </div>

      <div className="bg-primary/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text mb-2">
          Ready for More?
        </h3>
        <p className="text-text/70 mb-4">
          Unlock premium content with personalized guidance
        </p>
        <CallToAction variant="primary">
          Upgrade for {formatCurrency(PRICING.PREMIUM_MONTHLY)}/month
        </CallToAction>
      </div>
    </div>
  );

  const renderWalletView = () => (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setCurrentView('home')}
          className="p-2 hover:bg-border rounded-lg transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold text-text">Wallet Setup</h1>
      </div>

      <WalletSetup />
    </div>
  );

  const renderScamsView = () => (
    <div className="py-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setCurrentView('home')}
          className="p-2 hover:bg-border rounded-lg transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold text-text">Identify Scams</h1>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800 mb-1">Stay Safe</h3>
            <p className="text-red-700 text-sm">
              Learn to recognize these common scams before they target you.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {SCAM_EXAMPLES.map((scam) => (
          <GuideCard
            key={scam.id}
            title={scam.title}
            description={scam.description}
            variant="detail"
            icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
            onClick={() => {
              setSelectedScam(scam);
              setCurrentView('scam-detail');
            }}
          />
        ))}
      </div>

      {/* Interactive Quiz Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          🧠 Test Your Knowledge
        </h3>
        <p className="text-blue-700 mb-4">
          Take our interactive scam identification quiz to test what you've learned
        </p>
        <CallToAction
          variant="secondary"
          onClick={() => {
            setCurrentView('quiz');
          }}
        >
          Start Quiz
        </CallToAction>
      </div>

      <div className="bg-accent/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text mb-2">
          Scam-Proofing Masterclass
        </h3>
        <p className="text-text/70 mb-4">
          Complete interactive training with real-world examples
        </p>
        <CallToAction variant="primary">
          Get Masterclass - {formatCurrency(PRICING.SCAM_MASTERCLASS)}
        </CallToAction>
      </div>
    </div>
  );

  const renderScamDetailView = () => {
    if (!selectedScam) return null;

    return (
      <div className="py-8 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setCurrentView('scams')}
            className="p-2 hover:bg-border rounded-lg transition-smooth"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-semibold text-text">{selectedScam.title}</h1>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-card">
          <p className="text-text/70 mb-6">{selectedScam.description}</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Red Flags
              </h3>
              <ul className="space-y-2">
                {selectedScam.redFlags.map((flag, index) => (
                  <li key={index} className="flex items-start gap-2 text-text/70">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    {flag}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                How to Protect Yourself
              </h3>
              <ul className="space-y-2">
                {selectedScam.prevention.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-text/70">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRiskView = () => (
    <div className="py-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setCurrentView('home')}
          className="p-2 hover:bg-border rounded-lg transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold text-text">Risk Assessment</h1>
      </div>

      {!isRiskAssessmentComplete ? (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg p-6 shadow-card">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-text/70 mb-2">
                <span>Question {currentQuestionIndex + 1} of {RISK_ASSESSMENT_QUESTIONS.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / RISK_ASSESSMENT_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / RISK_ASSESSMENT_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <QuestionnaireItem
              question={RISK_ASSESSMENT_QUESTIONS[currentQuestionIndex].question}
              options={RISK_ASSESSMENT_QUESTIONS[currentQuestionIndex].options}
              selectedValue={riskAnswers[RISK_ASSESSMENT_QUESTIONS[currentQuestionIndex].id]}
              onSelect={handleRiskAnswer}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {(() => {
            const { score, riskLevel, recommendations } = getRiskResults();
            return (
              <>
                <div className="bg-surface rounded-lg p-6 shadow-card text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-2">
                    Your Risk Profile
                  </h3>
                  <div className={`text-xl font-semibold mb-2 ${riskLevel.color}`}>
                    {riskLevel.level}
                  </div>
                  <p className="text-text/70 mb-4">{riskLevel.description}</p>
                  <div className="text-3xl font-bold text-primary">{score}/100</div>
                </div>

                <div className="bg-surface rounded-lg p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-text mb-4">
                    Personalized Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-text/70">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <CallToAction 
                  variant="primary" 
                  size="lg"
                  className="w-full"
                  onClick={() => setCurrentView('chat')}
                >
                  Get Personalized Guidance - {formatCurrency(PRICING.BASIC_SESSION)}
                </CallToAction>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );

  const renderChatView = () => (
    <div className="py-8 h-screen flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setCurrentView('home')}
          className="p-2 hover:bg-border rounded-lg transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold text-text">Chat with Buddy</h1>
      </div>

      <div className="flex-1 bg-surface rounded-lg shadow-card flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatMessages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.content}
              variant={message.role}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="bg-border rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-text/50 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-text/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-text/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about crypto..."
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!chatInput.trim() || isLoading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuizView = () => (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setCurrentView('scams')}
          className="p-2 hover:bg-border rounded-lg transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold text-text">Scam Identification Quiz</h1>
      </div>

      <Quiz
        questions={SAMPLE_SCAM_QUIZ_QUESTIONS}
        title="Test Your Scam Detection Skills"
        description="Answer these questions to see how well you can identify common crypto scams"
        onComplete={(score, total) => {
          // Update progress when quiz is completed
          setProgress(prev => Math.min(100, prev + 5));
        }}
      />
    </div>
  );

  return (
    <AppShell>
      {currentView === 'home' && renderHomeView()}
      {currentView === 'learn' && renderLearnView()}
      {currentView === 'wallet' && renderWalletView()}
      {currentView === 'scams' && renderScamsView()}
      {currentView === 'scam-detail' && renderScamDetailView()}
      {currentView === 'quiz' && renderQuizView()}
      {currentView === 'risk' && renderRiskView()}
      {currentView === 'chat' && renderChatView()}
    </AppShell>
  );
}
