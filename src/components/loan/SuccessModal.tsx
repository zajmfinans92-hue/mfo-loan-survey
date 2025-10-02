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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-4 animate-scale-in">
            <Icon name="CheckCircle2" className="text-white" size={40} />
          </div>
          <DialogTitle className="text-center text-xl md:text-2xl font-bold">
            Заявка принята!
          </DialogTitle>
          <DialogDescription className="text-center text-sm md:text-base pt-2">
            Менеджер свяжется с вами в ближайшее время
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300">
            <div className="text-center space-y-3">
              <div className="text-5xl font-bold text-blue-600">
                {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
              </div>
              <div className={`flex items-center justify-center gap-2 ${status.bgColor} px-4 py-2 rounded-full animate-fade-in`}>
                <Icon name={status.icon} className={status.color} size={18} />
                <p className={`text-sm font-semibold ${status.color}`}>{status.text}</p>
              </div>
              <Progress value={((60 - countdown) / 60) * 100} className="h-2 mt-3" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
            <div className="flex gap-3">
              <Icon name="Phone" className="text-indigo-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm font-semibold text-indigo-900">Способ связи</p>
                <p className="text-xs text-indigo-700">Звонок на {formData.phone}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
            <div className="flex gap-3">
              <Icon name="Mail" className="text-sky-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm font-semibold text-sky-900">Подтверждение на email</p>
                <p className="text-xs text-sky-700">{formData.email}</p>
              </div>
            </div>
          </Card>
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            Понятно
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}