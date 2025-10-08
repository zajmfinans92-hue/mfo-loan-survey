import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type SuccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countdown: number;
  formData: FormData;
  onClose: () => void;
};

export default function SuccessModal({
  open,
  onOpenChange,
  countdown,
  formData,
  onClose,
}: SuccessModalProps) {
  const getCheckingStatus = () => {
    if (countdown > 45) {
      return {
        text: 'Идёт проверка данных',
        icon: 'FileSearch' as const,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      };
    } else if (countdown > 30) {
      return {
        text: 'Проверка в базе ФССП',
        icon: 'Shield' as const,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
      };
    } else {
      return {
        text: 'Анализ кредитного рейтинга',
        icon: 'TrendingUp' as const,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      };
    }
  };

  const status = getCheckingStatus();
  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat('ru-RU').format(Number(amount)) + ' ₽';
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg rounded-3xl border-0 shadow-2xl p-0 overflow-hidden" hideClose>
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZoNFYwaC00djE2em0wIDQ0aDR2LTE2aC00djE2ek0xNiAzNmg0di00aC00djR6bTQ0IDBoNHYtNGgtNHY0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          <div className="relative z-10 text-center space-y-4">
            <div className="mx-auto w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 animate-pulse">
              <Icon name="Clock" className="text-white" size={48} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold mb-2">Рассмотрение заявки</h2>
              <p className="text-blue-100 text-sm">Идет автоматическая проверка данных</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="text-center space-y-4">
              <div className="text-7xl font-black text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text tabular-nums">
                {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
              </div>
              <div className={`inline-flex items-center gap-2 ${status.bgColor} px-5 py-2.5 rounded-full animate-fade-in shadow-sm`}>
                <Icon name={status.icon} className={status.color} size={20} />
                <span className={`text-sm font-bold ${status.color}`}>{status.text}</span>
              </div>
              <Progress value={((60 - countdown) / 60) * 100} className="h-3 mt-4 bg-blue-100" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="Banknote" className="text-green-600" size={20} />
                  <p className="text-xs font-semibold text-green-900">Сумма займа</p>
                </div>
                <p className="text-lg font-bold text-green-700">{formatAmount(formData.loanAmount)}</p>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" className="text-amber-600" size={20} />
                  <p className="text-xs font-semibold text-amber-900">Срок займа</p>
                </div>
                <p className="text-lg font-bold text-amber-700">{formData.loanTerm} дней</p>
              </div>
            </Card>
          </div>

          <Card className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
            <div className="flex gap-3">
              <Icon name="Phone" className="text-indigo-600 flex-shrink-0" size={22} />
              <div>
                <p className="text-sm font-bold text-indigo-900">Способ связи</p>
                <p className="text-sm text-indigo-700 mt-1">Звонок на {formData.phone}</p>
              </div>
            </div>
          </Card>

          <div className="pt-2 text-center">
            <p className="text-xs text-muted-foreground">
              Среднее время рассмотрения: <span className="font-semibold text-foreground">1-2 минуты</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}