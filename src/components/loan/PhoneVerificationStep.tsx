import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type PhoneVerificationStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
  smsSent: boolean;
};

export default function PhoneVerificationStep({
  formData,
  setFormData,
  smsSent,
}: PhoneVerificationStepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Проверка номера телефона
        </h2>
        <p className="text-muted-foreground">Подтвердите номер через SMS</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Номер телефона</Label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+7 (900) 123-45-67"
            className="mt-1.5"
            disabled={smsSent}
          />
        </div>

        {smsSent && (
          <div className="space-y-2 animate-fade-in">
            <Label>Код из SMS</Label>
            <Input
              value={formData.smsCode}
              onChange={(e) =>
                setFormData({ ...formData, smsCode: e.target.value })
              }
              placeholder="123456"
              maxLength={6}
              className="mt-1.5 text-center text-2xl tracking-widest"
            />
            <p className="text-xs text-muted-foreground text-center">
              Не пришел код? <button className="text-primary hover:underline">Отправить снова</button>
            </p>
          </div>
        )}

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <Icon name="ShieldCheck" className="text-blue-600 flex-shrink-0" size={20} />
            <p className="text-sm text-blue-900">
              Мы отправим SMS с кодом подтверждения на указанный номер
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
