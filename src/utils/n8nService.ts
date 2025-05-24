import { supabase } from '@/integrations/supabase/client';

export class N8nService {
  private static instance: N8nService;
  private webhookUrl: string | null = null;

  private constructor() {
    this.webhookUrl = localStorage.getItem('n8n_webhook_url');
  }

  static getInstance(): N8nService {
    if (!N8nService.instance) {
      N8nService.instance = new N8nService();
    }
    return N8nService.instance;
  }

  setWebhookUrl(url: string): void {
    this.webhookUrl = url;
    localStorage.setItem('n8n_webhook_url', url);
  }

  getWebhookUrl(): string | null {
    return this.webhookUrl;
  }

  async sendQuestionToN8n(question: string): Promise<string> {
    if (!this.webhookUrl) {
      throw new Error('n8n webhook URL nu este setat. Te rog să-l configurezi în setări.');
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question
        })
      });

      if (!response.ok) {
        throw new Error(`n8n webhook responded with status: ${response.status}`);
      }

      const data = await response.json();
      return data.output || 'Nu am primit un răspuns valid.';

    } catch (error) {
      console.error('Error calling n8n webhook:', error);
      throw error;
    }
  }

  clearWebhookUrl(): void {
    this.webhookUrl = null;
    localStorage.removeItem('n8n_webhook_url');
  }
}

export const n8nService = N8nService.getInstance();