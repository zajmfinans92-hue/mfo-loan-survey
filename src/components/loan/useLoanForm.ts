import { useState, useEffect, useCallback } from 'react';
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

  const [modals, setModals] = useState({
    showSuccessModal: false,
    showFinalModal: false,
    showPrivacyModal: false,
    showOfertaModal: false,
    showPrivacyDocModal: false,
    showRefundModal: false,
    showContactsModal: false,
    showDocumentsModal: false,
    showRejectionModal: false,
    showManagerModal: false,
  });
  const [countdown, setCountdown] = useState(120);
  const [currentManager, setCurrentManager] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [debtAmount, setDebtAmount] = useState(0);
  const { toast } = useToast();

  const showSuccessModal = modals.showSuccessModal;
  
  useEffect(() => {
    if (showSuccessModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showSuccessModal && countdown === 0) {
      const managers = [
        {
          name: 'Анна Петрова',
          photo: 'https://i.pravatar.cc/300?img=5',
          position: 'Старший менеджер',
        },
        {
          name: 'Михаил Соколов',
          photo: 'https://i.pravatar.cc/300?img=12',
          position: 'Ведущий специалист',
        },
        {
          name: 'Елена Волкова',
          photo: 'https://i.pravatar.cc/300?img=9',
          position: 'Кредитный эксперт',
        },
      ];
      const randomManager = managers[Math.floor(Math.random() * managers.length)];
      setCurrentManager(randomManager);
      setModals(prev => ({ ...prev, showSuccessModal: false, showManagerModal: true }));
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
          setModals(prev => ({ ...prev, showPrivacyModal: true }));
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
        setLoading(false);
      } else {
        console.log('Проверка ФССП...');
        
        const fsspResponse = await fetch('https://functions.poehali.dev/f3fcc085-c4a5-4d2f-905b-167fd2247512', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthDate: formData.birthDate,
          }),
        });

        const fsspResult = await fsspResponse.json();
        console.log('FSSP check result:', fsspResult);

        if (fsspResult.hasHighDebt) {
          console.log('High debt detected:', fsspResult.totalDebt);
          setDebtAmount(fsspResult.totalDebt);
          setLoading(false);
          setModals(prev => ({ ...prev, showRejectionModal: true }));
          return;
        }

        console.log('Заявка отправлена:', formData);

        setLoading(false);
        setModals(prev => ({ ...prev, showDocumentsModal: true }));
        
        setTimeout(() => {
          setCountdown(120);
          setModals(prev => ({ ...prev, showSuccessModal: true }));
        }, 1000);
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
      setLoading(false);
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при отправке заявки. Попробуйте снова.',
        variant: 'destructive',
      });
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileUpload = (field: 'passportPhoto' | 'cardPhoto', file: File) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleCloseModal = () => {
    setModals({
      showSuccessModal: false,
      showFinalModal: false,
      showPrivacyModal: false,
      showOfertaModal: false,
      showPrivacyDocModal: false,
      showRefundModal: false,
      showContactsModal: false,
      showDocumentsModal: false,
      showRejectionModal: false,
      showManagerModal: false,
    });
    setStep(1);
    setCountdown(120);
    setCurrentManager(null);
    setDebtAmount(0);
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

  const setShowSuccessModal = useCallback((show: boolean) => {
    setModals(prev => ({ ...prev, showSuccessModal: show }));
  }, []);

  const setShowPrivacyModal = useCallback((show: boolean) => {
    setModals(prev => ({ ...prev, showPrivacyModal: show }));
  }, []);

  const setShowOfertaModal = useCallback((show: boolean) => {
    setModals(prev => ({ ...prev, showOfertaModal: show }));
  }, []);

  const setShowPrivacyDocModal = useCallback((show: boolean) => {
    setModals(prev => ({ ...prev, showPrivacyDocModal: show }));
  }, []);

  const setShowRefundModal = useCallback((show: boolean) => {
    setModals(prev => ({ ...prev, showRefundModal: show }));
  }, []);

  const setShowContactsModal = useCallback((show: boolean) => {
    setModals(prev => ({ ...prev, showContactsModal: show }));
  }, []);

  const setShowDocumentsModal = useCallback((show: boolean) => {
    setModals(prev => ({ ...prev, showDocumentsModal: show }));
  }, []);

  const setShowRejectionModal = useCallback((show: boolean) => {
    setModals(prev => ({ ...prev, showRejectionModal: show }));
  }, []);

  const setShowManagerModal = useCallback((show: boolean) => {
    setModals(prev => ({ ...prev, showManagerModal: show }));
  }, []);

  return {
    step,
    formData,
    setFormData,
    showSuccessModal,
    setShowSuccessModal,
    countdown,
    loading,
    showFinalModal: modals.showFinalModal,
    showPrivacyModal: modals.showPrivacyModal,
    setShowPrivacyModal,
    privacyAccepted,
    showOfertaModal: modals.showOfertaModal,
    setShowOfertaModal,
    showPrivacyDocModal: modals.showPrivacyDocModal,
    setShowPrivacyDocModal,
    showRefundModal: modals.showRefundModal,
    setShowRefundModal,
    showContactsModal: modals.showContactsModal,
    setShowContactsModal,
    showDocumentsModal: modals.showDocumentsModal,
    setShowDocumentsModal,
    showRejectionModal: modals.showRejectionModal,
    setShowRejectionModal,
    showManagerModal: modals.showManagerModal,
    setShowManagerModal,
    currentManager,
    debtAmount,
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