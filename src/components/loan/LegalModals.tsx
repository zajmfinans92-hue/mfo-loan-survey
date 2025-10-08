import LegalModal from '@/components/legal/LegalModal';
import OfertaContent from '@/components/legal/OfertaContent';
import PrivacyContent from '@/components/legal/PrivacyContent';
import RefundContent from '@/components/legal/RefundContent';
import ContactsContent from '@/components/legal/ContactsContent';

interface LegalModalsProps {
  showOfertaModal: boolean;
  setShowOfertaModal: (show: boolean) => void;
  showPrivacyDocModal: boolean;
  setShowPrivacyDocModal: (show: boolean) => void;
  showRefundModal: boolean;
  setShowRefundModal: (show: boolean) => void;
  showContactsModal: boolean;
  setShowContactsModal: (show: boolean) => void;
  onDownloadOferta: () => void;
  onDownloadPrivacy: () => void;
  onDownloadRefund: () => void;
  onDownloadContacts: () => void;
}

const LegalModals = ({
  showOfertaModal,
  setShowOfertaModal,
  showPrivacyDocModal,
  setShowPrivacyDocModal,
  showRefundModal,
  setShowRefundModal,
  showContactsModal,
  setShowContactsModal,
  onDownloadOferta,
  onDownloadPrivacy,
  onDownloadRefund,
  onDownloadContacts,
}: LegalModalsProps) => {
  console.log('LegalModals render:', {
    showOfertaModal,
    showPrivacyDocModal,
    showRefundModal,
    showContactsModal,
  });

  return (
    <>
      <LegalModal 
        open={showOfertaModal} 
        onOpenChange={setShowOfertaModal} 
        title="Договор оферты"
        onDownload={onDownloadOferta}
      >
        <div id="oferta-content">
          <OfertaContent />
        </div>
      </LegalModal>

      <LegalModal 
        open={showPrivacyDocModal} 
        onOpenChange={setShowPrivacyDocModal} 
        title="Политика обработки персональных данных"
        onDownload={onDownloadPrivacy}
      >
        <div id="privacy-content">
          <PrivacyContent />
        </div>
      </LegalModal>

      <LegalModal 
        open={showRefundModal} 
        onOpenChange={setShowRefundModal} 
        title="Условия возврата и отмены платежа"
        onDownload={onDownloadRefund}
      >
        <div id="refund-content">
          <RefundContent />
        </div>
      </LegalModal>

      <LegalModal 
        open={showContactsModal} 
        onOpenChange={setShowContactsModal} 
        title="Контактная информация"
        onDownload={onDownloadContacts}
      >
        <div id="contacts-content">
          <ContactsContent />
        </div>
      </LegalModal>
    </>
  );
};

export default LegalModals;