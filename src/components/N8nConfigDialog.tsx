
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Save, Trash2 } from 'lucide-react';
import { n8nService } from '@/utils/n8nService';
import { useToast } from '@/hooks/use-toast';

const N8nConfigDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(n8nService.getWebhookUrl() || '');
  const { toast } = useToast();

  const handleSave = () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Eroare",
        description: "Te rog să introduci URL-ul webhook-ului n8n",
        variant: "destructive",
      });
      return;
    }

    // Validare URL
    try {
      new URL(webhookUrl);
    } catch {
      toast({
        title: "Eroare",
        description: "URL-ul webhook-ului nu este valid",
        variant: "destructive",
      });
      return;
    }

    n8nService.setWebhookUrl(webhookUrl);
    toast({
      title: "Succes",
      description: "Configurația n8n a fost salvată",
    });
    setIsOpen(false);
  };

  const handleClear = () => {
    n8nService.clearWebhookUrl();
    setWebhookUrl('');
    toast({
      title: "Șters",
      description: "Configurația n8n a fost ștearsă",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Configurare n8n</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configurare integrare n8n</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">URL Webhook n8n</Label>
            <Input
              id="webhook-url"
              placeholder="https://your-n8n-instance.com/webhook/your-webhook-id"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Copiază URL-ul webhook-ului din workflow-ul tău n8n
            </p>
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Salvează
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleClear}
              disabled={!webhookUrl}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default N8nConfigDialog;
