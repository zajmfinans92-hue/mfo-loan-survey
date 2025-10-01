import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function Embed() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const currentDomain = window.location.origin;
  
  const embedCode = `<!-- Анкета МФО - Код для вставки -->
<div id="mfo-form-widget"></div>
<script>
  (function() {
    var iframe = document.createElement('iframe');
    iframe.src = '${currentDomain}/';
    iframe.style.width = '100%';
    iframe.style.height = '800px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    document.getElementById('mfo-form-widget').appendChild(iframe);
  })();
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast({
      title: 'Код скопирован',
      description: 'Вставьте его на ваш сайт',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Код для вставки на сайт
          </h1>
          <p className="text-muted-foreground text-lg">
            Разместите анкету на любом сайте за 2 минуты
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Code2" className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">HTML код</h2>
                <p className="text-muted-foreground text-sm">
                  Скопируйте код и вставьте его в HTML вашего сайта
                </p>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-slate-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{embedCode}</code>
              </pre>
              <Button
                onClick={handleCopy}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur"
                size="sm"
              >
                {copied ? (
                  <>
                    <Icon name="Check" size={16} className="mr-2" />
                    Скопировано
                  </>
                ) : (
                  <>
                    <Icon name="Copy" size={16} className="mr-2" />
                    Копировать
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Инструкция для Тильды</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <span>Войдите в редактор страницы Тильды</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <span>Добавьте блок "HTML-код" (T123)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <span>Вставьте скопированный код в поле "HTML-код"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <span>Сохраните и опубликуйте страницу</span>
                  </li>
                </ol>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="Globe" className="text-primary flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-bold mb-1">Универсальность</h3>
                  <p className="text-sm text-muted-foreground">
                    Работает на любых CMS: WordPress, Битрикс, Joomla, Wix и других
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="Smartphone" className="text-primary flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-bold mb-1">Адаптивность</h3>
                  <p className="text-sm text-muted-foreground">
                    Автоматически подстраивается под размер экрана устройства
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="Zap" className="text-primary flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-bold mb-1">Быстрая загрузка</h3>
                  <p className="text-sm text-muted-foreground">
                    Оптимизированный код не замедляет ваш сайт
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="Shield" className="text-primary flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-bold mb-1">Безопасность</h3>
                  <p className="text-sm text-muted-foreground">
                    Изолированный iframe защищает данные пользователей
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <div className="flex gap-4">
              <Icon name="Lightbulb" className="text-amber-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold mb-2 text-amber-900">Настройка размера</h3>
                <p className="text-sm text-amber-800 mb-3">
                  Вы можете изменить высоту виджета, отредактировав значение <code className="bg-amber-100 px-2 py-1 rounded">height: '800px'</code> в коде
                </p>
                <p className="text-xs text-amber-700">
                  Рекомендуемая высота: от 700px до 1000px в зависимости от вашего дизайна
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => window.open('/', '_blank')}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Icon name="ExternalLink" size={20} className="mr-2" />
            Открыть анкету в новом окне
          </Button>
        </div>
      </div>
    </div>
  );
}
