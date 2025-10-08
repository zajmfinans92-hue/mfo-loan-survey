import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Refund = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-10">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Назад
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Условия возврата и отмены платежа
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Общие положения</h2>
            <p>
              Настоящие условия регулируют порядок возврата денежных средств за оплаченные
              информационно-консультационные услуги, оказываемые самозанятым Маликом Степаном Владимировичем
              (ИНН: 503303222876).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Право на возврат</h2>
            <p>
              В соответствии со статьёй 32 Закона РФ «О защите прав потребителей», потребитель вправе
              отказаться от исполнения договора о выполнении работ (оказании услуг) в любое время при
              условии оплаты исполнителю фактически понесённых расходов, связанных с исполнением
              обязательств по данному договору.
            </p>
            <p>
              Возврат денежных средств возможен в следующих случаях:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Услуга не была оказана по вине исполнителя</li>
              <li>Техническая ошибка при оплате (двойное списание, неверная сумма)</li>
              <li>Отказ от услуги до начала её оказания</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Случаи, когда возврат невозможен</h2>
            <p>
              Возврат денежных средств не производится в следующих случаях:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Услуга была полностью оказана в соответствии с договором</li>
              <li>Заказчик получил консультацию и воспользовался предоставленной информацией</li>
              <li>Отказ финансовой организации в предоставлении займа (не является основанием для возврата)</li>
              <li>Прошло более 14 дней с момента оказания услуги</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Порядок оформления возврата</h2>
            <p>
              Для возврата денежных средств необходимо:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                Направить письменное заявление на возврат через форму обратной связи на сайте
                или на контактный email
              </li>
              <li>
                Указать в заявлении:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>ФИО плательщика</li>
                  <li>Дату и сумму платежа</li>
                  <li>Причину возврата</li>
                  <li>Реквизиты для возврата денежных средств</li>
                </ul>
              </li>
              <li>
                Приложить копию платёжного документа (чека)
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Сроки возврата</h2>
            <p>
              Заявление на возврат рассматривается в течение <strong>3 (трёх) рабочих дней</strong> с момента получения.
            </p>
            <p>
              При положительном решении денежные средства возвращаются в течение{" "}
              <strong>10 (десяти) рабочих дней</strong> с момента принятия решения о возврате.
            </p>
            <p>
              Возврат осуществляется тем же способом, которым была произведена оплата, если иное
              не согласовано сторонами.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Частичный возврат</h2>
            <p>
              В случае частичного оказания услуг возврат производится за вычетом стоимости
              фактически оказанных услуг.
            </p>
            <p>
              Размер возврата определяется пропорционально объёму невыполненных обязательств.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Отмена платежа</h2>
            <p>
              Отмена ошибочного платежа возможна в течение <strong>24 часов</strong> с момента оплаты
              при условии, что услуга ещё не начала оказываться.
            </p>
            <p>
              Для отмены платежа необходимо немедленно связаться с поддержкой через контактные данные,
              указанные в разделе "Контакты".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Контактная информация</h2>
            <p>
              Для оформления возврата или отмены платежа обращайтесь через раздел{" "}
              <a href="/contacts" className="text-blue-600 hover:underline">
                "Контакты"
              </a>.
            </p>
            <p>
              Все вопросы по возврату денежных средств рассматриваются в индивидуальном порядке.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Споры и разногласия</h2>
            <p>
              Все споры и разногласия решаются путём переговоров. При недостижении согласия
              спор подлежит рассмотрению в судебном порядке по месту нахождения исполнителя.
            </p>
          </section>

          <section className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Дата публикации: {new Date().toLocaleDateString('ru-RU')}<br />
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Refund;
