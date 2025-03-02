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
