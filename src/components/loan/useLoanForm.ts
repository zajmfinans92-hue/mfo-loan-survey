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
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [bkiLoad, setBkiLoad] = useState<'high' | 'low' | null>(null);
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
      
      const finalAmount = bkiLoad === 'high' 
        ? Math.max(3000, approvedAmount - Math.floor(Math.random() * 3000 + 1000))
        : approvedAmount + Math.floor(Math.random() * 3000 + 1000);
      
      setFormData(prev => ({ ...prev, loanAmount: finalAmount }));
      setModals(prev => ({ ...prev, showSuccessModal: false, showManagerModal: true }));
    }
  }, [showSuccessModal, countdown, bkiLoad, approvedAmount]);

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
        console.log('Заявка отправлена:', formData);

        try {
          const response = await fetch('https://functions.poehali.dev/5567d68c-bc86-4b91-9e61-f085fdc9bee1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: `${formData.lastName} ${formData.firstName} ${formData.middleName}`.trim(),
              phone: formData.phone,
              email: formData.email,
              comment: `Сумма: ${formData.loanAmount} руб., Срок: ${formData.loanTerm} дней\nДата рождения: ${formData.birthDate}\nАдрес: ${formData.regAddress}\nРабота: ${formData.workplace}, ${formData.position}\nДоход: ${formData.monthlyIncome} руб.`,
            }),
          });
          
          if (response.ok) {
            console.log('Данные успешно отправлены в MegaCRM');
          } else {
            console.error('Ошибка ответа от сервера:', await response.text());
          }
        } catch (megacrmError) {
          console.error('Ошибка отправки в MegaCRM:', megacrmError);
        }

        const loadType = Math.random() > 0.5 ? 'high' : 'low';
        setBkiLoad(loadType);
        
        const baseAmount = formData.loanAmount;
        const adjustedAmount = loadType === 'high'
          ? Math.max(3000, baseAmount - Math.floor(Math.random() * 2000 + 500))
          : baseAmount + Math.floor(Math.random() * 2000 + 500);
        
        setApprovedAmount(adjustedAmount);
        
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
    approvedAmount,
    bkiLoad,
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