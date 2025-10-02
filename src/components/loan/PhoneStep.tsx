import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type PhoneStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function PhoneStep({ formData, setFormData }: PhoneStepProps) {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="text-center space-y-1 md:space-y-2">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 md:mb-4">
          <Icon name="Phone" className="text-white" size={32} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Ваш номер телефона
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Укажите номер для связи с вами
        </p>
      </div>

      <div className="space-y-3 md:space-y-4 max-w-md mx-auto">
        <div>
          <Label className="text-sm md:text-base">
            Номер телефона <span className="text-red-500">*</span>
          </Label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+7 (999) 123-45-67"
            className="mt-1.5 h-12 md:h-11 text-base"
            required
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            Менеджер свяжется с вами по этому номеру
          </p>
        </div>
      </div>
    </div>
  );
}
