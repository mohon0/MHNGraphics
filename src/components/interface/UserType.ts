export interface UserType {
  id: string;
  image: string;
  name: string;
  email: string;
  bio: string;
  createdAt: Date;
  status: string;
}

export interface AddressListType {
  id: string;
  studentName: string;
  email: string;
  image: string;
  mobileNumber: string;
  bloodGroup: string;
  fullAddress: string;
}
