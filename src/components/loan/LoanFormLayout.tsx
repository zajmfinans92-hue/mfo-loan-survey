import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader } from '@/components/ui/loader';
import Icon from '@/components/ui/icon';

interface LoanFormLayoutProps {
  step: number;
  totalSteps: number;
  progressPercent: number;
  loading: boolean;
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
}

const LoanFormLayout = ({
  step,
  totalSteps,
  progressPercent,
  loading,
  children,
  onNext,
  onPrev,
}: LoanFormLayoutProps) => {
  return (
    <div className="max-w-2xl mx-auto relative z-10">
      <div className="mb-4 md:mb-10 px-1 md:px-2 animate-slide-up">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <img 
            src="https://cdn.poehali.dev/files/8e6a9c1a-a95c-47fa-a912-9ffdc0f5dbea.png" 
            alt="Деньги в Дом" 
            className="h-10 md:h-14 w-auto drop-shadow-2xl animate-bounce-in"
          />
          <a 
            href="tel:+74951178765" 
            className="text-white font-bold text-base md:text-xl drop-shadow-lg hover:text-blue-100 transition-colors"
          >
            8(495)117-85-67
          </a>
        </div>
        <div className="text-center">
          <h1 className="text-2xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-2">
            Заявка на займ
          </h1>
          <p className="text-sm md:text-lg text-blue-50 font-medium">Быстрое оформление за 5 минут ⚡</p>
        </div>
      </div>

      <Card className="p-4 md:p-8 mb-4 md:mb-8 shadow-2xl rounded-lg glass-effect border-0 animate-fade-in">
        <div className="mb-5 md:mb-8">
          <div className="flex justify-between items-center mb-2 md:mb-3">
            <div>
              <span className="text-xs md:text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 md:px-3 md:py-1 rounded-full">
                Шаг {step} из {totalSteps}
              </span>
            </div>
            <span className="text-sm md:text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <Progress value={progressPercent} className="h-1.5 md:h-2.5" />
        </div>

        <div className="mb-6 md:mb-10">
          {loading ? (
            <div className="py-16 md:py-24 flex flex-col items-center gap-4 md:gap-5">
              <Loader size="lg" />
              <div className="text-center">
                <p className="text-sm md:text-base font-semibold text-foreground mb-1">Обработка данных...</p>
                <p className="text-xs md:text-sm text-muted-foreground">Это займёт всего несколько секунд</p>
              </div>
            </div>
          ) : (
            children
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
          {step > 1 && (
            <Button
              onClick={onPrev}
              variant="outline"
              className="w-full sm:flex-1 h-11 md:h-11 text-sm md:text-base font-semibold border-2 hover:bg-muted/50 transition-all"
            >
              <Icon name="ChevronLeft" size={18} className="mr-1 md:mr-2" />
              Назад
            </Button>
          )}
          <Button
            onClick={onNext}
            disabled={loading}
            className="w-full sm:flex-1 h-11 md:h-11 text-sm md:text-base font-bold bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all"
          >
            {loading ? (
              <Loader size="sm" className="mr-2" />
            ) : null}
            {step === totalSteps ? '✨ Отправить заявку' : 'Продолжить'}
            {!loading && step < totalSteps && <Icon name="ChevronRight" size={18} className="ml-1 md:ml-2" />}
          </Button>
        </div>
      </Card>

      <div className="flex justify-center gap-1.5 md:gap-2.5 mb-4 md:mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 md:h-2.5 rounded-full transition-all duration-300 ${
              i + 1 === step
                ? 'bg-white shadow-lg w-6 md:w-10'
                : i + 1 < step
                ? 'bg-white/70 w-1.5 md:w-2.5'
                : 'bg-white/30 w-1.5 md:w-2.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoanFormLayout;