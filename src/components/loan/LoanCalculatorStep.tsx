import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
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
  const dailyRate = (overpayment / formData.loanTerm).toFixed(0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg animate-bounce-in">
          <Icon name="Calculator" className="text-white" size={36} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
          Калькулятор займа
        </h2>
        <p className="text-base text-muted-foreground">Настройте условия под себя</p>
      </div>

      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="space-y-4 animate-slide-up">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <Icon name="Banknote" size={20} className="text-blue-600" />
                Сумма займа
              </Label>
              <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {formData.loanAmount.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="bg-white/50 rounded-xl p-4">
              <Slider
                value={[formData.loanAmount]}
                onValueChange={([value]) =>
                  setFormData({ ...formData, loanAmount: value })
                }
                min={3000}
                max={30000}
                step={1000}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-blue-700 font-semibold mt-2">
                <span>3 000 ₽</span>
                <span>30 000 ₽</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg font-bold text-purple-900 flex items-center gap-2">
                <Icon name="Calendar" size={20} className="text-purple-600" />
                Срок займа
              </Label>
              <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {formData.loanTerm} дней
              </span>
            </div>
            <div className="bg-white/50 rounded-xl p-4">
              <Slider
                value={[formData.loanTerm]}
                onValueChange={([value]) =>
                  setFormData({ ...formData, loanTerm: value })
                }
                min={7}
                max={30}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-purple-700 font-semibold mt-2">
                <span>7 дней</span>
                <span>30 дней</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="p-6 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white border-0 shadow-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/30">
              <span className="text-lg font-semibold flex items-center gap-2">
                <Icon name="TrendingUp" size={20} />
                К возврату
              </span>
              <span className="text-4xl font-black">
                {totalAmount.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm font-medium opacity-90 mb-1">Переплата</p>
                <p className="text-2xl font-bold">{overpayment.toLocaleString('ru-RU')} ₽</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm font-medium opacity-90 mb-1">В день</p>
                <p className="text-2xl font-bold">{dailyRate} ₽</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
              <Icon name="Info" size={20} className="flex-shrink-0" />
              <p className="text-sm font-medium">
                Ставка 1.5% в день • Без скрытых комиссий
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all">
            <Icon name="Zap" className="mx-auto mb-2 text-blue-600" size={24} />
            <p className="text-xs font-bold text-blue-900">Быстрое одобрение</p>
          </Card>
          
          <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all">
            <Icon name="Shield" className="mx-auto mb-2 text-green-600" size={24} />
            <p className="text-xs font-bold text-green-900">Безопасно</p>
          </Card>
          
          <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all">
            <Icon name="Clock" className="mx-auto mb-2 text-purple-600" size={24} />
            <p className="text-xs font-bold text-purple-900">24/7</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
