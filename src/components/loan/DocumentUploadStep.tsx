import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type DocumentUploadStepProps = {
  formData: FormData;
  handleFileUpload: (field: 'passportPhoto' | 'cardPhoto', file: File) => void;
};

export default function DocumentUploadStep({
  formData,
  handleFileUpload,
}: DocumentUploadStepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Загрузка документов
        </h2>
        <p className="text-muted-foreground">Фото паспорта и банковской карты</p>
      </div>

      <div className="space-y-4">
        <Card className="p-6 border-dashed border-2 hover:border-primary transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="FileText" className="text-primary" size={24} />
              </div>
              <div>
                <Label className="text-base font-semibold">Паспорт (разворот с фото)</Label>
                <p className="text-sm text-muted-foreground">Формат: JPG, PNG (до 5 МБ)</p>
              </div>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('passportPhoto', file);
              }}
              className="cursor-pointer"
            />
            {formData.passportPhoto && (
              <p className="text-sm text-green-600 flex items-center gap-2">
                <Icon name="CheckCircle2" size={16} />
                {formData.passportPhoto.name}
              </p>
            )}
          </div>
        </Card>

        <Card className="p-6 border-dashed border-2 hover:border-primary transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="CreditCard" className="text-primary" size={24} />
              </div>
              <div>
                <Label className="text-base font-semibold">Банковская карта</Label>
                <p className="text-sm text-muted-foreground">Формат: JPG, PNG (до 5 МБ)</p>
              </div>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('cardPhoto', file);
              }}
              className="cursor-pointer"
            />
            {formData.cardPhoto && (
              <p className="text-sm text-green-600 flex items-center gap-2">
                <Icon name="CheckCircle2" size={16} />
                {formData.cardPhoto.name}
              </p>
            )}
          </div>
        </Card>

        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex gap-3">
            <Icon name="AlertCircle" className="text-amber-600 flex-shrink-0" size={20} />
            <p className="text-sm text-amber-900">
              Убедитесь, что все данные на фото чётко видны и читаемы
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
