import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader } from '@/components/ui/loader';
import Icon from '@/components/ui/icon';
import { FormData } from '@/components/loan/types';
import LoanCalculatorStep from '@/components/loan/LoanCalculatorStep';
import PersonalDataStep from '@/components/loan/PersonalDataStep';
import PhoneVerificationStep from '@/components/loan/PhoneVerificationStep';
import DocumentUploadStep from '@/components/loan/DocumentUploadStep';
import AddressStep from '@/components/loan/AddressStep';
import EmploymentStep from '@/components/loan/EmploymentStep';
import ReviewStep from '@/components/loan/ReviewStep';
import SuccessModal from '@/components/loan/SuccessModal';

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
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
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

  const totalSteps = 7;
  const progressPercent = (step / totalSteps) * 100;

  const calculateOverpayment = () => {
    const rate = 1.5;
    const overpayment = (formData.loanAmount * rate * formData.loanTerm) / 100;
    return Math.round(overpayment);
  };

  const handleNext = async () => {
    setLoading(true);

    try {
      if (step === 3 && !smsSent) {
        const response = await fetch('https://functions.poehali.dev/8f153db8-fd92-4a78-9014-13e1109af059', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: formData.phone }),
        });

        const data = await response.json();

        if (data.success) {
          setSmsSent(true);
          toast({
            title: 'SMS отправлено',
            description: 'Введите код из SMS',
          });
        } else {
          toast({
            title: 'Ошибка отправки SMS',
            description: data.error || 'Попробуйте снова',
            variant: 'destructive',
          });
        }
        setLoading(false);
        return;
      }

      if (step === 3 && smsSent) {
        const response = await fetch(
          `https://functions.poehali.dev/8f153db8-fd92-4a78-9014-13e1109af059?phone=${formData.phone}&code=${formData.smsCode}`
        );
        const data = await response.json();

        if (!data.valid) {
          toast({
            title: 'Неверный код',
            description: 'Проверьте код из SMS',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        setCountdown(60);
        setShowSuccessModal(true);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка. Попробуйте снова.',
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
    setSmsSent(false);
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
        return <PersonalDataStep formData={formData} setFormData={setFormData} />;
      case 3:
        return (
          <PhoneVerificationStep
            formData={formData}
            setFormData={setFormData}
            smsSent={smsSent}
          />
        );
      case 4:
        return (
          <DocumentUploadStep formData={formData} handleFileUpload={handleFileUpload} />
        );
      case 5:
        return <AddressStep formData={formData} setFormData={setFormData} />;
      case 6:
        return <EmploymentStep formData={formData} setFormData={setFormData} />;
      case 7:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 py-4 md:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 md:mb-8 text-center px-2">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Заявка на займ
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">Быстрое оформление за 5 минут</p>
        </div>

        <Card className="p-4 md:p-6 mb-4 md:mb-6 shadow-lg">
          <div className="mb-4 md:mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm font-medium text-muted-foreground">
                Шаг {step} из {totalSteps}
              </span>
              <span className="text-xs md:text-sm font-medium text-primary">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-1.5 md:h-2" />
          </div>

          <div className="mb-6 md:mb-8">
            {loading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <Loader size="lg" />
                <p className="text-sm text-muted-foreground">Обработка данных...</p>
              </div>
            ) : (
              renderStep()
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            {step > 1 && (
              <Button
                onClick={handlePrev}
                variant="outline"
                className="w-full sm:flex-1 h-11 md:h-10"
              >
                <Icon name="ChevronLeft" size={20} className="mr-2" />
                Назад
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={loading}
              className="w-full sm:flex-1 h-11 md:h-10 bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <Loader size="sm" className="mr-2" />
              ) : null}
              {step === totalSteps ? 'Отправить заявку' : smsSent && step === 3 ? 'Подтвердить код' : step === 3 ? 'Отправить SMS' : 'Далее'}
              {!loading && <Icon name="ChevronRight" size={20} className="ml-2" />}
            </Button>
          </div>
        </Card>

        <div className="flex justify-center gap-1.5 md:gap-2 mb-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                i + 1 === step
                  ? 'bg-primary w-6 md:w-8'
                  : i + 1 < step
                  ? 'bg-primary/50'
                  : 'bg-gray-300'
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

      {/* Final Modal */}
      {showFinalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center animate-scale-in">
                <Icon name="CheckCircle2" className="text-white" size={40} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Заявка принята!
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Менеджер свяжется с вами в ближайшее время
              </p>
              <Button
                onClick={handleCloseModal}
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg"
              >
                Отлично!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}