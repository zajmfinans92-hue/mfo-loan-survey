import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    <div className="space-y-4 md:space-y-7 animate-fade-in">
      <div className="text-center space-y-1 md:space-y-2">
        <h2 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
          Персональные данные
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground font-medium">Заполните информацию о себе</p>
      </div>

      <div className="space-y-3 md:space-y-5">
        <div className="group">
          <Label className="text-sm md:text-lg font-semibold flex items-center gap-1">
            Фамилия <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            placeholder="Иванов"
            className="mt-1.5 md:mt-2 h-10 md:h-11 text-sm md:text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
        </div>
        <div className="group">
          <Label className="text-sm md:text-lg font-semibold flex items-center gap-1">
            Имя <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            placeholder="Иван"
            className="mt-1.5 md:mt-2 h-10 md:h-11 text-sm md:text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
        </div>
        <div className="group">
          <Label className="text-sm md:text-lg font-semibold">Отчество</Label>
          <Input
            value={formData.middleName}
            onChange={(e) =>
              setFormData({ ...formData, middleName: e.target.value })
            }
            placeholder="Иванович"
            className="mt-1.5 md:mt-2 h-10 md:h-11 text-sm md:text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="group">
          <Label className="text-sm md:text-lg font-semibold flex items-center gap-1">
            Дата рождения <span className="text-red-500">*</span>
          </Label>
          <Input
            type="date"
            value={formData.birthDate}
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
            className="mt-1.5 md:mt-2 h-10 md:h-11 text-sm md:text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
        </div>
        <div className="group">
          <Label className="text-sm md:text-lg font-semibold flex items-center gap-1">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="ivan@example.com"
            className="mt-1.5 md:mt-2 h-10 md:h-11 text-sm md:text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
        </div>
      </div>
    </div>
  );
}