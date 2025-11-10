import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type ManagerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  manager: {
    name: string;
    photo: string;
    position: string;
  };
  formData: FormData;
};

export default function ManagerModal({
  open,
  onOpenChange,
  manager,
  formData,
}: ManagerModalProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽';
  };

  const getCurrentTime = () => {
    const now = new Date();
    const mskTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
    const hours = mskTime.getHours();
    return hours;
  };

  const isWorkingHours = () => {
    const hours = getCurrentTime();
    return hours >= 9 && hours < 18;
  };

  const getWorkingStatus = () => {
    if (isWorkingHours()) {
      return {
        text: 'Менеджер сейчас на связи',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: 'Phone' as const,
      };
    }
    return {
      text: 'Менеджер свяжется с 09:00 по МСК',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: 'Clock' as const,
    };
  };

  const status = getWorkingStatus();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-lg border-0 shadow-2xl p-0 overflow-hidden animate-scale-in" hideClose>
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-8 text-white relative overflow-hidden animate-slide-down">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZoNFYwaC00djE2em0wIDQ0aDR2LTE2aC00djE2ek0xNiAzNmg0di00aC00djR6bTQ0IDBoNHYtNGgtNHY0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          <div className="relative z-10 text-center space-y-4">
            <div className="mx-auto w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 animate-bounce-in">
              <Icon name="CheckCircle2" className="text-white" size={48} />
            </div>
            <div className="animate-fade-in">
              <h2 className="text-3xl font-extrabold mb-2">Заявка одобрена!</h2>
              <p className="text-green-100 text-sm">Ваша заявка успешно принята</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 animate-slide-up">
            <div className="text-center space-y-2">
              <p className="text-sm text-green-800 font-semibold">Одобренная сумма</p>
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
                {formatAmount(formData.loanAmount)}
              </div>
              <p className="text-xs text-green-700">на {formData.loanTerm} дней</p>
            </div>
          </Card>

          <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={manager.photo}
                  alt={manager.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{manager.name}</h3>
                <p className="text-sm text-gray-600">{manager.position}</p>
                <div className={`inline-flex items-center gap-2 ${status.bgColor} px-3 py-1 rounded-full mt-2`}>
                  <Icon name={status.icon} className={status.color} size={14} />
                  <span className={`text-xs font-semibold ${status.color}`}>{status.text}</span>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Icon name="Clock" className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm font-bold text-blue-900">Режим работы</p>
                  <p className="text-sm text-blue-700">09:00 - 18:00 по МСК</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Phone" className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm font-bold text-blue-900">Контакт</p>
                  <p className="text-sm text-blue-700">{formData.phone}</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="pt-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Понятно
            </Button>
          </div>

          <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-xs text-muted-foreground">
              Менеджер свяжется с вами в течение <span className="font-semibold text-foreground">15 минут</span> в рабочее время
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}