import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();

  useEffect(() => {
    if (showSuccessModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, countdown]);

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
      setCountdown(60);
      setShowSuccessModal(true);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Заявка на займ
          </h1>
          <p className="text-muted-foreground">Быстрое оформление за 5 минут</p>
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

      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        countdown={countdown}
        formData={formData}
        onClose={handleCloseModal}
      />
    </div>
  );
}
