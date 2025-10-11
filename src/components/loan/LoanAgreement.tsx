import { FormData } from './types';

interface LoanAgreementProps {
  formData: FormData;
}

export const LoanAgreement = ({ formData }: LoanAgreementProps) => {
  const today = new Date().toLocaleDateString('ru-RU');
  const rate = 1.5;
  const overpayment = (formData.loanAmount * rate * formData.loanTerm) / 100;
  const totalReturn = formData.loanAmount + Math.round(overpayment);

  return (
    <div className="text-sm leading-relaxed space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">ДОГОВОР ЗАЙМА № {Date.now()}</h2>
        <p className="text-muted-foreground">г. Москва, {today}</p>
      </div>

      <div className="space-y-3">
        <p><strong>ЗАИМОДАВЕЦ:</strong> ООО "МФО Быстрые Финансы", ОГРН 1234567890123, ИНН 7712345678</p>
        
        <p><strong>ЗАЕМЩИК:</strong> {formData.lastName} {formData.firstName} {formData.middleName}</p>
        
        <p><strong>Паспортные данные заемщика:</strong> будут получены из загруженного документа</p>
        
        <p><strong>Телефон:</strong> {formData.phone}</p>
        
        <p><strong>Email:</strong> {formData.email}</p>
        
        <p><strong>Адрес регистрации:</strong> {formData.regAddress}</p>
        
        <p><strong>Адрес проживания:</strong> {formData.actualAddress || formData.regAddress}</p>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-bold mb-3">1. ПРЕДМЕТ ДОГОВОРА</h3>
        <p>
          1.1. Заимодавец передает Заемщику денежные средства (займ) в размере{' '}
          <strong>{formData.loanAmount.toLocaleString('ru-RU')} рублей</strong>, а Заемщик обязуется
          вернуть полученную сумму и уплатить проценты на нее в размере, в сроки и на условиях Договора.
        </p>
        
        <p className="mt-2">
          1.2. Срок займа: <strong>{formData.loanTerm} дней</strong>
        </p>
        
        <p className="mt-2">
          1.3. Процентная ставка: <strong>{rate}% в день</strong>
        </p>
        
        <p className="mt-2">
          1.4. Сумма к возврату: <strong>{totalReturn.toLocaleString('ru-RU')} рублей</strong> (включая проценты)
        </p>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-bold mb-3">2. ПОРЯДОК ПРЕДОСТАВЛЕНИЯ И ВОЗВРАТА ЗАЙМА</h3>
        <p>
          2.1. Займ предоставляется путем перечисления денежных средств на{' '}
          {formData.paymentMethod === 'card' && 'банковскую карту'}
          {formData.paymentMethod === 'sbp' && 'счет через СБП'}
          {formData.paymentMethod === 'bank' && 'банковский счет'}{' '}
          Заемщика в течение 15 минут после подписания Договора.
        </p>
        
        <p className="mt-2">
          2.2. Возврат займа и уплата процентов осуществляется Заемщиком не позднее{' '}
          {new Date(Date.now() + formData.loanTerm * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}
        </p>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-bold mb-3">3. ОТВЕТСТВЕННОСТЬ СТОРОН</h3>
        <p>
          3.1. За несвоевременный возврат займа Заемщик уплачивает пени в размере 0,1% от суммы займа за каждый день просрочки.
        </p>
        
        <p className="mt-2">
          3.2. Заимодавец не несет ответственности за задержку перечисления займа по вине банков и платежных систем.
        </p>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-bold mb-3">4. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h3>
        <p>
          4.1. Договор вступает в силу с момента его подписания обеими сторонами и действует до полного исполнения обязательств.
        </p>
        
        <p className="mt-2">
          4.2. Все споры по Договору разрешаются путем переговоров, а при недостижении согласия - в судебном порядке.
        </p>
        
        <p className="mt-2">
          4.3. Заемщик подтверждает, что ознакомлен с условиями Договора, согласен с ними и обязуется их выполнять.
        </p>
      </div>

      <div className="border-t pt-6 mt-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-bold mb-2">ЗАИМОДАВЕЦ:</p>
            <p>ООО "МФО Быстрые Финансы"</p>
            <p className="mt-4">_________________</p>
            <p className="text-xs text-muted-foreground">Генеральный директор</p>
          </div>
          
          <div>
            <p className="font-bold mb-2">ЗАЕМЩИК:</p>
            <p>{formData.lastName} {formData.firstName.charAt(0)}.{formData.middleName.charAt(0)}.</p>
            <p className="mt-4">_________________</p>
            <p className="text-xs text-muted-foreground">Подпись</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mt-6 text-xs text-muted-foreground">
        <p>
          Настоящий договор подписан с использованием простой электронной подписи в соответствии с 
          Федеральным законом от 06.04.2011 № 63-ФЗ "Об электронной подписи".
        </p>
      </div>
    </div>
  );
};

export default LoanAgreement;
