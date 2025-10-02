import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
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
  const [uploadingPassport, setUploadingPassport] = useState(false);
  const [uploadingCard, setUploadingCard] = useState(false);
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="text-center space-y-1 md:space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Загрузка документов
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">Фото паспорта и банковской карты</p>
      </div>

      <div className="space-y-3 md:space-y-4">
        <Card className="p-4 md:p-6 border-dashed border-2 hover:border-primary transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="FileText" className="text-primary" size={20} />
              </div>
              <div className="min-w-0">
                <Label className="text-sm md:text-base font-semibold">Паспорт (разворот с фото)</Label>
                <p className="text-xs md:text-sm text-muted-foreground">Формат: JPG, PNG (до 5 МБ)</p>
              </div>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setUploadingPassport(true);
                  await new Promise((resolve) => setTimeout(resolve, 1500));
                  handleFileUpload('passportPhoto', file);
                  setUploadingPassport(false);
                }
              }}
              className="cursor-pointer"
              disabled={uploadingPassport}
            />
            {uploadingPassport && (
              <div className="flex items-center gap-2 text-primary animate-fade-in">
                <Loader size="sm" />
                <span className="text-sm">Загрузка файла...</span>
              </div>
            )}
            {formData.passportPhoto && !uploadingPassport && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg animate-scale-in">
                <p className="text-sm text-green-700 flex items-center gap-2 font-medium">
                  <Icon name="CheckCircle2" size={18} className="text-green-600" />
                  Успешно загружено
                </p>
                <p className="text-xs text-green-600 mt-1 ml-6">{formData.passportPhoto.name}</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 md:p-6 border-dashed border-2 hover:border-primary transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="CreditCard" className="text-primary" size={20} />
              </div>
              <div className="min-w-0">
                <Label className="text-sm md:text-base font-semibold">Банковская карта</Label>
                <p className="text-xs md:text-sm text-muted-foreground">Формат: JPG, PNG (до 5 МБ)</p>
              </div>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setUploadingCard(true);
                  await new Promise((resolve) => setTimeout(resolve, 1500));
                  handleFileUpload('cardPhoto', file);
                  setUploadingCard(false);
                }
              }}
              className="cursor-pointer"
              disabled={uploadingCard}
            />
            {uploadingCard && (
              <div className="flex items-center gap-2 text-primary animate-fade-in">
                <Loader size="sm" />
                <span className="text-sm">Загрузка файла...</span>
              </div>
            )}
            {formData.cardPhoto && !uploadingCard && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg animate-scale-in">
                <p className="text-sm text-green-700 flex items-center gap-2 font-medium">
                  <Icon name="CheckCircle2" size={18} className="text-green-600" />
                  Успешно загружено
                </p>
                <p className="text-xs text-green-600 mt-1 ml-6">{formData.cardPhoto.name}</p>
              </div>
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