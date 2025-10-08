import { FormData } from './types';
import LoanCalculatorStep from './LoanCalculatorStep';
import PhoneStep from './PhoneStep';
import PersonalDataStep from './PersonalDataStep';
import PaymentMethodStep from './PaymentMethodStep';
import DocumentUploadStep from './DocumentUploadStep';
import AddressStep from './AddressStep';
import EmploymentStep from './EmploymentStep';
import ReviewStep from './ReviewStep';

interface LoanStepRendererProps {
  step: number;
  formData: FormData;
  setFormData: (data: FormData) => void;
  calculateOverpayment: () => number;
  handleFileUpload: (field: 'passportPhoto' | 'cardPhoto', file: File) => void;
}

const LoanStepRenderer = ({
  step,
  formData,
  setFormData,
  calculateOverpayment,
  handleFileUpload,
}: LoanStepRendererProps) => {
  switch (step) {
    case 1:
      return (
        <LoanCalculatorStep
          formData={formData}
          setFormData={setFormData}
          calculateOverpayment={calculateOverpayment}
        />
      );
    case 2:
      return <PhoneStep formData={formData} setFormData={setFormData} />;
    case 3:
      return <PersonalDataStep formData={formData} setFormData={setFormData} />;
    case 4:
      return <PaymentMethodStep formData={formData} setFormData={setFormData} />;
    case 5:
      return (
        <DocumentUploadStep formData={formData} handleFileUpload={handleFileUpload} />
      );
    case 6:
      return <AddressStep formData={formData} setFormData={setFormData} />;
    case 7:
      return <EmploymentStep formData={formData} setFormData={setFormData} />;
    case 8:
      return <ReviewStep formData={formData} />;
    default:
      return null;
  }
};

export default LoanStepRenderer;
