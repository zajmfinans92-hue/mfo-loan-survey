import Icon from '@/components/ui/icon';

interface LegalFooterProps {
  onOpenOferta: () => void;
  onOpenPrivacy: () => void;
  onOpenRefund: () => void;
  onOpenContacts: () => void;
}

const LegalFooter = ({
  onOpenOferta,
  onOpenPrivacy,
  onOpenRefund,
  onOpenContacts,
}: LegalFooterProps) => {
  return (
    <div className="max-w-2xl mx-auto mt-8 text-center space-y-2">
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm">
        <button 
          onClick={onOpenOferta}
          className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4 inline-flex items-center gap-1 cursor-pointer"
        >
          <Icon name="FileText" size={14} />
          Договор оферты
        </button>
        <button 
          onClick={onOpenPrivacy}
          className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4 inline-flex items-center gap-1 cursor-pointer"
        >
          <Icon name="Shield" size={14} />
          Политика конфиденциальности
        </button>
        <button 
          onClick={onOpenRefund}
          className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4 inline-flex items-center gap-1 cursor-pointer"
        >
          <Icon name="Banknote" size={14} />
          Условия возврата
        </button>
        <button 
          onClick={onOpenContacts}
          className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4 inline-flex items-center gap-1 cursor-pointer"
        >
          <Icon name="Phone" size={14} />
          Контакты
        </button>
      </div>
      <p className="text-white/60 text-xs md:text-sm">
        Самозанятый: Малик Степан Владимирович, ИНН: 503303222876
      </p>
    </div>
  );
};

export default LegalFooter;
