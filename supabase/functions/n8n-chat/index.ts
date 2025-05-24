
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, n8nWebhookUrl } = await req.json();
    
    console.log('Sending question to n8n:', question);
    console.log('n8n webhook URL:', n8nWebhookUrl);

    if (!n8nWebhookUrl) {
      throw new Error('n8n webhook URL is required');
    }

    // Trimite întrebarea la n8n
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question,
        timestamp: new Date().toISOString(),
        source: 'university-ai-assistant'
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook responded with status: ${response.status}`);
    }

    const n8nResponse = await response.json();
    console.log('n8n response:', n8nResponse);

    // Extrage răspunsul din structura n8n (adaptează în funcție de cum îți returnează n8n datele)
    const aiResponse = n8nResponse.response || n8nResponse.answer || n8nResponse.message || 'Nu am primit un răspuns valid de la n8n.';

    return new Response(JSON.stringify({ 
      response: aiResponse,
      n8nData: n8nResponse // pentru debugging
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in n8n-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: 'Ne pare rău, dar întâmpin dificultăți tehnice cu sistemul n8n. Te rog să încerci din nou în câteva momente.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
