export interface ApplicationType {
  application: {
    id: string;
    firstName: string;
    lastName: string;
    duration: string;
    image: string;
    course: string;
    status: string;
    createdAt: string;
  };
}

export interface SingleApplicationType {
  studentName: string;
  fatherName: string;
  motherName: string;
  birthDay: string;
  bloodGroup: string;
  mobileNumber: string;
  guardianNumber: string;
  gender: string;
  gpa: string;
  nationality: string;
  nid: string;
  passingYear: string;
  regNumber: string;
  religion: string;
  rollNumber: string;
  image: string;
  fullAddress: string;
  district: string;
  courseName: string;
  duration: string;
  education: string;
  board: string;
  course: string;
  pc: string;
  email: string;
  transactionId: string;
  fatherOccupation: string;
  maritalStatus: string;
  session: string;
  trxId: string;
}

export interface SingleApplicationUserType {
  application: {
    id?: string;
    studentName: string;
    fatherName: string;
    motherName: string;
    birthDay: string;
    bloodGroup: string;
    mobileNumber: string;
    guardianNumber: string;
    gender: "male" | "female" | "other";
    gpa: string;
    nationality: string;
    nid: string;
    passingYear: number;
    regNumber: string;
    religion: string;
    rollNumber: string;
    image: string;
    fullAddress: string;
    district: string;
    courseName: string;
    duration: string;
    education: string;
    board: string;
    course: string;
    pc: "laptop" | "pc" | "no" | undefined;
    email: string;
    transactionId: string;
    fatherOccupation: string;
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";

    roll: number;
    user: {
      phoneNumber: string;
      email: string;
    };
    session: string;
  };
}

export interface ApplicationListType {
  id: string;
  duration: string;
  studentName: string;
  course: string;
  image: string;
  status: string;
  createdAt: string;
  certificate: string;
  mobileNumber: string;
  editable: boolean | null;
}
