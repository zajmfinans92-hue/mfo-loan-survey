import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { FormData } from './types';
import InputMask from 'react-input-mask';

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
          <InputMask
            mask="+7 (999) 999-99-99"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+7 (999) 123-45-67"
            className="flex h-12 md:h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1.5"
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