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
  author: {
    name: string;
    image: string;
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
