import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FormData } from './types';

export const useLoanForm = () => {
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
  const [showOfertaModal, setShowOfertaModal] = useState(false);
  const [showPrivacyDocModal, setShowPrivacyDocModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
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

        setShowDocumentsModal(true);
        
        setTimeout(() => {
          setCountdown(60);
          setShowSuccessModal(true);
        }, 1000);
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
    setShowDocumentsModal(false);
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

  return {
    step,
    formData,
    setFormData,
    showSuccessModal,
    setShowSuccessModal,
    countdown,
    loading,
    showFinalModal,
    showPrivacyModal,
    setShowPrivacyModal,
    privacyAccepted,
    showOfertaModal,
    setShowOfertaModal,
    showPrivacyDocModal,
    setShowPrivacyDocModal,
    showRefundModal,
    setShowRefundModal,
    showContactsModal,
    setShowContactsModal,
    showDocumentsModal,
    setShowDocumentsModal,
    totalSteps,
    progressPercent,
    calculateOverpayment,
    handlePrivacyAccept,
    handleNext,
    handlePrev,
    handleFileUpload,
    handleCloseModal,
  };
};