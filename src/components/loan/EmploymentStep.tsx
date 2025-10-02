import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from './types';

type EmploymentStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function EmploymentStep({
  formData,
  setFormData,
}: EmploymentStepProps) {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="text-center space-y-1 md:space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Информация о работе
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">Расскажите о вашей занятости</p>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div>
          <Label className="text-sm md:text-base">
            Место работы <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.workplace}
            onChange={(e) =>
              setFormData({ ...formData, workplace: e.target.value })
            }
            placeholder="ООО 'Рога и Копыта'"
            className="mt-1.5 h-11 md:h-10 text-base"
            required
          />
        </div>
        <div>
          <Label className="text-sm md:text-base">
            Должность <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            placeholder="Менеджер"
            className="mt-1.5 h-11 md:h-10 text-base"
            required
          />
        </div>
        <div>
          <Label className="text-sm md:text-base">
            Ежемесячный доход <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            value={formData.monthlyIncome}
            onChange={(e) =>
              setFormData({ ...formData, monthlyIncome: e.target.value })
            }
            placeholder="50000"
            className="mt-1.5 h-11 md:h-10 text-base"
            required
          />
        </div>
      </div>
    </div>
  );
}