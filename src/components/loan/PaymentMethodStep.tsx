import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { FormData } from './types';
import InputMask from 'react-input-mask';

type PaymentMethodStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

const RUSSIAN_BANKS = [
  'Сбербанк',
  'ВТБ',
  'Газпромбанк',
  'Альфа-Банк',
  'Россельхозбанк',
  'Открытие',
  'Совкомбанк',
  'Промсвязьбанк',
  'Райффайзенбанк',
  'Росбанк',
  'Банк Санкт-Петербург',
  'МКБ',
  'Ак Барс',
  'Уралсиб',
  'Почта Банк',
  'ЮниКредит Банк',
  'Хоум Кредит Банк',
  'ОТП Банк',
  'Банк Зенит',
  'Тинькофф Банк'
];

export default function PaymentMethodStep({
  formData,
  setFormData,
}: PaymentMethodStepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg animate-bounce-in">
          <Icon name="Wallet" className="text-white" size={36} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Способ получения
        </h2>
        <p className="text-base text-muted-foreground">Выберите удобный способ получения средств</p>
      </div>

      <RadioGroup
        value={formData.paymentMethod}
        onValueChange={(value: 'card' | 'sbp' | 'bank') =>
          setFormData({ ...formData, paymentMethod: value })
        }
        className="space-y-4 max-w-2xl mx-auto"
      >
        <Card
          className={`p-5 cursor-pointer transition-all duration-300 animate-slide-up ${
            formData.paymentMethod === 'card'
              ? 'border-green-500 border-2 bg-green-50 shadow-lg'
              : 'border-2 hover:border-green-300 hover:shadow-md'
          }`}
          onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
        >
          <div className="flex items-center gap-4">
            <RadioGroupItem value="card" id="card" className="w-5 h-5" />
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                formData.paymentMethod === 'card' ? 'bg-green-500' : 'bg-gray-100'
              }`}>
                <Icon name="CreditCard" className={formData.paymentMethod === 'card' ? 'text-white' : 'text-gray-600'} size={24} />
              </div>
              <div>
                <Label htmlFor="card" className="text-lg font-bold cursor-pointer">
                  На банковскую карту
                </Label>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Icon name="Zap" size={14} className="text-green-600" />
                  Моментальное зачисление
                </p>
              </div>
            </div>
          </div>
          {formData.paymentMethod === 'card' && (
            <div className="mt-5 space-y-3 animate-slide-up">
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Номер карты <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.cardNumber || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  placeholder="0000 0000 0000 0000"
                  className="h-12 text-base border-2 rounded-xl focus:border-green-500"
                  maxLength={19}
                  required
                />
              </div>
            </div>
          )}
        </Card>

        <Card
          className={`p-5 cursor-pointer transition-all duration-300 animate-slide-up ${
            formData.paymentMethod === 'sbp'
              ? 'border-green-500 border-2 bg-green-50 shadow-lg'
              : 'border-2 hover:border-green-300 hover:shadow-md'
          }`}
          style={{ animationDelay: '0.1s' }}
          onClick={() => setFormData({ ...formData, paymentMethod: 'sbp' })}
        >
          <div className="flex items-center gap-4">
            <RadioGroupItem value="sbp" id="sbp" className="w-5 h-5" />
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                formData.paymentMethod === 'sbp' ? 'bg-green-500' : 'bg-gray-100'
              }`}>
                <Icon name="Smartphone" className={formData.paymentMethod === 'sbp' ? 'text-white' : 'text-gray-600'} size={24} />
              </div>
              <div>
                <Label htmlFor="sbp" className="text-lg font-bold cursor-pointer">
                  Через СБП
                </Label>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Icon name="ShieldCheck" size={14} className="text-green-600" />
                  Система быстрых платежей
                </p>
              </div>
            </div>
          </div>
          {formData.paymentMethod === 'sbp' && (
            <div className="mt-5 space-y-3 animate-slide-up">
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Выберите банк <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.sbpBank || ''}
                  onValueChange={(value) =>
                    setFormData({ ...formData, sbpBank: value })
                  }
                >
                  <SelectTrigger className="h-12 border-2 rounded-xl">
                    <SelectValue placeholder="Выберите банк" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {RUSSIAN_BANKS.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Номер телефона для СБП <span className="text-red-500">*</span>
                </Label>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  value={formData.phoneForSbp || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneForSbp: e.target.value })
                  }
                  placeholder="+7 (999) 123-45-67"
                  className="flex h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
            </div>
          )}
        </Card>

        <Card
          className={`p-5 cursor-pointer transition-all duration-300 animate-slide-up ${
            formData.paymentMethod === 'bank'
              ? 'border-green-500 border-2 bg-green-50 shadow-lg'
              : 'border-2 hover:border-green-300 hover:shadow-md'
          }`}
          style={{ animationDelay: '0.2s' }}
          onClick={() => setFormData({ ...formData, paymentMethod: 'bank' })}
        >
          <div className="flex items-center gap-4">
            <RadioGroupItem value="bank" id="bank" className="w-5 h-5" />
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                formData.paymentMethod === 'bank' ? 'bg-green-500' : 'bg-gray-100'
              }`}>
                <Icon name="Building2" className={formData.paymentMethod === 'bank' ? 'text-white' : 'text-gray-600'} size={24} />
              </div>
              <div>
                <Label htmlFor="bank" className="text-lg font-bold cursor-pointer">
                  На банковский счёт
                </Label>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Icon name="Clock" size={14} className="text-green-600" />
                  Перевод на расчётный счёт
                </p>
              </div>
            </div>
          </div>
          {formData.paymentMethod === 'bank' && (
            <div className="mt-5 space-y-3 animate-slide-up">
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Номер счёта <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.bankAccount || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, bankAccount: e.target.value })
                  }
                  placeholder="40817810099910004312"
                  className="h-12 text-base border-2 rounded-xl focus:border-green-500"
                  maxLength={20}
                  required
                />
              </div>
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Название банка <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.bankName || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, bankName: e.target.value })
                  }
                  placeholder="Сбербанк"
                  className="h-12 text-base border-2 rounded-xl focus:border-green-500"
                  required
                />
              </div>
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  БИК банка <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.bankBik || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, bankBik: e.target.value })
                  }
                  placeholder="044525225"
                  className="h-12 text-base border-2 rounded-xl focus:border-green-500"
                  maxLength={9}
                  required
                />
              </div>
            </div>
          )}
        </Card>
      </RadioGroup>
    </div>
  );
}
