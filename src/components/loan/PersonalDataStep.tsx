import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type PersonalDataStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function PersonalDataStep({
  formData,
  setFormData,
}: PersonalDataStepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg animate-bounce-in">
          <Icon name="User" className="text-white" size={36} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Персональные данные
        </h2>
        <p className="text-base text-muted-foreground">Заполните информацию о себе</p>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group animate-slide-up">
            <Label className="text-base font-semibold flex items-center gap-1 mb-2">
              <Icon name="User" size={16} className="text-blue-600" />
              Фамилия <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Иванов"
              className="h-12 text-base border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
          </div>

          <div className="group animate-slide-up" style={{ animationDelay: '0.05s' }}>
            <Label className="text-base font-semibold flex items-center gap-1 mb-2">
              <Icon name="User" size={16} className="text-blue-600" />
              Имя <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Иван"
              className="h-12 text-base border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
          </div>
        </div>

        <div className="group animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Label className="text-base font-semibold flex items-center gap-1 mb-2">
            <Icon name="User" size={16} className="text-blue-600" />
            Отчество
          </Label>
          <Input
            value={formData.middleName}
            onChange={(e) =>
              setFormData({ ...formData, middleName: e.target.value })
            }
            placeholder="Иванович"
            className="h-12 text-base border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div className="group animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <Label className="text-base font-semibold flex items-center gap-1 mb-2">
            <Icon name="Calendar" size={16} className="text-blue-600" />
            Дата рождения <span className="text-red-500">*</span>
          </Label>
          <Input
            type="date"
            value={formData.birthDate}
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
            className="h-12 text-base border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            required
          />
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
            <Icon name="Info" size={14} className="text-blue-600" />
            Займы выдаются лицам от 18 до 70 лет
          </p>
        </div>

        <div className="group animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Label className="text-base font-semibold flex items-center gap-1 mb-2">
            <Icon name="Mail" size={16} className="text-blue-600" />
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="ivan@example.com"
            className="h-12 text-base border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            required
          />
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
            <Icon name="Shield" size={14} className="text-blue-600" />
            На email придёт подтверждение заявки
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 animate-fade-in" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-start gap-3">
            <Icon name="Lock" className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Ваши данные защищены
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Мы используем шифрование и не передаём данные третьим лицам
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
