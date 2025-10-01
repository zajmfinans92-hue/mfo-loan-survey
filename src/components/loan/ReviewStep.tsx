import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type ReviewStepProps = {
  formData: FormData;
};

export default function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="text-center space-y-1 md:space-y-2">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 md:mb-4">
          <Icon name="Check" className="text-white" size={32} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Проверьте данные
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">Убедитесь, что всё заполнено верно</p>
      </div>

      <Card className="p-4 md:p-6 space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row justify-between border-b pb-2 md:pb-3 gap-1">
          <span className="text-sm md:text-base text-muted-foreground">Сумма займа:</span>
          <span className="text-sm md:text-base font-semibold">{formData.loanAmount.toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between border-b pb-2 md:pb-3 gap-1">
          <span className="text-sm md:text-base text-muted-foreground">Срок:</span>
          <span className="text-sm md:text-base font-semibold">{formData.loanTerm} дней</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between border-b pb-2 md:pb-3 gap-1">
          <span className="text-sm md:text-base text-muted-foreground">ФИО:</span>
          <span className="text-sm md:text-base font-semibold break-words text-right">
            {formData.lastName} {formData.firstName} {formData.middleName}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between border-b pb-2 md:pb-3 gap-1">
          <span className="text-sm md:text-base text-muted-foreground">Телефон:</span>
          <span className="text-sm md:text-base font-semibold">{formData.phone}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between border-b pb-2 md:pb-3 gap-1">
          <span className="text-sm md:text-base text-muted-foreground">Email:</span>
          <span className="text-sm md:text-base font-semibold break-all">{formData.email}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between border-b pb-2 md:pb-3 gap-1">
          <span className="text-sm md:text-base text-muted-foreground">Место работы:</span>
          <span className="text-sm md:text-base font-semibold break-words text-right">{formData.workplace}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-1">
          <span className="text-sm md:text-base text-muted-foreground">Доход:</span>
          <span className="text-sm md:text-base font-semibold">{Number(formData.monthlyIncome).toLocaleString('ru-RU')} ₽</span>
        </div>
      </Card>

      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex gap-3">
          <Icon name="ShieldCheck" className="text-green-600 flex-shrink-0" size={20} />
          <p className="text-sm text-green-900">
            Ваши данные защищены и используются только для обработки заявки
          </p>
        </div>
      </Card>
    </div>
  );
}