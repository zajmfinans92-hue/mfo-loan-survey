import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
  return (
    <div className="space-y-4 md:space-y-8 animate-fade-in">
      <div className="text-center space-y-1 md:space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Калькулятор займа
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">Выберите удобные условия</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <Label className="text-base md:text-lg">Сумма займа</Label>
            <span className="text-xl md:text-2xl font-bold text-primary">
              {formData.loanAmount.toLocaleString('ru-RU')} ₽
            </span>
          </div>
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
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>3 000 ₽</span>
            <span>30 000 ₽</span>
          </div>
        </div>

        <div className="space-y-2 md:space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <Label className="text-base md:text-lg">Срок займа</Label>
            <span className="text-xl md:text-2xl font-bold text-primary">
              {formData.loanTerm} дней
            </span>
          </div>
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
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>7 дней</span>
            <span>30 дней</span>
          </div>
        </div>

        <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base text-muted-foreground">К возврату:</span>
              <span className="text-2xl md:text-3xl font-bold">
                {(formData.loanAmount + calculateOverpayment()).toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-muted-foreground">Переплата:</span>
              <span className="font-semibold text-accent">
                {calculateOverpayment().toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}