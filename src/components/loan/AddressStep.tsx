import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
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
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600 flex items-center justify-center mb-4 shadow-lg animate-bounce-in">
          <Icon name="MapPin" className="text-white" size={36} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
          Адресные данные
        </h2>
        <p className="text-base text-muted-foreground">Укажите адреса регистрации и проживания</p>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="group animate-slide-up">
          <Label className="text-base font-semibold flex items-center gap-2 mb-2">
            <Icon name="Home" size={16} className="text-orange-600" />
            Адрес регистрации <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.regAddress}
            onChange={(e) =>
              setFormData({ ...formData, regAddress: e.target.value })
            }
            placeholder="г. Москва, ул. Ленина, д. 1, кв. 10"
            className="h-12 text-base border-2 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            required
          />
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
            <Icon name="Info" size={14} className="text-orange-600" />
            Укажите адрес как в паспорте
          </p>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 transition-all animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Checkbox
            id="sameAddress"
            checked={formData.sameAddress}
            onCheckedChange={(checked) =>
              setFormData({
                ...formData,
                sameAddress: checked as boolean,
                actualAddress: checked ? formData.regAddress : '',
              })
            }
            className="w-5 h-5 border-2"
          />
          <Label htmlFor="sameAddress" className="cursor-pointer text-base font-semibold flex items-center gap-2">
            <Icon name="Check" size={16} className="text-orange-600" />
            Совпадает с адресом регистрации
          </Label>
        </div>

        {!formData.sameAddress && (
          <div className="animate-fade-in group animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Label className="text-base font-semibold flex items-center gap-2 mb-2">
              <Icon name="MapPin" size={16} className="text-orange-600" />
              Адрес фактического проживания
            </Label>
            <Input
              value={formData.actualAddress}
              onChange={(e) =>
                setFormData({ ...formData, actualAddress: e.target.value })
              }
              placeholder="г. Москва, ул. Пушкина, д. 5, кв. 20"
              className="h-12 text-base border-2 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>
        )}

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-start gap-3">
            <Icon name="Shield" className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Зачем нужен адрес?
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Адрес необходим для проверки данных и оформления договора займа
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
