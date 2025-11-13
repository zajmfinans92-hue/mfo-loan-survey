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
      <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto rounded-2xl border-0 shadow-2xl p-4 sm:p-8" hideClose>
        <div className="text-center space-y-1 sm:space-y-2 mb-4 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Договор займа</h2>
          <p className="text-sm sm:text-base text-gray-500">от {getCurrentDate()}</p>
        </div>

        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 sm:border-[5px] border-blue-100 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 sm:border-[5px] border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-1 sm:space-y-2 mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Обработка данных</h3>
          <p className="text-sm sm:text-base text-gray-500">Обычно это занимает менее 3 минут</p>
        </div>

        <Card className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl mb-2 sm:mb-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-bold text-gray-900 mb-1">Рассмотрение заявки</p>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tabular-nums text-gray-900">
                  {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">осталось</span>
              </div>
            </div>
          </div>
          <div className="mt-2 sm:mt-3 bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl mb-2 sm:mb-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <div className="text-white text-lg sm:text-xl font-bold">₽</div>
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Запрошенная сумма</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 break-words">{formatAmount(displayAmount)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" className="text-white" size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Вернуть до</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900">{calculateReturnDate()}</p>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}