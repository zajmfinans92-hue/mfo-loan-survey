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
    <div className="max-w-2xl mx-auto mt-8 text-center space-y-2 relative z-20">
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm pointer-events-auto">
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Opening Oferta modal');
            onOpenOferta();
          }}
          className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4 inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none"
        >
          <Icon name="FileText" size={14} />
          Договор оферты
        </button>
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Opening Privacy modal');
            onOpenPrivacy();
          }}
          className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4 inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none"
        >
          <Icon name="Shield" size={14} />
          Политика конфиденциальности
        </button>
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Opening Refund modal');
            onOpenRefund();
          }}
          className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4 inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none"
        >
          <Icon name="Banknote" size={14} />
          Условия возврата
        </button>
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Opening Contacts modal');
            onOpenContacts();
          }}
          className="text-white/80 hover:text-white transition-colors underline hover:underline-offset-4 inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none"
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