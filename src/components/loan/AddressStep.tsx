import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from './types';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

type AddressStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

const DADATA_TOKEN = '8b84128e71205b60ab10b8d4ed8fd3eb39c74d67';

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
          <Label className="text-sm md:text-base">
            Адрес регистрации <span className="text-red-500">*</span>
          </Label>
          <AddressSuggestions
            token={DADATA_TOKEN}
            value={formData.regAddress ? { value: formData.regAddress } : undefined}
            onChange={(suggestion) => {
              const address = suggestion?.value || '';
              setFormData({ 
                ...formData, 
                regAddress: address,
                actualAddress: formData.sameAddress ? address : formData.actualAddress
              });
            }}
            inputProps={{
              placeholder: 'Начните вводить адрес...',
              className: 'flex h-11 md:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1.5'
            }}
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
            <AddressSuggestions
              token={DADATA_TOKEN}
              value={formData.actualAddress ? { value: formData.actualAddress } : undefined}
              onChange={(suggestion) => {
                setFormData({ 
                  ...formData, 
                  actualAddress: suggestion?.value || ''
                });
              }}
              inputProps={{
                placeholder: 'Начните вводить адрес...',
                className: 'flex h-11 md:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1.5'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}