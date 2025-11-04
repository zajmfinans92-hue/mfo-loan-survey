import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function TestCRM() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

  const sendTestApplication = async () => {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('https://functions.poehali.dev/5567d68c-bc86-4b91-9e61-f085fdc9bee1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Тестов Тест Тестович',
          phone: '+79001234567',
          email: 'test@example.com',
          comment: 'Тестовая заявка из системы\nСумма: 15000 руб., Срок: 21 дней\nДата рождения: 01.01.1990\nАдрес: г. Москва, ул. Тестовая, д. 1\nРабота: ООО "Тест", Тестовая должность\nДоход: 50000 руб.',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`✅ Успешно! ${JSON.stringify(data, null, 2)}`);
        toast({
          title: '✅ Заявка отправлена',
          description: 'Тестовая заявка успешно отправлена в MegaCRM',
        });
      } else {
        setResult(`❌ Ошибка: ${JSON.stringify(data, null, 2)}`);
        toast({
          title: '❌ Ошибка',
          description: 'Не удалось отправить заявку',
          variant: 'destructive',
        });
      }
    } catch (error) {
      setResult(`❌ Ошибка: ${error}`);
      toast({
        title: '❌ Ошибка',
        description: 'Ошибка при отправке заявки',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6">Тест MegaCRM</h1>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Нажмите кнопку ниже, чтобы отправить тестовую заявку в MegaCRM
            </p>

            <Button 
              onClick={sendTestApplication} 
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? 'Отправка...' : 'Отправить тестовую заявку'}
            </Button>

            {result && (
              <Card className="p-4 bg-muted">
                <pre className="text-sm whitespace-pre-wrap overflow-x-auto">
                  {result}
                </pre>
              </Card>
            )}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="font-semibold mb-2">Тестовые данные:</h2>
            <ul className="text-sm space-y-1">
              <li>• ФИО: Тестов Тест Тестович</li>
              <li>• Телефон: +79001234567</li>
              <li>• Email: test@example.com</li>
              <li>• Сумма займа: 15000 руб.</li>
              <li>• Срок: 21 день</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
