import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader } from '@/components/ui/loader';
import Icon from '@/components/ui/icon';
import { FormData } from '@/components/loan/types';
import LoanCalculatorStep from '@/components/loan/LoanCalculatorStep';
import PhoneStep from '@/components/loan/PhoneStep';
import PersonalDataStep from '@/components/loan/PersonalDataStep';
import PaymentMethodStep from '@/components/loan/PaymentMethodStep';
import DocumentUploadStep from '@/components/loan/DocumentUploadStep';
import AddressStep from '@/components/loan/AddressStep';
import EmploymentStep from '@/components/loan/EmploymentStep';
import ReviewStep from '@/components/loan/ReviewStep';
import SuccessModal from '@/components/loan/SuccessModal';
import PrivacyPolicyModal from '@/components/loan/PrivacyPolicyModal';

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
    paymentMethod: 'card',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (showSuccessModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showSuccessModal && countdown === 0) {
      setShowSuccessModal(false);
      setShowFinalModal(true);
    }
  }, [showSuccessModal, countdown]);

  const totalSteps = 8;
  const progressPercent = (step / totalSteps) * 100;

  const calculateOverpayment = () => {
    const rate = 1.5;
    const overpayment = (formData.loanAmount * rate * formData.loanTerm) / 100;
    return Math.round(overpayment);
  };

  const handlePrivacyAccept = () => {
    setPrivacyAccepted(true);
    toast({
      title: '✅ Согласие принято',
      description: 'Вы приняли соглашение на обработку персональных данных',
    });
  };

  const validateStep = () => {
    switch (step) {
      case 2:
        if (!formData.phone.trim()) {
          toast({
            title: 'Ошибка валидации',
            description: 'Укажите номер телефона',
            variant: 'destructive',
          });
          return false;
        }
        if (!privacyAccepted) {
          setShowPrivacyModal(true);
          return false;
        }
        break;
      case 3:
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.birthDate) {
          toast({
            title: 'Ошибка валидации',
            description: 'Заполните все обязательные поля',
            variant: 'destructive',
          });
          return false;
        }
        if (!formData.email.includes('@')) {
          toast({
            title: 'Ошибка валидации',
            description: 'Укажите корректный email',
            variant: 'destructive',
          });
          return false;
        }
        break;
      case 4:
        if (formData.paymentMethod === 'card' && !formData.cardNumber?.trim()) {
          toast({
            title: 'Ошибка валидации',
            description: 'Укажите номер карты',
            variant: 'destructive',
          });
          return false;
        }
        if (formData.paymentMethod === 'sbp' && !formData.phoneForSbp?.trim()) {
          toast({
            title: 'Ошибка валидации',
            description: 'Укажите номер телефона для СБП',
            variant: 'destructive',
          });
          return false;
        }
        if (formData.paymentMethod === 'bank' && (!formData.bankAccount?.trim() || !formData.bankName?.trim() || !formData.bankBik?.trim())) {
          toast({
            title: 'Ошибка валидации',
            description: 'Заполните все банковские реквизиты',
            variant: 'destructive',
          });
          return false;
        }
        break;
      case 5:
        if (!formData.passportPhoto || !formData.cardPhoto) {
          toast({
            title: 'Ошибка валидации',
            description: 'Загрузите все документы',
            variant: 'destructive',
          });
          return false;
        }
        break;
      case 6:
        if (!formData.regAddress.trim()) {
          toast({
            title: 'Ошибка валидации',
            description: 'Укажите адрес регистрации',
            variant: 'destructive',
          });
          return false;
        }
        break;
      case 7:
        if (!formData.workplace.trim() || !formData.position.trim() || !formData.monthlyIncome.trim()) {
          toast({
            title: 'Ошибка валидации',
            description: 'Заполните все поля о работе',
            variant: 'destructive',
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        console.log('Отправка заявки...', formData);

        const response = await fetch('https://functions.poehali.dev/a4773c44-5fde-4ea6-a5c8-d5722c946089', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            middleName: formData.middleName,
            birthDate: formData.birthDate,
            phone: formData.phone,
            email: formData.email,
            amount: formData.loanAmount,
            period: formData.loanTerm,
            regAddress: formData.regAddress,
            actualAddress: formData.actualAddress,
            workplace: formData.workplace,
            position: formData.position,
            monthlyIncome: formData.monthlyIncome,
            paymentMethod: formData.paymentMethod,
            cardNumber: formData.cardNumber,
            phoneForSbp: formData.phoneForSbp,
            bankAccount: formData.bankAccount,
            bankName: formData.bankName,
            bankBik: formData.bankBik,
          }),
        });

        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Response data:', result);

        if (!response.ok) {
          console.error('amoCRM error:', result);
          throw new Error(result.error || 'Failed to send application');
        }

        console.log('amoCRM success:', result);

        setCountdown(60);
        setShowSuccessModal(true);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при отправке заявки. Попробуйте снова.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileUpload = (field: 'passportPhoto' | 'cardPhoto', file: File) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowFinalModal(false);
    setStep(1);
    setCountdown(60);
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
      paymentMethod: 'card',
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <LoanCalculatorStep
            formData={formData}
            setFormData={setFormData}
            calculateOverpayment={calculateOverpayment}
          />
        );
      case 2:
        return <PhoneStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <PersonalDataStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <PaymentMethodStep formData={formData} setFormData={setFormData} />;
      case 5:
        return (
          <DocumentUploadStep formData={formData} handleFileUpload={handleFileUpload} />
        );
      case 6:
        return <AddressStep formData={formData} setFormData={setFormData} />;
      case 7:
        return <EmploymentStep formData={formData} setFormData={setFormData} />;
      case 8:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-3 md:py-12 px-3 md:px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDRWMGgtNHYxNnptMCA0NGg0di0xNmgtNHYxNnpNMTYgMzZoNHYtNGgtNHY0em00NCAwaDR2LTRoLTR2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="mb-4 md:mb-10 text-center px-1 md:px-2 animate-slide-up">
          <div className="flex flex-col items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <img 
              src="https://cdn.poehali.dev/files/8e6a9c1a-a95c-47fa-a912-9ffdc0f5dbea.png" 
              alt="Logo" 
              className="h-12 md:h-16 w-auto drop-shadow-2xl animate-bounce-in"
            />
            <h1 className="text-2xl md:text-5xl font-extrabold text-white drop-shadow-2xl">
              Заявка на займ
            </h1>
          </div>
          <p className="text-sm md:text-lg text-blue-50 font-medium">Быстрое оформление за 5 минут ⚡</p>
        </div>

        <Card className="p-4 md:p-8 mb-4 md:mb-8 shadow-2xl rounded-2xl md:rounded-3xl glass-effect border-0 animate-fade-in">
          <div className="mb-5 md:mb-8">
            <div className="flex justify-between items-center mb-2 md:mb-3">
              <div>
                <span className="text-xs md:text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 md:px-3 md:py-1 rounded-full">
                  Шаг {step} из {totalSteps}
                </span>
              </div>
              <span className="text-sm md:text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-1.5 md:h-2.5" />
          </div>

          <div className="mb-6 md:mb-10">
            {loading ? (
              <div className="py-16 md:py-24 flex flex-col items-center gap-4 md:gap-5">
                <Loader size="lg" />
                <div className="text-center">
                  <p className="text-sm md:text-base font-semibold text-foreground mb-1">Обработка данных...</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Это займёт всего несколько секунд</p>
                </div>
              </div>
            ) : (
              renderStep()
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
            {step > 1 && (
              <Button
                onClick={handlePrev}
                variant="outline"
                className="w-full sm:flex-1 h-11 md:h-11 text-sm md:text-base font-semibold border-2 hover:bg-muted/50 transition-all"
              >
                <Icon name="ChevronLeft" size={18} className="mr-1 md:mr-2" />
                Назад
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={loading}
              className="w-full sm:flex-1 h-11 md:h-11 text-sm md:text-base font-bold bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all"
            >
              {loading ? (
                <Loader size="sm" className="mr-2" />
              ) : null}
              {step === totalSteps ? '✨ Отправить заявку' : 'Продолжить'}
              {!loading && step < totalSteps && <Icon name="ChevronRight" size={18} className="ml-1 md:ml-2" />}
            </Button>
          </div>
        </Card>

        <div className="flex justify-center gap-1.5 md:gap-2.5 mb-4 md:mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 md:h-2.5 rounded-full transition-all duration-300 ${
                i + 1 === step
                  ? 'bg-white shadow-lg w-6 md:w-10'
                  : i + 1 < step
                  ? 'bg-white/70 w-1.5 md:w-2.5'
                  : 'bg-white/30 w-1.5 md:w-2.5'
              }`}
            />
          ))}
        </div>
      </div>

      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        countdown={countdown}
        formData={formData}
        onClose={handleCloseModal}
      />

      <PrivacyPolicyModal
        open={showPrivacyModal}
        onOpenChange={setShowPrivacyModal}
        onAccept={handlePrivacyAccept}
      />

      {/* Footer Links */}
      <div className="max-w-2xl mx-auto mt-8 text-center space-y-2">
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm">
          <Link 
            to="/oferta"
            className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4"
          >
            Договор оферты
          </Link>
          <Link 
            to="/privacy"
            className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4"
          >
            Политика конфиденциальности
          </Link>
          <Link 
            to="/refund"
            className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4"
          >
            Условия возврата
          </Link>
          <Link 
            to="/contacts"
            className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4"
          >
            Контакты
          </Link>
        </div>
        <p className="text-white/60 text-xs md:text-sm">
          ИП Малик Степан Владимирович, ИНН: 503303222876
        </p>
      </div>

      {/* Final Modal */}
      {showFinalModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl animate-bounce-in">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl animate-scale-in">
                <Icon name="CheckCircle2" className="text-white" size={48} />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Заявка принята!
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  Менеджер свяжется с вами в ближайшее время
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}