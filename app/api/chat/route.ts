import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { handleApiError, withErrorHandler, validateRequired } from '@/lib/error-handling';
import { logger, withTiming } from '@/lib/logger';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

async function handleChatRequest(request: NextRequest) {
  const startTime = Date.now();
  const { message, context, userId } = await request.json();

  // Validate input
  validateRequired(message, 'message');

  logger.info('Chat request received', 'CHAT_API', { messageLength: message.length, context }, userId);

    const systemPrompt = `You are CryptoStart Buddy, a friendly and knowledgeable crypto education assistant. Your goal is to help complete beginners understand cryptocurrency in simple, jargon-free terms.

Key principles:
- Use everyday analogies and simple language
- Always emphasize security and scam prevention
- Encourage responsible investing ("only invest what you can afford to lose")
- Be encouraging but realistic about risks
- Provide actionable, step-by-step guidance
- If asked about specific investments, always recommend doing research and starting small

Context: ${context || 'General crypto education'}

Keep responses concise but helpful, and always maintain a friendly, supportive tone.`;

  const completion = await withTiming(
    () => openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
    'OpenAI API call',
    'CHAT_API'
  );

  const response = completion.choices[0]?.message?.content ||
    "I'm here to help you learn about crypto! Could you ask me something specific?";

  const duration = Date.now() - startTime;
  logger.apiCall('/api/chat', 'POST', 200, duration, userId);

  return NextResponse.json({ response });
}

export const POST = withErrorHandler(handleChatRequest, 'CHAT_API');
