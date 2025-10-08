import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Oferta = () => {
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
          Договор оферты
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Общие положения</h2>
            <p>
              Настоящий договор является официальной офертой (публичным предложением) для физических лиц
              и содержит все существенные условия по оказанию информационно-консультационных услуг.
            </p>
            <p>
              Исполнителем услуг по настоящему договору является: <strong>Малик Степан Владимирович</strong>,
              самозанятый, ИНН: <strong>503303222876</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Предмет договора</h2>
            <p>
              Исполнитель обязуется оказать Заказчику информационно-консультационные услуги по вопросам
              микрофинансирования, а Заказчик обязуется принять и оплатить данные услуги.
            </p>
            <p>
              Услуги включают в себя:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Консультирование по вопросам получения займов</li>
              <li>Помощь в подборе подходящих финансовых продуктов</li>
              <li>Информационную поддержку в процессе оформления заявки</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Стоимость и порядок оплаты</h2>
            <p>
              Стоимость услуг определяется согласно выбранному тарифу и указывается на сайте.
              Оплата производится любым доступным способом на сайте до начала оказания услуг.
            </p>
            <p>
              После оплаты Заказчику на указанный электронный адрес направляется чек и подтверждение оплаты.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Права и обязанности сторон</h2>
            <p><strong>Исполнитель обязуется:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Оказать услуги надлежащего качества</li>
              <li>Соблюдать конфиденциальность предоставленной информации</li>
              <li>Предоставить консультацию в течение 24 часов с момента оплаты</li>
            </ul>
            <p className="mt-4"><strong>Заказчик обязуется:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Предоставить достоверную информацию для оказания услуг</li>
              <li>Своевременно произвести оплату услуг</li>
              <li>Соблюдать правила использования сервиса</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Ответственность сторон</h2>
            <p>
              За неисполнение или ненадлежащее исполнение обязательств по настоящему Договору стороны
              несут ответственность в соответствии с действующим законодательством Российской Федерации.
            </p>
            <p>
              Исполнитель не несет ответственности за решения финансовых организаций об одобрении
              или отказе в предоставлении займа.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Возврат денежных средств</h2>
            <p>
              Условия возврата денежных средств описаны в разделе{" "}
              <a href="/refund" className="text-blue-600 hover:underline">
                "Условия возврата"
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Срок действия договора</h2>
            <p>
              Договор вступает в силу с момента акцепта оферты (оплаты услуг) и действует до полного
              исполнения сторонами своих обязательств.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Реквизиты исполнителя</h2>
            <p>
              <strong>Самозанятый:</strong> Малик Степан Владимирович<br />
              <strong>ИНН:</strong> 503303222876
            </p>
          </section>

          <section className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Дата публикации: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Oferta;
