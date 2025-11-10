import Icon from '@/components/ui/icon';

interface FinalModalProps {
  show: boolean;
}

const FinalModal = ({ show }: FinalModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg p-6 sm:p-8 md:p-10 max-w-md w-full shadow-2xl animate-bounce-in">
        <div className="text-center space-y-5 sm:space-y-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl animate-scale-in">
            <Icon name="CheckCircle2" className="text-white" size={44} />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Заявка одобрена!
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium">
              Менеджер свяжется с вами в ближайшее время
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalModal;