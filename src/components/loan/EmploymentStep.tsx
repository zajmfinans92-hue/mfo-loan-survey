import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type EmploymentStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function EmploymentStep({
  formData,
  setFormData,
}: EmploymentStepProps) {
  const formatIncome = (value: string) => {
    if (!value) return '';
    return new Intl.NumberFormat('ru-RU').format(Number(value));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg animate-bounce-in">
          <Icon name="Briefcase" className="text-white" size={36} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Информация о работе
        </h2>
        <p className="text-base text-muted-foreground">Расскажите о вашей занятости и доходах</p>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="group animate-slide-up">
          <Label className="text-base font-semibold flex items-center gap-2 mb-2">
            <Icon name="Building" size={16} className="text-purple-600" />
            Место работы <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.workplace}
            onChange={(e) =>
              setFormData({ ...formData, workplace: e.target.value })
            }
            placeholder="ООО 'Рога и Копыта'"
            className="h-12 text-base border-2 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            required
          />
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
            <Icon name="Info" size={14} className="text-purple-600" />
            Название компании или ИП
          </p>
        </div>

        <div className="group animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Label className="text-base font-semibold flex items-center gap-2 mb-2">
            <Icon name="UserCheck" size={16} className="text-purple-600" />
            Должность <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            placeholder="Менеджер по продажам"
            className="h-12 text-base border-2 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            required
          />
        </div>

        <div className="group animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Label className="text-base font-semibold flex items-center gap-2 mb-2">
            <Icon name="Wallet" size={16} className="text-purple-600" />
            Ежемесячный доход <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type="number"
              value={formData.monthlyIncome}
              onChange={(e) =>
                setFormData({ ...formData, monthlyIncome: e.target.value })
              }
              placeholder="50000"
              className="h-12 text-base border-2 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all pr-12"
              required
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
              ₽
            </span>
          </div>
          {formData.monthlyIncome && (
            <p className="text-sm text-purple-700 mt-2 font-semibold">
              {formatIncome(formData.monthlyIncome)} рублей в месяц
            </p>
          )}
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-start gap-3">
            <Icon name="TrendingUp" className="text-purple-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-semibold text-purple-900">
                Почему мы спрашиваем о доходе?
              </p>
              <p className="text-xs text-purple-700 mt-1">
                Информация о доходе помогает нам определить максимальную сумму займа и условия выдачи
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
