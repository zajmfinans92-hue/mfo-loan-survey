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
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
          Калькулятор займа
        </h2>
        <p className="text-base md:text-lg text-muted-foreground font-medium">Выберите удобные условия</p>
      </div>

      <div className="space-y-6 md:space-y-7">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <Label className="text-lg md:text-xl font-semibold">Сумма займа</Label>
            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {formData.loanAmount.toLocaleString('ru-RU')} ₽
            </span>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
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
            <div className="flex justify-between text-sm text-muted-foreground font-medium mt-2">
              <span>3 000 ₽</span>
              <span>30 000 ₽</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <Label className="text-lg md:text-xl font-semibold">Срок займа</Label>
            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {formData.loanTerm} дней
            </span>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
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
            <div className="flex justify-between text-sm text-muted-foreground font-medium mt-2">
              <span>7 дней</span>
              <span>30 дней</span>
            </div>
          </div>
        </div>

        <Card className="p-5 md:p-7 bg-gradient-to-br from-primary/10 via-blue-500/10 to-accent/10 border-2 border-primary/30 shadow-lg">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base md:text-lg font-semibold text-muted-foreground">К возврату:</span>
              <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {(formData.loanAmount + calculateOverpayment()).toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base pt-2 border-t border-primary/20">
              <span className="font-medium text-muted-foreground">Переплата:</span>
              <span className="font-bold text-accent text-lg">
                {calculateOverpayment().toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}