'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  category: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title: string;
  description?: string;
  onComplete?: (score: number, total: number) => void;
  className?: string;
}

export function Quiz({ questions, title, description, onComplete, className }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);

      // Calculate score
      const correctAnswers = questions.filter(q =>
        selectedAnswers[q.id] === q.options.find(opt => opt.isCorrect)?.id
      ).length;

      onComplete?.(correctAnswers, questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const getScore = () => {
    return questions.filter(q =>
      selectedAnswers[q.id] === q.options.find(opt => opt.isCorrect)?.id
    ).length;
  };

  const getScorePercentage = () => {
    return Math.round((getScore() / questions.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return { message: 'Excellent! You\'re a crypto security expert!', color: 'text-green-600' };
    if (percentage >= 80) return { message: 'Great job! You know your scams well.', color: 'text-blue-600' };
    if (percentage >= 70) return { message: 'Good work! Keep learning about crypto security.', color: 'text-yellow-600' };
    return { message: 'Keep studying! Crypto security is important.', color: 'text-orange-600' };
  };

  if (quizCompleted && showResults) {
    const score = getScore();
    const { message, color } = getScoreMessage();

    return (
      <div className={cn('space-y-6', className)}>
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-text">Quiz Complete!</h2>
          <div className="text-4xl font-bold text-primary">{score}/{questions.length}</div>
          <div className="text-xl font-semibold text-text">{getScorePercentage()}%</div>
          <p className={cn('text-lg', color)}>{message}</p>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold text-text mb-4">Review Your Answers</h3>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const selectedAnswerId = selectedAnswers[question.id];
              const selectedOption = question.options.find(opt => opt.id === selectedAnswerId);
              const correctOption = question.options.find(opt => opt.isCorrect);
              const isCorrect = selectedAnswerId === correctOption?.id;

              return (
                <div key={question.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                      isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    )}>
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Your answer:</span>{' '}
                          <span className={cn(isCorrect ? 'text-green-600' : 'text-red-600')}>
                            {selectedOption?.text || 'Not answered'}
                          </span>
                        </p>
                        {!isCorrect && correctOption && (
                          <p>
                            <span className="font-medium">Correct answer:</span>{' '}
                            <span className="text-green-600">{correctOption.text}</span>
                          </p>
                        )}
                      </div>
                      <p className="text-text/70 text-sm mt-2">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-text">{title}</h2>
        {description && <p className="text-text/70">{description}</p>}
      </div>

      {/* Progress */}
      <div className="bg-surface rounded-lg p-4 shadow-card">
        <div className="flex justify-between text-sm text-text/70 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <h3 className="text-xl font-semibold text-text mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswers[currentQuestion.id] === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                className={cn(
                  'w-full text-left p-4 border-2 rounded-lg transition-all duration-200',
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                    isSelected ? 'border-primary bg-primary' : 'border-border'
                  )}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-text">{option.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-text/70">
          {currentQuestion.category && (
            <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs">
              {currentQuestion.category}
            </span>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestion.id]}
          className={cn(
            'inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors',
            selectedAnswers[currentQuestion.id]
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-border text-text/50 cursor-not-allowed'
          )}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Sample quiz questions for scam identification
export const SAMPLE_SCAM_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'You receive a message from what appears to be Elon Musk offering to double your Bitcoin if you send it to him first. What should you do?',
    options: [
      { id: 'a1', text: 'Send the Bitcoin immediately to get double back', isCorrect: false },
      { id: 'a2', text: 'Verify the account is legitimate through official channels', isCorrect: true },
      { id: 'a3', text: 'Ask for more details about how it works', isCorrect: false },
      { id: 'a4', text: 'Ignore it completely', isCorrect: false }
    ],
    explanation: 'Always verify celebrity accounts through official websites or known contact methods. Legitimate giveaways never ask you to send crypto first.',
    category: 'Social Media Scams'
  },
  {
    id: 'q2',
    question: 'A website looks exactly like your wallet provider and asks for your seed phrase to "verify your account." What is this?',
    options: [
      { id: 'a1', text: 'A legitimate security check', isCorrect: false },
      { id: 'a2', text: 'A phishing scam', isCorrect: true },
      { id: 'a3', text: 'A wallet update notification', isCorrect: false },
      { id: 'a4', text: 'A marketing promotion', isCorrect: false }
    ],
    explanation: 'Phishing scams create fake websites that look real to steal your credentials. Never share your seed phrase with anyone.',
    category: 'Phishing'
  },
  {
    id: 'q3',
    question: 'An investment promises 100% returns in 24 hours with "guaranteed profits." What red flag does this raise?',
    options: [
      { id: 'a1', text: 'It\'s a legitimate high-yield opportunity', isCorrect: false },
      { id: 'a2', text: 'It\'s likely a Ponzi scheme', isCorrect: true },
      { id: 'a3', text: 'It\'s a government-backed investment', isCorrect: false },
      { id: 'a4', text: 'It\'s a normal market fluctuation', isCorrect: false }
    ],
    explanation: 'Guaranteed high returns with no risk are a classic sign of Ponzi schemes or scams. Remember: high returns usually mean high risk.',
    category: 'Investment Scams'
  },
  {
    id: 'q4',
    question: 'Someone calls claiming to be from your wallet support and asks for remote access to your computer. Should you allow this?',
    options: [
      { id: 'a1', text: 'Yes, they need to fix a security issue', isCorrect: false },
      { id: 'a2', text: 'No, this is likely a tech support scam', isCorrect: true },
      { id: 'a3', text: 'Only if they provide official identification', isCorrect: false },
      { id: 'a4', text: 'Yes, but only for a few minutes', isCorrect: false }
    ],
    explanation: 'Legitimate wallet support will never ask for remote access or your credentials. Always contact support through official channels.',
    category: 'Tech Support Scams'
  },
  {
    id: 'q5',
    question: 'A crypto project has no team information, no smart contract audit, and promises 1000x returns. What should you do?',
    options: [
      { id: 'a1', text: 'Invest your life savings immediately', isCorrect: false },
      { id: 'a2', text: 'Research the team and check for audits', isCorrect: true },
      { id: 'a3', text: 'Tell all your friends to invest', isCorrect: false },
      { id: 'a4', text: 'Ignore unrealistic promises', isCorrect: false }
    ],
    explanation: 'Always research crypto projects thoroughly. Anonymous teams and unaudited contracts are major red flags for potential rug pulls.',
    category: 'Rug Pull Prevention'
  }
];

