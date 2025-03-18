export interface AllDesignType {
  data: {
    id: string;
    image: string;
    name: string;
    category: string;
    subcategory: string;
    createdAt: Date;
  };
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
}
