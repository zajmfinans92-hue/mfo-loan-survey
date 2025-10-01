import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from './types';

type AddressStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function AddressStep({
  formData,
  setFormData,
}: AddressStepProps) {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="text-center space-y-1 md:space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Адресные данные
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">Укажите адреса регистрации и проживания</p>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div>
          <Label className="text-sm md:text-base">Адрес регистрации</Label>
          <Input
            value={formData.regAddress}
            onChange={(e) =>
              setFormData({ ...formData, regAddress: e.target.value })
            }
            placeholder="г. Москва, ул. Ленина, д. 1, кв. 10"
            className="mt-1.5 h-11 md:h-10 text-base"
          />
        </div>

        <div className="flex items-center space-x-2 py-1">
          <input
            type="checkbox"
            id="sameAddress"
            checked={formData.sameAddress}
            onChange={(e) =>
              setFormData({
                ...formData,
                sameAddress: e.target.checked,
                actualAddress: e.target.checked ? formData.regAddress : '',
              })
            }
            className="w-5 h-5 md:w-4 md:h-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="sameAddress" className="cursor-pointer text-sm md:text-base">
            Совпадает с адресом регистрации
          </Label>
        </div>

        {!formData.sameAddress && (
          <div className="animate-fade-in">
            <Label className="text-sm md:text-base">Адрес фактического проживания</Label>
            <Input
              value={formData.actualAddress}
              onChange={(e) =>
                setFormData({ ...formData, actualAddress: e.target.value })
              }
              placeholder="г. Москва, ул. Пушкина, д. 5, кв. 20"
              className="mt-1.5 h-11 md:h-10 text-base"
            />
          </div>
        )}
      </div>
    </div>
  );
}