type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  userId?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, context?: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : '';
    const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : '';

    return `${timestamp} ${level.toUpperCase()} ${contextStr} ${message}${dataStr}`;
  }

  private log(level: LogLevel, message: string, context?: string, data?: any, userId?: string) {
    const formattedMessage = this.formatMessage(level, message, context, data);

    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedMessage);
        }
        break;
      case 'info':
        console.info(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'error':
        console.error(formattedMessage);
        break;
    }

    // In production, you might want to send logs to a service like:
    // - CloudWatch (AWS)
    // - Stackdriver (GCP)
    // - DataDog
    // - LogRocket
    if (!this.isDevelopment && level !== 'debug') {
      this.sendToLogService({
        timestamp: new Date().toISOString(),
        level,
        message,
        context,
        data,
        userId,
      });
    }
  }

  private async sendToLogService(entry: LogEntry) {
    try {
      // Example: Send to logging service
      // await fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(entry),
      // });
    } catch (error) {
      // Don't let logging errors break the app
      console.error('Failed to send log to service:', error);
    }
  }

  debug(message: string, context?: string, data?: any, userId?: string) {
    this.log('debug', message, context, data, userId);
  }

  info(message: string, context?: string, data?: any, userId?: string) {
    this.log('info', message, context, data, userId);
  }

  warn(message: string, context?: string, data?: any, userId?: string) {
    this.log('warn', message, context, data, userId);
  }

  error(message: string, context?: string, data?: any, userId?: string) {
    this.log('error', message, context, data, userId);
  }

  // Specialized logging methods
  userAction(userId: string, action: string, data?: any) {
    this.info(`User action: ${action}`, 'USER_ACTION', data, userId);
  }

  apiCall(endpoint: string, method: string, statusCode: number, duration: number, userId?: string) {
    this.info(
      `API Call: ${method} ${endpoint} - ${statusCode} (${duration}ms)`,
      'API',
      { endpoint, method, statusCode, duration },
      userId
    );
  }

  paymentEvent(userId: string, event: string, amount?: number, data?: any) {
    this.info(
      `Payment: ${event}`,
      'PAYMENT',
      { ...data, amount },
      userId
    );
  }

  quizCompletion(userId: string, quizId: string, score: number, total: number) {
    this.info(
      `Quiz completed: ${quizId}`,
      'QUIZ',
      { quizId, score, total, percentage: Math.round((score / total) * 100) },
      userId
    );
  }

  scamReported(userId: string, scamType: string, details?: any) {
    this.warn(
      `Scam reported: ${scamType}`,
      'SCAM_REPORT',
      details,
      userId
    );
  }
}

// Export singleton instance
export const logger = new Logger();

// Helper function to measure execution time
export function withTiming<T>(
  fn: () => Promise<T>,
  operationName: string,
  context?: string
): Promise<T> {
  const start = Date.now();

  return fn()
    .then((result) => {
      const duration = Date.now() - start;
      logger.info(`${operationName} completed`, context, { duration });
      return result;
    })
    .catch((error) => {
      const duration = Date.now() - start;
      logger.error(`${operationName} failed`, context, { duration, error: error.message });
      throw error;
    });
}

