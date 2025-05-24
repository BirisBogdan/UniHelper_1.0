import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, ChevronDown, ChevronUp, BookOpen, GraduationCap, Globe, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { n8nService } from '@/utils/n8nService';
import N8nConfigDialog from '@/components/N8nConfigDialog';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Salut! Sunt asistentul tău AI 24/7 pentru întrebări universitare. Conectat cu n8n pentru răspunsuri avansate despre burse, programe Erasmus, proceduri de aplicare și politici universitare!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const faqs: FAQ[] = [
    {
      question: "Cum aplic pentru burse?",
      answer: "Aplicațiile pentru burse necesită de obicei transcripte academice, scrisori de recomandare și o declarație personală. Verifică biroul de ajutor financiar pentru termene și cerințe specifice.",
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      question: "Ce este programul Erasmus?",
      answer: "Erasmus este un program de schimb studențesc al Uniunii Europene care îți permite să studiezi la universități partenere pentru 3-12 luni, câștigând credite pentru diploma ta.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      question: "Care sunt termenele pentru aplicații?",
      answer: "Termenele pentru aplicații variază în funcție de program. În general, aplicațiile pentru semestrul de toamnă se depun în martie-mai, iar cele pentru semestrul de primăvară în octombrie-noiembrie.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      question: "Cum îmi verific progresul academic?",
      answer: "Poți urmări progresul academic prin portalul studențesc, unde vei găsi transcriptul, creditele completate și lista cerințelor pentru diplomă.",
      icon: <BookOpen className="w-5 h-5" />
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    // Verifică dacă n8n este configurat
    if (!n8nService.getWebhookUrl()) {
      toast({
        title: "n8n nu este configurat",
        description: "Te rog să configurezi webhook-ul n8n din butonul de setări",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await n8nService.sendQuestionToN8n(currentMessage);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting n8n response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Îmi pare rău, dar întâmpin dificultăți tehnice cu n8n: ${error.message}. Te rog să verifici configurația și să încerci din nou.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFaqClick = async (faq: FAQ) => {
    const faqMessage: Message = {
      id: Date.now().toString(),
      text: faq.question,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, faqMessage]);
    setIsLoading(true);

    try {
      if (n8nService.getWebhookUrl()) {
        const response = await n8nService.sendQuestionToN8n(faq.question);
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, responseMessage]);
      } else {
        // Fallback la răspunsul local dacă n8n nu este configurat
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: faq.answer,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, responseMessage]);
      }
    } catch (error) {
      console.error('Error getting FAQ response:', error);
    } finally {
      setIsLoading(false);
      setIsFaqOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Asistent AI Universitar</h1>
              <p className="text-sm text-gray-600">24/7 Support cu n8n</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <N8nConfigDialog />
              <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* FAQ Section */}
        <Card className="bg-white/60 backdrop-blur-sm border-blue-200">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-blue-50/50 transition-colors"
            onClick={() => setIsFaqOpen(!isFaqOpen)}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-800">Întrebări Frecvente</h2>
            </div>
            {isFaqOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>
          
          {isFaqOpen && (
            <div className="border-t border-blue-100 bg-white/40">
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/60 rounded-lg border border-blue-100 hover:bg-blue-50/60 cursor-pointer transition-all hover:scale-[1.02]"
                    onClick={() => handleFaqClick(faq)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-blue-600 mt-1">
                        {faq.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{faq.question}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Chat Container */}
        <Card className="bg-white/60 backdrop-blur-sm border-blue-200 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md'
                      : 'bg-white/80 text-gray-800 rounded-bl-md border border-blue-100'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-line">{message.text}</div>
                  <p className={`text-xs mt-2 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/80 border border-blue-100 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">n8n procesează...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-blue-100 p-4 bg-white/40">
            <div className="flex gap-3">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Întreabă despre burse, Erasmus, aplicații..."
                className="flex-1 bg-white/80 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Enter pentru trimitere • Conectat cu n8n pentru răspunsuri avansate
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
