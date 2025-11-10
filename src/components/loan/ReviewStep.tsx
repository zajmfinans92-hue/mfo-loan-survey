import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

type ReviewStepProps = {
  formData: FormData;
};

export default function ReviewStep({ formData }: ReviewStepProps) {
  const formatAmount = (amount: string | number) => {
    return new Intl.NumberFormat('ru-RU').format(Number(amount)) + ' ₽';
  };

  return (
    <div className="space-y-4 md:space-y-5 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-3 shadow-lg animate-bounce-in">
          <Icon name="ClipboardCheck" className="text-white" size={36} />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
          Проверьте данные
        </h2>
        <p className="text-sm text-muted-foreground">Убедитесь, что всё заполнено верно перед отправкой</p>
      </div>

      <div className="grid gap-3 md:gap-4">
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <Icon name="Coins" className="text-white" size={20} />
            </div>
            <h3 className="text-lg font-bold text-blue-900">Параметры займа</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Сумма займа</span>
              <span className="text-lg font-bold text-blue-900">{formatAmount(formData.loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Срок займа</span>
              <span className="text-lg font-bold text-blue-900">{formData.loanTerm} дней</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <Icon name="User" className="text-white" size={20} />
            </div>
            <h3 className="text-lg font-bold text-purple-900">Личные данные</h3>
          </div>
          <div className="space-y-2.5">
            <div>
              <p className="text-xs text-purple-600 mb-1">ФИО</p>
              <p className="text-sm font-semibold text-purple-900">
                {formData.lastName} {formData.firstName} {formData.middleName}
              </p>
            </div>
            <div>
              <p className="text-xs text-purple-600 mb-1">Дата рождения</p>
              <p className="text-sm font-semibold text-purple-900">{formData.birthDate}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <p className="text-xs text-purple-600 mb-1">Телефон</p>
                <p className="text-sm font-semibold text-purple-900">{formData.phone}</p>
              </div>
              <div>
                <p className="text-xs text-purple-600 mb-1">Email</p>
                <p className="text-sm font-semibold text-purple-900 break-all">{formData.email}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
              <Icon name="MapPin" className="text-white" size={20} />
            </div>
            <h3 className="text-lg font-bold text-amber-900">Адреса</h3>
          </div>
          <div className="space-y-2.5">
            <div>
              <p className="text-xs text-amber-600 mb-1">Адрес регистрации</p>
              <p className="text-sm font-semibold text-amber-900">{formData.regAddress}</p>
            </div>
            <div>
              <p className="text-xs text-amber-600 mb-1">Адрес проживания</p>
              <p className="text-sm font-semibold text-amber-900">{formData.actualAddress}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
              <Icon name="Briefcase" className="text-white" size={20} />
            </div>
            <h3 className="text-lg font-bold text-green-900">Занятость</h3>
          </div>
          <div className="space-y-2.5">
            <div>
              <p className="text-xs text-green-600 mb-1">Место работы</p>
              <p className="text-sm font-semibold text-green-900">{formData.workplace}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <p className="text-xs text-green-600 mb-1">Должность</p>
                <p className="text-sm font-semibold text-green-900">{formData.position}</p>
              </div>
              <div>
                <p className="text-xs text-green-600 mb-1">Ежемесячный доход</p>
                <p className="text-sm font-semibold text-green-900">{formatAmount(formData.monthlyIncome)}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <Icon name="Wallet" className="text-white" size={20} />
            </div>
            <h3 className="text-lg font-bold text-indigo-900">Способ получения</h3>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-700">Метод</span>
              <span className="text-base font-bold text-indigo-900">
                {formData.paymentMethod === 'card' && '💳 Банковская карта'}
                {formData.paymentMethod === 'sbp' && '📱 СБП'}
                {formData.paymentMethod === 'bank' && '🏦 Банковский счёт'}
              </span>
            </div>
            
            {formData.paymentMethod === 'card' && formData.cardNumber && (
              <div className="bg-white/50 rounded-lg p-3 space-y-1.5">
                <p className="text-xs text-indigo-600">Номер карты</p>
                <p className="text-sm font-bold text-indigo-900">{formData.cardNumber}</p>
              </div>
            )}
            
            {formData.paymentMethod === 'sbp' && (
              <div className="bg-white/50 rounded-lg p-3 space-y-2">
                {formData.sbpBank && (
                  <div>
                    <p className="text-xs text-indigo-600">Банк</p>
                    <p className="text-sm font-bold text-indigo-900">{formData.sbpBank}</p>
                  </div>
                )}
                {formData.phoneForSbp && (
                  <div>
                    <p className="text-xs text-indigo-600">Телефон для СБП</p>
                    <p className="text-sm font-bold text-indigo-900">{formData.phoneForSbp}</p>
                  </div>
                )}
              </div>
            )}
            
            {formData.paymentMethod === 'bank' && (
              <div className="bg-white/50 rounded-lg p-3 space-y-2">
                {formData.bankName && (
                  <div>
                    <p className="text-xs text-indigo-600">Название банка</p>
                    <p className="text-sm font-bold text-indigo-900">{formData.bankName}</p>
                  </div>
                )}
                {formData.bankAccount && (
                  <div>
                    <p className="text-xs text-indigo-600">Номер счёта</p>
                    <p className="text-sm font-bold text-indigo-900">{formData.bankAccount}</p>
                  </div>
                )}
                {formData.bankBik && (
                  <div>
                    <p className="text-xs text-indigo-600">БИК</p>
                    <p className="text-sm font-bold text-indigo-900">{formData.bankBik}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
        <div className="flex gap-3 items-start">
          <Icon name="ShieldCheck" className="text-green-600 flex-shrink-0 mt-0.5" size={22} />
          <div>
            <p className="text-sm font-semibold text-green-900 mb-1">Защита данных</p>
            <p className="text-xs text-green-700">
              Ваши данные защищены и используются только для обработки заявки
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}