import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { FormData } from './types';

type LoanCalculatorStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
  calculateOverpayment: () => number;
};

export default function LoanCalculatorStep({
  formData,
  setFormData,
  calculateOverpayment,
}: LoanCalculatorStepProps) {
  const overpayment = calculateOverpayment();
  const totalAmount = formData.loanAmount + overpayment;

  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + formData.loanTerm);
  const formattedDate = returnDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 p-6 rounded-2xl shadow-lg">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-gray-600">Сумма</span>
              <span className="text-3xl font-bold text-gray-900">{formData.loanAmount.toLocaleString('ru-RU')} ₽</span>
            </div>
            
            <Slider
              value={[formData.loanAmount]}
              onValueChange={([value]) =>
                setFormData({ ...formData, loanAmount: value })
              }
              min={3000}
              max={30000}
              step={1000}
              className="py-2"
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>3 000 ₽</span>
              <span>30 000 ₽</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-gray-600">Срок</span>
              <span className="text-3xl font-bold text-gray-900">{formData.loanTerm} дней</span>
            </div>
            
            <Slider
              value={[formData.loanTerm]}
              onValueChange={([value]) =>
                setFormData({ ...formData, loanTerm: value })
              }
              min={7}
              max={98}
              step={1}
              className="py-2"
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>7 дней</span>
              <span>30 дней</span>
              <span>98 дней</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">При возврате до {formattedDate}:</span>
              <span className="text-lg font-bold text-gray-900">{formData.loanAmount.toLocaleString('ru-RU')},00₽</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">При возврате в срок:</span>
              <span className="text-lg font-bold text-gray-900">{totalAmount.toLocaleString('ru-RU')},00₽</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
