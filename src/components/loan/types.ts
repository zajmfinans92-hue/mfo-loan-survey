export type FormData = {
  loanAmount: number;
  loanTerm: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  phone: string;
  email: string;
  regAddress: string;
  actualAddress: string;
  sameAddress: boolean;
  workplace: string;
  position: string;
  monthlyIncome: string;
  passportPhoto: File | null;
  cardPhoto: File | null;
  smsCode: string;
};
