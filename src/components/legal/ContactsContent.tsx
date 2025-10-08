import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const ContactsContent = () => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="User" size={24} className="text-blue-600" />
              Реквизиты
            </CardTitle>
            <CardDescription>Информация об исполнителе</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Самозанятый</p>
              <p className="font-semibold">Малик Степан Владимирович</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ИНН</p>
              <p className="font-semibold">503303222876</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Mail" size={24} className="text-blue-600" />
              Email
            </CardTitle>
            <CardDescription>Для связи и поддержки</CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:underline font-semibold"
            >
              support@example.com
            </a>
            <p className="text-sm text-gray-600 mt-2">
              Ответим в течение 24 часов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Phone" size={24} className="text-blue-600" />
              Телефон
            </CardTitle>
            <CardDescription>Горячая линия поддержки</CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href="tel:+79001234567"
              className="text-blue-600 hover:underline font-semibold text-lg"
            >
              +7 (900) 123-45-67
            </a>
            <p className="text-sm text-gray-600 mt-2">
              Пн-Пт: 9:00 - 18:00 (МСК)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="MessageCircle" size={24} className="text-blue-600" />
              Telegram
            </CardTitle>
            <CardDescription>Быстрая связь в мессенджере</CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              @yourusername
            </a>
            <p className="text-sm text-gray-600 mt-2">
              Отвечаем быстрее всего
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Icon name="Clock" size={24} className="text-blue-600" />
          График работы
        </h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Понедельник - Пятница:</strong> 9:00 - 18:00 (МСК)</p>
          <p><strong>Суббота - Воскресенье:</strong> Выходной</p>
          <p className="text-sm text-gray-600 mt-3">
            * Заявки, поступившие в нерабочее время, обрабатываются в следующий рабочий день
          </p>
        </div>
      </div>

      <div className="p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Часто задаваемые вопросы
        </h2>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-gray-800">Как быстро обрабатываются заявки?</p>
            <p className="text-gray-600 text-sm mt-1">
              Стандартное время обработки - до 24 часов с момента оплаты услуги.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Можно ли получить консультацию бесплатно?</p>
            <p className="text-gray-600 text-sm mt-1">
              Базовую информацию можно получить через форму обратной связи. Детальная консультация
              предоставляется после оплаты услуги.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Как получить чек об оплате?</p>
            <p className="text-gray-600 text-sm mt-1">
              Чек автоматически отправляется на указанный при оплате email. Если чек не пришёл,
              свяжитесь с нами любым удобным способом.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsContent;
