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
    <div className="space-y-4 md:space-y-7 animate-fade-in">
      <div className="text-center space-y-1 md:space-y-2">
        <h2 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
          Адресные данные
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground font-medium">Укажите адреса регистрации и проживания</p>
      </div>

      <div className="space-y-3 md:space-y-5">
        <div className="group">
          <Label className="text-sm md:text-lg font-semibold flex items-center gap-1">
            Адрес регистрации <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.regAddress}
            onChange={(e) =>
              setFormData({ ...formData, regAddress: e.target.value })
            }
            placeholder="г. Москва, ул. Ленина, д. 1, кв. 10"
            className="mt-1.5 md:mt-2 h-10 md:h-11 text-sm md:text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
        </div>

        <div className="flex items-center space-x-2 md:space-x-3 p-3 md:p-4 bg-muted/30 rounded-xl border-2 border-transparent hover:border-primary/20 transition-all">
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
            className="w-4 h-4 md:w-5 md:h-5 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary/50"
          />
          <Label htmlFor="sameAddress" className="cursor-pointer text-sm md:text-lg font-medium">
            Совпадает с адресом регистрации
          </Label>
        </div>

        {!formData.sameAddress && (
          <div className="animate-fade-in group">
            <Label className="text-sm md:text-lg font-semibold">Адрес фактического проживания</Label>
            <Input
              value={formData.actualAddress}
              onChange={(e) =>
                setFormData({ ...formData, actualAddress: e.target.value })
              }
              placeholder="г. Москва, ул. Пушкина, д. 5, кв. 20"
              className="mt-1.5 md:mt-2 h-10 md:h-11 text-sm md:text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        )}
      </div>
    </div>
  );
}