import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export default function PrivacyPolicyModal({
  open,
  onOpenChange,
  onAccept,
}: PrivacyPolicyModalProps) {
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = () => {
    setIsAccepting(true);
    setTimeout(() => {
      onAccept();
      onOpenChange(false);
      setIsAccepting(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-2xl w-[calc(100%-2rem)] sm:w-full max-h-[85vh] sm:max-h-[90vh] p-0 relative overflow-hidden rounded-2xl !top-[50%] !translate-y-[-50%] ${isAccepting ? 'border-4 animate-border-glow' : ''}`}>
        {isAccepting && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute inset-0 animate-border-glow opacity-20 rounded-2xl"></div>
          </div>
        )}
        <DialogHeader className="p-3 md:p-5 pb-2 md:pb-3">
          <DialogTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
            <Icon name="Shield" size={20} className="text-primary" />
            Согласие на обработку персональных данных
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            Пожалуйста, ознакомьтесь с условиями обработки ваших данных
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[50vh] px-3 md:px-5">
          <div className="space-y-3 text-xs md:text-sm text-foreground/90">
            <section>
              <h3 className="font-semibold text-sm md:text-base mb-1.5">1. Общие положения</h3>
              <p className="leading-relaxed">
                Настоящим я даю свое согласие на обработку моих персональных данных,
                указанных при заполнении формы заявки на получение займа, в соответствии
                с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-sm md:text-base mb-1.5">2. Цели обработки данных</h3>
              <p className="leading-relaxed mb-2">
                Персональные данные обрабатываются в следующих целях:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Рассмотрение заявки на предоставление займа</li>
                <li>Заключение и исполнение договора займа</li>
                <li>Проверка кредитной истории</li>
                <li>Информирование о статусе заявки</li>
                <li>Исполнение требований законодательства РФ</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-sm md:text-base mb-1.5">3. Перечень данных</h3>
              <p className="leading-relaxed mb-2">
                Согласие распространяется на следующие персональные данные:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Фамилия, имя, отчество</li>
                <li>Дата рождения</li>
                <li>Адрес регистрации и фактического проживания</li>
                <li>Контактные данные (телефон, email)</li>
                <li>Паспортные данные</li>
                <li>Сведения о доходах и занятости</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-sm md:text-base mb-1.5">4. Способы обработки</h3>
              <p className="leading-relaxed">
                Обработка персональных данных осуществляется с использованием средств
                автоматизации и без использования таких средств. Оператор принимает
                необходимые правовые, организационные и технические меры для защиты
                персональных данных от неправомерного доступа, уничтожения, изменения,
                блокирования и других неправомерных действий.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-sm md:text-base mb-1.5">5. Срок действия согласия</h3>
              <p className="leading-relaxed">
                Настоящее согласие действует с момента его предоставления до момента
                отзыва. Согласие может быть отозвано путем направления письменного
                заявления оператору.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-sm md:text-base mb-1.5">6. Права субъекта данных</h3>
              <p className="leading-relaxed">
                Я проинформирован(а) о своих правах на получение информации, касающейся
                обработки моих персональных данных, в соответствии со статьей 14
                Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».
              </p>
            </section>

            <section className="border-t pt-3 mt-4">
              <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                Нажимая кнопку "Принимаю", я подтверждаю, что ознакомлен(а) с условиями
                обработки персональных данных и даю свое согласие на их обработку.
              </p>
            </section>
          </div>
        </ScrollArea>

        <div className="flex gap-2 p-3 md:p-5 pt-2 md:pt-3 border-t">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="flex-1 h-9 md:h-10 text-xs md:text-sm"
          >
            <Icon name="X" size={14} className="mr-1.5" />
            Отклонить
          </Button>
          <Button
            onClick={handleAccept}
            className="flex-1 h-9 md:h-10 text-xs md:text-sm bg-gradient-to-r from-primary to-accent"
          >
            <Icon name="Check" size={14} className="mr-1.5" />
            Принимаю
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}