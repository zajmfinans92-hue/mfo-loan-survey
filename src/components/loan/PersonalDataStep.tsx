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
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="text-center space-y-1 md:space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Персональные данные
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">Заполните информацию о себе</p>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div>
          <Label className="text-sm md:text-base">
            Фамилия <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            placeholder="Иванов"
            className="mt-1.5 h-11 md:h-10 text-base"
            required
          />
        </div>
        <div>
          <Label className="text-sm md:text-base">
            Имя <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            placeholder="Иван"
            className="mt-1.5 h-11 md:h-10 text-base"
            required
          />
        </div>
        <div>
          <Label className="text-sm md:text-base">Отчество</Label>
          <Input
            value={formData.middleName}
            onChange={(e) =>
              setFormData({ ...formData, middleName: e.target.value })
            }
            placeholder="Иванович"
            className="mt-1.5 h-11 md:h-10 text-base"
          />
        </div>
        <div>
          <Label className="text-sm md:text-base">
            Дата рождения <span className="text-red-500">*</span>
          </Label>
          <Input
            type="date"
            value={formData.birthDate}
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
            className="mt-1.5 h-11 md:h-10 text-base"
            required
          />
        </div>
        <div>
          <Label className="text-sm md:text-base">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="ivan@example.com"
            className="mt-1.5 h-11 md:h-10 text-base"
            required
          />
        </div>
      </div>
    </div>
  );
}