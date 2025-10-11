import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import LoanAgreement from './LoanAgreement';
import PersonalDataConsent from './PersonalDataConsent';
import { FormData } from './types';

interface DocumentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: FormData;
}

const DocumentsModal = ({ open, onOpenChange, formData }: DocumentsModalProps) => {
  const handleDownload = (documentType: 'agreement' | 'consent') => {
    const content = documentType === 'agreement' 
      ? generateAgreementHTML(formData)
      : generateConsentHTML(formData);
    
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = documentType === 'agreement' 
      ? `Договор_займа_${Date.now()}.html`
      : `Согласие_на_обработку_ПД_${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = (documentType: 'agreement' | 'consent') => {
    const content = documentType === 'agreement' 
      ? generateAgreementHTML(formData)
      : generateConsentHTML(formData);
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Icon name="FileText" className="text-primary" size={28} />
            Ваши документы готовы!
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="agreement" className="flex-1">
          <TabsList className="w-full grid grid-cols-2 px-6">
            <TabsTrigger value="agreement" className="text-sm md:text-base">
              <Icon name="FileSignature" size={18} className="mr-2" />
              Договор займа
            </TabsTrigger>
            <TabsTrigger value="consent" className="text-sm md:text-base">
              <Icon name="Shield" size={18} className="mr-2" />
              Согласие на обработку ПД
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agreement" className="mt-0 px-6">
            <ScrollArea className="h-[50vh] pr-4">
              <LoanAgreement formData={formData} />
            </ScrollArea>
            <div className="flex gap-3 mt-4 pb-6">
              <Button 
                onClick={() => handleDownload('agreement')}
                className="flex-1"
              >
                <Icon name="Download" size={18} className="mr-2" />
                Скачать договор
              </Button>
              <Button 
                onClick={() => handlePrint('agreement')}
                variant="outline"
                className="flex-1"
              >
                <Icon name="Printer" size={18} className="mr-2" />
                Распечатать
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="consent" className="mt-0 px-6">
            <ScrollArea className="h-[50vh] pr-4">
              <PersonalDataConsent formData={formData} />
            </ScrollArea>
            <div className="flex gap-3 mt-4 pb-6">
              <Button 
                onClick={() => handleDownload('consent')}
                className="flex-1"
              >
                <Icon name="Download" size={18} className="mr-2" />
                Скачать согласие
              </Button>
              <Button 
                onClick={() => handlePrint('consent')}
                variant="outline"
                className="flex-1"
              >
                <Icon name="Printer" size={18} className="mr-2" />
                Распечатать
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const generateAgreementHTML = (formData: FormData): string => {
  const today = new Date().toLocaleDateString('ru-RU');
  const rate = 1.5;
  const overpayment = (formData.loanAmount * rate * formData.loanTerm) / 100;
  const totalReturn = formData.loanAmount + Math.round(overpayment);

  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Договор займа № ${Date.now()}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { text-align: center; margin-bottom: 10px; }
    h2 { margin-top: 30px; }
    .center { text-align: center; }
    .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px; }
    .signature-line { border-bottom: 1px solid #000; margin-top: 20px; }
    @media print { body { margin: 0; padding: 20px; } }
  </style>
</head>
<body>
  <h1>ДОГОВОР ЗАЙМА № ${Date.now()}</h1>
  <p class="center">г. Москва, ${today}</p>

  <p><strong>ЗАИМОДАВЕЦ:</strong> ООО "МФО Быстрые Финансы", ОГРН 1234567890123, ИНН 7712345678</p>
  <p><strong>ЗАЕМЩИК:</strong> ${formData.lastName} ${formData.firstName} ${formData.middleName}</p>
  <p><strong>Паспортные данные заемщика:</strong> будут получены из загруженного документа</p>
  <p><strong>Телефон:</strong> ${formData.phone}</p>
  <p><strong>Email:</strong> ${formData.email}</p>
  <p><strong>Адрес регистрации:</strong> ${formData.regAddress}</p>
  <p><strong>Адрес проживания:</strong> ${formData.actualAddress || formData.regAddress}</p>

  <h2>1. ПРЕДМЕТ ДОГОВОРА</h2>
  <p>1.1. Заимодавец передает Заемщику денежные средства (займ) в размере <strong>${formData.loanAmount.toLocaleString('ru-RU')} рублей</strong>, а Заемщик обязуется вернуть полученную сумму и уплатить проценты на нее в размере, в сроки и на условиях Договора.</p>
  <p>1.2. Срок займа: <strong>${formData.loanTerm} дней</strong></p>
  <p>1.3. Процентная ставка: <strong>${rate}% в день</strong></p>
  <p>1.4. Сумма к возврату: <strong>${totalReturn.toLocaleString('ru-RU')} рублей</strong> (включая проценты)</p>

  <h2>2. ПОРЯДОК ПРЕДОСТАВЛЕНИЯ И ВОЗВРАТА ЗАЙМА</h2>
  <p>2.1. Займ предоставляется путем перечисления денежных средств в течение 15 минут после подписания Договора.</p>
  <p>2.2. Возврат займа и уплата процентов осуществляется Заемщиком не позднее ${new Date(Date.now() + formData.loanTerm * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}</p>

  <h2>3. ОТВЕТСТВЕННОСТЬ СТОРОН</h2>
  <p>3.1. За несвоевременный возврат займа Заемщик уплачивает пени в размере 0,1% от суммы займа за каждый день просрочки.</p>
  <p>3.2. Заимодавец не несет ответственности за задержку перечисления займа по вине банков и платежных систем.</p>

  <h2>4. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
  <p>4.1. Договор вступает в силу с момента его подписания обеими сторонами и действует до полного исполнения обязательств.</p>
  <p>4.2. Все споры по Договору разрешаются путем переговоров, а при недостижении согласия - в судебном порядке.</p>

  <div class="signatures">
    <div>
      <p><strong>ЗАИМОДАВЕЦ:</strong></p>
      <p>ООО "МФО Быстрые Финансы"</p>
      <div class="signature-line"></div>
      <p style="font-size: 0.9em;">Генеральный директор</p>
    </div>
    <div>
      <p><strong>ЗАЕМЩИК:</strong></p>
      <p>${formData.lastName} ${formData.firstName.charAt(0)}.${formData.middleName.charAt(0)}.</p>
      <div class="signature-line"></div>
      <p style="font-size: 0.9em;">Подпись</p>
    </div>
  </div>
</body>
</html>`;
};

const generateConsentHTML = (formData: FormData): string => {
  const today = new Date().toLocaleDateString('ru-RU');

  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Согласие на обработку персональных данных</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { text-align: center; margin-bottom: 10px; }
    h2 { margin-top: 30px; }
    .center { text-align: center; }
    ul { margin-left: 20px; }
    .signature { margin-top: 40px; }
    .signature-line { border-bottom: 1px solid #000; margin-top: 20px; width: 200px; }
    @media print { body { margin: 0; padding: 20px; } }
  </style>
</head>
<body>
  <h1>СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ</h1>
  <p class="center">г. Москва, ${today}</p>

  <p>Я, <strong>${formData.lastName} ${formData.firstName} ${formData.middleName}</strong>,</p>
  <p>Дата рождения: <strong>${formData.birthDate}</strong></p>
  <p>Телефон: <strong>${formData.phone}</strong></p>
  <p>Email: <strong>${formData.email}</strong></p>
  <p>Адрес регистрации: <strong>${formData.regAddress}</strong></p>

  <p>настоящим в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006 года свободно, своей волей и в своем интересе выражаю свое безусловное согласие на обработку моих персональных данных ООО "МФО Быстрые Финансы".</p>

  <h2>1. ПЕРЕЧЕНЬ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
  <ul>
    <li>Фамилия, имя, отчество</li>
    <li>Дата рождения</li>
    <li>Паспортные данные</li>
    <li>Адрес регистрации и фактического проживания</li>
    <li>Номер телефона</li>
    <li>Адрес электронной почты</li>
    <li>Данные о месте работы и должности</li>
    <li>Сведения о доходах</li>
    <li>Платежные реквизиты</li>
  </ul>

  <h2>2. ЦЕЛИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
  <ul>
    <li>Рассмотрение заявки на получение займа</li>
    <li>Заключение и исполнение договора займа</li>
    <li>Осуществление расчетов по договору</li>
    <li>Проверка кредитной истории</li>
  </ul>

  <div class="signature">
    <p><strong>СУБЪЕКТ ПЕРСОНАЛЬНЫХ ДАННЫХ:</strong></p>
    <p>${formData.lastName} ${formData.firstName} ${formData.middleName}</p>
    <p>Дата: ${today}</p>
    <div class="signature-line"></div>
    <p style="font-size: 0.9em;">Подпись</p>
  </div>
</body>
</html>`;
};

export default DocumentsModal;
