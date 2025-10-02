import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type PaymentMethodStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function PaymentMethodStep({
  formData,
  setFormData,
}: PaymentMethodStepProps) {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="text-center space-y-1 md:space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Способ получения займа
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Выберите удобный способ получения средств
        </p>
      </div>

      <RadioGroup
        value={formData.paymentMethod}
        onValueChange={(value: 'card' | 'sbp' | 'bank') =>
          setFormData({ ...formData, paymentMethod: value })
        }
        className="space-y-3"
      >
        <Card
          className={`p-4 cursor-pointer transition-all ${
            formData.paymentMethod === 'card'
              ? 'border-primary border-2 bg-primary/5'
              : 'border-2 hover:border-primary/50'
          }`}
          onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="card" id="card" />
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="CreditCard" className="text-primary" size={20} />
              </div>
              <div>
                <Label htmlFor="card" className="text-sm md:text-base font-semibold cursor-pointer">
                  На банковскую карту
                </Label>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Моментальное зачисление
                </p>
              </div>
            </div>
          </div>
          {formData.paymentMethod === 'card' && (
            <div className="mt-4 space-y-3">
              <div>
                <Label className="text-sm">Номер карты</Label>
                <Input
                  value={formData.cardNumber || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  placeholder="0000 0000 0000 0000"
                  className="mt-1.5 h-11 md:h-10 text-base"
                  maxLength={19}
                />
              </div>
            </div>
          )}
        </Card>

        <Card
          className={`p-4 cursor-pointer transition-all ${
            formData.paymentMethod === 'sbp'
              ? 'border-primary border-2 bg-primary/5'
              : 'border-2 hover:border-primary/50'
          }`}
          onClick={() => setFormData({ ...formData, paymentMethod: 'sbp' })}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="sbp" id="sbp" />
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Smartphone" className="text-primary" size={20} />
              </div>
              <div>
                <Label htmlFor="sbp" className="text-sm md:text-base font-semibold cursor-pointer">
                  Через СБП
                </Label>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Система быстрых платежей
                </p>
              </div>
            </div>
          </div>
          {formData.paymentMethod === 'sbp' && (
            <div className="mt-4 space-y-3">
              <div>
                <Label className="text-sm">Номер телефона для СБП</Label>
                <Input
                  value={formData.phoneForSbp || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneForSbp: e.target.value })
                  }
                  placeholder="+7 (999) 123-45-67"
                  className="mt-1.5 h-11 md:h-10 text-base"
                />
              </div>
            </div>
          )}
        </Card>

        <Card
          className={`p-4 cursor-pointer transition-all ${
            formData.paymentMethod === 'bank'
              ? 'border-primary border-2 bg-primary/5'
              : 'border-2 hover:border-primary/50'
          }`}
          onClick={() => setFormData({ ...formData, paymentMethod: 'bank' })}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="bank" id="bank" />
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Building2" className="text-primary" size={20} />
              </div>
              <div>
                <Label htmlFor="bank" className="text-sm md:text-base font-semibold cursor-pointer">
                  На банковский счёт
                </Label>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Перевод на расчётный счёт
                </p>
              </div>
            </div>
          </div>
          {formData.paymentMethod === 'bank' && (
            <div className="mt-4 space-y-3">
              <div>
                <Label className="text-sm">Номер счёта</Label>
                <Input
                  value={formData.bankAccount || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, bankAccount: e.target.value })
                  }
                  placeholder="40817810099910004312"
                  className="mt-1.5 h-11 md:h-10 text-base"
                  maxLength={20}
                />
              </div>
              <div>
                <Label className="text-sm">Название банка</Label>
                <Input
                  value={formData.bankName || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, bankName: e.target.value })
                  }
                  placeholder="ПАО Сбербанк"
                  className="mt-1.5 h-11 md:h-10 text-base"
                />
              </div>
              <div>
                <Label className="text-sm">БИК банка</Label>
                <Input
                  value={formData.bankBik || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, bankBik: e.target.value })
                  }
                  placeholder="044525225"
                  className="mt-1.5 h-11 md:h-10 text-base"
                  maxLength={9}
                />
              </div>
            </div>
          )}
        </Card>
      </RadioGroup>
    </div>
  );
}
