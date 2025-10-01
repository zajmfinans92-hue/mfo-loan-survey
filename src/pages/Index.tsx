import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

type FormData = {
  loanAmount: number;
  loanTerm: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  phone: string;
  email: string;
  regAddress: string;
  actualAddress: string;
  sameAddress: boolean;
  workplace: string;
  position: string;
  monthlyIncome: string;
  passportPhoto: File | null;
  cardPhoto: File | null;
  smsCode: string;
};

export default function Index() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    loanAmount: 10000,
    loanTerm: 14,
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    phone: '',
    email: '',
    regAddress: '',
    actualAddress: '',
    sameAddress: false,
    workplace: '',
    position: '',
    monthlyIncome: '',
    passportPhoto: null,
    cardPhoto: null,
    smsCode: '',
  });
  const [smsSent, setSmsSent] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsEmbedded(window.self !== window.top);
  }, []);

  const totalSteps = 7;
  const progressPercent = (step / totalSteps) * 100;

  const calculateOverpayment = () => {
    const rate = 1.5;
    const overpayment = (formData.loanAmount * rate * formData.loanTerm) / 100;
    return Math.round(overpayment);
  };

  const handleNext = () => {
    if (step === 3 && !smsSent) {
      setSmsSent(true);
      toast({
        title: 'SMS отправлено',
        description: 'Введите код из SMS',
      });
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setShowSuccessModal(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileUpload = (field: 'passportPhoto' | 'cardPhoto', file: File) => {
    setFormData({ ...formData, [field]: file });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Калькулятор займа
              </h2>
              <p className="text-muted-foreground">Выберите удобные условия</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-lg">Сумма займа</Label>
                  <span className="text-2xl font-bold text-primary">
                    {formData.loanAmount.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <Slider
                  value={[formData.loanAmount]}
                  onValueChange={([value]) =>
                    setFormData({ ...formData, loanAmount: value })
                  }
                  min={3000}
                  max={30000}
                  step={1000}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>3 000 ₽</span>
                  <span>30 000 ₽</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-lg">Срок займа</Label>
                  <span className="text-2xl font-bold text-primary">
                    {formData.loanTerm} дней
                  </span>
                </div>
                <Slider
                  value={[formData.loanTerm]}
                  onValueChange={([value]) =>
                    setFormData({ ...formData, loanTerm: value })
                  }
                  min={7}
                  max={30}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>7 дней</span>
                  <span>30 дней</span>
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">К возврату:</span>
                    <span className="text-3xl font-bold">
                      {(formData.loanAmount + calculateOverpayment()).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Переплата:</span>
                    <span className="font-semibold text-accent">
                      {calculateOverpayment().toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Персональные данные
              </h2>
              <p className="text-muted-foreground">Заполните информацию о себе</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Фамилия</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Иванов"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Имя</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Иван"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Отчество</Label>
                <Input
                  value={formData.middleName}
                  onChange={(e) =>
                    setFormData({ ...formData, middleName: e.target.value })
                  }
                  placeholder="Иванович"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Дата рождения</Label>
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDate: e.target.value })
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="ivan@example.com"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        );

      case 3:
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

      case 4:
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

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Адресные данные
              </h2>
              <p className="text-muted-foreground">Укажите адреса регистрации и проживания</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Адрес регистрации</Label>
                <Input
                  value={formData.regAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, regAddress: e.target.value })
                  }
                  placeholder="г. Москва, ул. Ленина, д. 1, кв. 10"
                  className="mt-1.5"
                />
              </div>

              <div className="flex items-center space-x-2">
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
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="sameAddress" className="cursor-pointer">
                  Совпадает с адресом регистрации
                </Label>
              </div>

              {!formData.sameAddress && (
                <div className="animate-fade-in">
                  <Label>Адрес фактического проживания</Label>
                  <Input
                    value={formData.actualAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, actualAddress: e.target.value })
                    }
                    placeholder="г. Москва, ул. Пушкина, д. 5, кв. 20"
                    className="mt-1.5"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Информация о работе
              </h2>
              <p className="text-muted-foreground">Расскажите о вашей занятости</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Место работы</Label>
                <Input
                  value={formData.workplace}
                  onChange={(e) =>
                    setFormData({ ...formData, workplace: e.target.value })
                  }
                  placeholder="ООО 'Рога и Копыта'"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Должность</Label>
                <Input
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  placeholder="Менеджер"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Ежемесячный доход</Label>
                <Input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyIncome: e.target.value })
                  }
                  placeholder="50000"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <Icon name="Check" className="text-white" size={40} />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Проверьте данные
              </h2>
              <p className="text-muted-foreground">Убедитесь, что всё заполнено верно</p>
            </div>

            <Card className="p-6 space-y-4">
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground">Сумма займа:</span>
                <span className="font-semibold">{formData.loanAmount.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground">Срок:</span>
                <span className="font-semibold">{formData.loanTerm} дней</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground">ФИО:</span>
                <span className="font-semibold">
                  {formData.lastName} {formData.firstName} {formData.middleName}
                </span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground">Телефон:</span>
                <span className="font-semibold">{formData.phone}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-semibold">{formData.email}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground">Место работы:</span>
                <span className="font-semibold">{formData.workplace}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Доход:</span>
                <span className="font-semibold">{Number(formData.monthlyIncome).toLocaleString('ru-RU')} ₽</span>
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Заявка на займ
          </h1>
          <p className="text-muted-foreground">Быстрое оформление за 5 минут</p>
          {!isEmbedded && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/embed'}
              className="mt-4"
            >
              <Icon name="Code2" size={16} className="mr-2" />
              Получить код для сайта
            </Button>
          )}
        </div>

        <Card className="p-6 mb-6 shadow-lg">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Шаг {step} из {totalSteps}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          <div className="mb-8">{renderStep()}</div>

          <div className="flex gap-3">
            {step > 1 && (
              <Button
                onClick={handlePrev}
                variant="outline"
                className="flex-1"
              >
                <Icon name="ChevronLeft" size={20} className="mr-2" />
                Назад
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              {step === totalSteps ? 'Отправить заявку' : smsSent && step === 3 ? 'Подтвердить код' : step === 3 ? 'Отправить SMS' : 'Далее'}
              <Icon name="ChevronRight" size={20} className="ml-2" />
            </Button>
          </div>
        </Card>

        <div className="flex justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i + 1 === step
                  ? 'bg-primary w-8'
                  : i + 1 < step
                  ? 'bg-primary/50'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4">
              <Icon name="CheckCircle2" className="text-white" size={32} />
            </div>
            <DialogTitle className="text-center text-2xl">
              Заявка отправлена на рассмотрение
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              С вами свяжутся специалисты в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex gap-3">
                <Icon name="Clock" className="text-blue-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Время рассмотрения</p>
                  <p className="text-xs text-blue-700">От 5 минут до 1 часа</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="flex gap-3">
                <Icon name="Phone" className="text-purple-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-semibold text-purple-900">Способ связи</p>
                  <p className="text-xs text-purple-700">Звонок на {formData.phone}</p>
                </div>
              </div>
            </Card>
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                setStep(1);
                setFormData({
                  loanAmount: 10000,
                  loanTerm: 14,
                  firstName: '',
                  lastName: '',
                  middleName: '',
                  birthDate: '',
                  phone: '',
                  email: '',
                  regAddress: '',
                  actualAddress: '',
                  sameAddress: false,
                  workplace: '',
                  position: '',
                  monthlyIncome: '',
                  passportPhoto: null,
                  cardPhoto: null,
                  smsCode: '',
                });
              }}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Понятно
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}