import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface RejectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  debtAmount: number;
}

const RejectionModal = ({ open, onOpenChange, debtAmount }: RejectionModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const script = document.createElement('script');
      script.defer = true;
      script.src = 'https://assets.podberem.online/widget-market/js/loader.js';
      script.onload = () => {
        if (window.WidgetMarket) {
          window.WidgetMarket.init(script, 'embedded-offers', {
            platform_id: '1664',
            category: [14],
            btn_color_primary: '#735FF2',
            btn_color_hover: '#F5447A',
            btn_color_active: '#422DC8',
            btn_text_color_primary: '#FFFFFF',
            btn_text_color_hover: '#FFFFFF',
            btn_text_color_active: '#FFFFFF'
          });
        }
      };
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${isLoading ? 'border-4 animate-border-glow' : ''}`}>
        {isLoading && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute inset-0 animate-border-glow opacity-20 rounded-2xl"></div>
          </div>
        )}
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Icon name="AlertCircle" className="text-red-600" size={28} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-red-600">
                Заявка отклонена
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-base mt-3">
            К сожалению, ваша заявка была отклонена из-за наличия задолженности в ФССП на сумму{' '}
            <strong className="text-red-600">{debtAmount.toLocaleString('ru-RU')} ₽</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Icon name="Info" className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-amber-900 mb-1">Повторное обращение возможно через 30 дней</p>
                <p className="text-amber-800">
                  После погашения задолженности вы сможете подать новую заявку на получение займа.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Icon name="Building2" size={22} className="text-primary" />
              Альтернативные предложения от МФО
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Мы подобрали для вас микрофинансовые организации, которые могут одобрить вашу заявку:
            </p>
            
            <div id="embedded-offers" className="min-h-[400px]">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-muted-foreground">Загрузка предложений...</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <div className="flex gap-3">
              <Icon name="Lightbulb" className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Рекомендация</p>
                <p>
                  Для повышения шансов на одобрение займа рекомендуем сначала погасить имеющиеся 
                  задолженности через официальный сайт ФССП.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

declare global {
  interface Window {
    WidgetMarket: {
      init: (script: HTMLScriptElement, containerId: string, config: any) => void;
    };
  }
}

export default RejectionModal;