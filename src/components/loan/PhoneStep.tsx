import { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { FormData } from './types';
import InputMask from 'react-input-mask';

type PhoneStepProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function PhoneStep({ formData, setFormData }: PhoneStepProps) {
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState(['', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (codeSent && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [codeSent, countdown]);

  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      const enteredCode = code.join('');
      if (enteredCode === generatedCode) {
        setIsVerified(true);
        setFormData({ ...formData, phoneVerified: true });
      }
    }
  }, [code, generatedCode]);

  const generateCode = () => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(newCode);
    return newCode;
  };

  const handleSendCode = () => {
    if (!formData.phone || formData.phone.includes('_')) {
      return;
    }
    
    const newCode = generateCode();
    setCodeSent(true);
    setCountdown(60);
    
    setTimeout(() => {
      setCode(newCode.split(''));
      inputRefs[0].current?.focus();
    }, 1500);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResend = () => {
    setCode(['', '', '', '']);
    setIsVerified(false);
    handleSendCode();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg animate-bounce-in">
          <Icon name="Phone" className="text-white" size={36} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Подтверждение номера
        </h2>
        <p className="text-base text-muted-foreground">
          {!codeSent ? 'Введите номер телефона для получения кода' : 'Введите код из SMS'}
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        {!codeSent ? (
          <div className="space-y-4 animate-slide-up">
            <div>
              <Label className="text-base font-semibold">
                Номер телефона <span className="text-red-500">*</span>
              </Label>
              <InputMask
                mask="+7 (999) 999-99-99"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (999) 123-45-67"
                className="flex h-14 w-full rounded-xl border-2 border-input bg-white px-4 py-3 text-lg font-medium ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all mt-2"
                required
              />
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <Icon name="Shield" size={16} className="text-blue-600" />
                Ваш номер защищён и не будет передан третьим лицам
              </p>
            </div>

            <Button
              onClick={handleSendCode}
              disabled={!formData.phone || formData.phone.includes('_')}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Получить код
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-slide-up">
            {!isVerified && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 animate-fade-in">
                <div className="flex items-start gap-3">
                  <Icon name="Info" className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Код отправлен на {formData.phone}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Код автоматически вставится в поля ниже
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isVerified && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 animate-scale-in">
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircle2" className="text-green-600" size={24} />
                  <div>
                    <p className="text-base font-bold text-green-900">Номер подтверждён!</p>
                    <p className="text-sm text-green-700">Можете продолжить заполнение заявки</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label className="text-base font-semibold mb-3 block text-center">
                Код подтверждения
              </Label>
              <div className="flex gap-3 justify-center">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={isVerified}
                    className={`w-16 h-16 text-center text-2xl font-bold rounded-xl border-2 transition-all ${
                      isVerified
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : digit
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-300 bg-white'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                ))}
              </div>
            </div>

            {!isVerified && (
              <div className="text-center space-y-3">
                {countdown > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Повторная отправка через{' '}
                    <span className="font-bold text-foreground">{countdown} сек</span>
                  </p>
                ) : (
                  <Button
                    onClick={handleResend}
                    variant="outline"
                    className="w-full h-12 font-semibold rounded-xl border-2 hover:bg-blue-50 hover:border-blue-500"
                  >
                    Отправить код повторно
                  </Button>
                )}
              </div>
            )}

            <Button
              onClick={() => setFormData({ ...formData, phone: '' })}
              variant="ghost"
              className="w-full"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Изменить номер
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}