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
export interface DesignType {
  id: string;
  image: string;
  imageId: string;
  name: string;
  category: string;
  subcategory: string;
  createdAt: string;
  status: string;
  description: string;
  tags: string[];
  authorId: string;
  viewCount: number;
  downloadCount: number;
  author: {
    name: string;
    image: string;
    status: string;
  };
  likes: { userId: string }[];
  likeCount: number;
  commentsCount: number;
  comments: {
    id: string;
    userId: string;
    designId: string;
    content: string;
    createdAt: string;
    user: {
      name: string;
      image: string;
      status: string;
    };
  }[];
}
