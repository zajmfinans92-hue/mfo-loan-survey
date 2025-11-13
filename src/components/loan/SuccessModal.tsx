import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type SuccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countdown: number;
  formData: FormData;
  onClose: () => void;
  approvedAmount?: number;
  bkiLoad?: 'high' | 'low' | null;
};

export default function SuccessModal({
  open,
  countdown,
  formData,
  approvedAmount,
}: SuccessModalProps) {
  const formatAmount = (amount: string | number) => {
    return new Intl.NumberFormat('ru-RU').format(Number(amount)) + ' ₽';
  };

  const displayAmount = approvedAmount || formData.loanAmount;
  const progressPercent = ((120 - countdown) / 120) * 100;

  const getCurrentStep = () => {
    if (countdown > 80) return 1;
    if (countdown > 40) return 2;
    return 3;
  };

  const currentStep = getCurrentStep();

  const calculateReturnDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + Number(formData.loanTerm));
    return date.toLocaleDateString('ru-RU');
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('ru-RU');
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-2xl p-8 overflow-hidden" hideClose>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              currentStep >= 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg scale-110' : 'bg-blue-200'
            }`}>
              <Icon name="FileText" className="text-white" size={32} />
            </div>
            <span className={`text-sm font-bold transition-colors ${
              currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'
            }`}>
              Регистрация
            </span>
          </div>

          <div className={`flex-1 h-1 rounded transition-all ${
            currentStep >= 2 ? 'bg-blue-500' : 'bg-blue-200'
          }`}></div>

          <div className="flex flex-col items-center gap-2">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              currentStep >= 2 ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg scale-110' : 'bg-blue-200'
            }`}>
              <Icon name="CheckCircle" className="text-white" size={32} />
            </div>
            <span className={`text-sm font-bold transition-colors ${
              currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'
            }`}>
              Одобрение
            </span>
          </div>

          <div className={`flex-1 h-1 rounded transition-all ${
            currentStep >= 3 ? 'bg-blue-500' : 'bg-blue-200'
          }`}></div>

          <div className="flex flex-col items-center gap-2">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              currentStep >= 3 ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg scale-110' : 'bg-blue-200'
            }`}>
              <div className="text-white text-2xl font-bold">₽</div>
            </div>
            <span className={`text-sm font-bold transition-colors ${
              currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'
            }`}>
              Перевод
            </span>
          </div>
        </div>

        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-black text-gray-900">Договор займа</h2>
          <p className="text-gray-500">от {getCurrentDate()}</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-8 border-blue-100 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Обработка данных</h3>
          <p className="text-gray-500">Обычно это занимает менее 3 минут</p>
        </div>

        <Card className="p-4 bg-gray-50 border border-gray-200 rounded-xl mb-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-gray-900 mb-1">Рассмотрение заявки</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tabular-nums text-gray-900">
                  {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-sm text-gray-500">осталось</span>
              </div>
            </div>
          </div>
          <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </Card>

        <Card className="p-4 bg-gray-50 border border-gray-200 rounded-xl mb-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <div className="text-white text-xl font-bold">₽</div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Запрошенная сумма</p>
              <p className="text-2xl font-black text-gray-900">{formatAmount(displayAmount)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Вернуть до</p>
              <p className="text-2xl font-black text-gray-900">{calculateReturnDate()}</p>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
