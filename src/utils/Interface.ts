export interface PaymentReportType {
  comment: string;
  id: string;
  PaymentMonth: string;
  PaymentReceiveDate: string;
  amount: number;
  year: string;
}

export interface CommentListType {
  id: string;
  user: {
    name: string;
    image: string;
  };
  createdAt: Date;
  content: string;
  design: {
    name: string;
    id: string;
  };
}

export interface Donor {
  id: string;
  name: string;
  image: string;
  bloodGroup: string;
  district: string;
  number: string;
  number2?: string;
  birthDate?: string;
  donatedBefore: string;
  diseases: string;
  allergies: string;
  address: string;
  createdAt: string;
}

export interface BloodBankData {
  users: Donor[];
  count: number;
  meta?: {
    totalPages: number;
    currentPage: number;
  };
}

export interface BloodBankQueryParams {
  currentPage: number;
  searchInput: string;
  bloodGroup: string;
}

export interface PaginationProps {
  totalPages: number;
  initialPage: number;
  query: string;
  setPage: (page: number) => void;
}
