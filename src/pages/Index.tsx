import { useLoanForm } from '@/components/loan/useLoanForm';
import { useDocumentDownload } from '@/components/loan/useDocumentDownload';
import LoanFormLayout from '@/components/loan/LoanFormLayout';
import LoanStepRenderer from '@/components/loan/LoanStepRenderer';
import SuccessModal from '@/components/loan/SuccessModal';
import PrivacyPolicyModal from '@/components/loan/PrivacyPolicyModal';
import LegalFooter from '@/components/loan/LegalFooter';
import LegalModals from '@/components/loan/LegalModals';
import FinalModal from '@/components/loan/FinalModal';

export default function Index() {
  const {
    step,
    formData,
    setFormData,
    showSuccessModal,
    setShowSuccessModal,
    countdown,
    loading,
    showFinalModal,
    showPrivacyModal,
    setShowPrivacyModal,
    showOfertaModal,
    setShowOfertaModal,
    showPrivacyDocModal,
    setShowPrivacyDocModal,
    showRefundModal,
    setShowRefundModal,
    showContactsModal,
    setShowContactsModal,
    totalSteps,
    progressPercent,
    calculateOverpayment,
    handlePrivacyAccept,
    handleNext,
    handlePrev,
    handleFileUpload,
    handleCloseModal,
  } = useLoanForm();

  const {
    handleDownloadOferta,
    handleDownloadPrivacy,
    handleDownloadRefund,
    handleDownloadContacts,
  } = useDocumentDownload();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-3 md:py-12 px-3 md:px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDRWMGgtNHYxNnptMCA0NGg0di0xNmgtNHYxNnpNMTYgMzZoNHYtNGgtNHY0em00NCAwaDR2LTRoLTR2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <LoanFormLayout
        step={step}
        totalSteps={totalSteps}
        progressPercent={progressPercent}
        loading={loading}
        onNext={handleNext}
        onPrev={handlePrev}
      >
        <LoanStepRenderer
          step={step}
          formData={formData}
          setFormData={setFormData}
          calculateOverpayment={calculateOverpayment}
          handleFileUpload={handleFileUpload}
        />
      </LoanFormLayout>

      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        countdown={countdown}
        formData={formData}
        onClose={handleCloseModal}
      />

      <PrivacyPolicyModal
        open={showPrivacyModal}
        onOpenChange={setShowPrivacyModal}
        onAccept={handlePrivacyAccept}
      />

      <LegalFooter
        onOpenOferta={() => setShowOfertaModal(true)}
        onOpenPrivacy={() => setShowPrivacyDocModal(true)}
        onOpenRefund={() => setShowRefundModal(true)}
        onOpenContacts={() => setShowContactsModal(true)}
      />

      <LegalModals
        showOfertaModal={showOfertaModal}
        setShowOfertaModal={setShowOfertaModal}
        showPrivacyDocModal={showPrivacyDocModal}
        setShowPrivacyDocModal={setShowPrivacyDocModal}
        showRefundModal={showRefundModal}
        setShowRefundModal={setShowRefundModal}
        showContactsModal={showContactsModal}
        setShowContactsModal={setShowContactsModal}
        onDownloadOferta={handleDownloadOferta}
        onDownloadPrivacy={handleDownloadPrivacy}
        onDownloadRefund={handleDownloadRefund}
        onDownloadContacts={handleDownloadContacts}
      />

      <FinalModal show={showFinalModal} />
    </div>
  );
}
