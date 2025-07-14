"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import logo2 from "@/images/hero/logo2.png";
import logo from "@/images/hero/logo3.png";
import { useSingleApplication } from "@/services/application";
import { UserApplication } from "@/utils/Interface";
import { format } from "date-fns";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useRef } from "react";
import { IoMdPrint } from "react-icons/io";
import { useReactToPrint } from "react-to-print";

function Loading() {
  return (
    <div className="p-4">
      <Skeleton className="mb-4 h-10 w-3/4" />
      <Skeleton className="mb-4 h-6 w-1/2" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="mt-4 h-8 w-full" />
    </div>
  );
}

function SingleApplicationPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const { isLoading, data, isError, isRefetching } = useSingleApplication({
    id,
  });
  return (
    <div className="mx-2 md:mx-10">
      {isLoading ? (
        <Loading />
      ) : isRefetching ? (
        <Loading />
      ) : isError ? (
        "Error loading application"
      ) : (
        <SingleApplication application={data.application} />
      )}
    </div>
  );
}

function SingleApplication({ application }: { application: UserApplication }) {
  const duration =
    application && application.duration === "free"
      ? "Free (conditions applied)"
      : application && application.duration;

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef as React.RefObject<Element | Text>,
  });

  return (
    <div>
      <div ref={contentRef}>
        <div className="flex flex-col items-center justify-center gap-6 bg-cyan-500 px-2 py-2 md:flex-row md:px-10 md:py-8 print:flex print:flex-row print:px-10 print:py-4">
          <div className="w-4/12 md:w-2/12 print:w-2/12">
            <Image src={logo} alt="" />
          </div>
          <div className="flex w-11/12 flex-col items-center justify-center text-center md:w-8/12 print:w-8/12">
            <div className="text-center text-3xl font-bold text-black">
              Best Computer Training Center
            </div>
            <div className="text-gray-900">
              Rofi Tower, 4th Floor, Paira chattor, Jhenaidah
            </div>
            <div className="text-gray-900">
              <span className="font-bold">Mobile: </span> 01989491248
            </div>
            <div className="text-gray-900">
              <span className="font-bold">Email: </span>{" "}
              bestcomputer.jhenaidah@gmail.com
            </div>
          </div>
          <div className="md:w-2/12 print:w-2/12">
            <Image
              src={application.image}
              alt=""
              width={200}
              height={200}
              className="h-32 w-full object-cover md:h-48 print:h-32"
            />
          </div>
        </div>

        <div className="my-1 grid grid-cols-3">
          <div className="flex items-center gap-3 pl-12">
            <div className="font-bold print:text-black">SL No: </div>
            <div className="h-7 w-20 border"></div>
          </div>
          <Button
            variant="secondary"
            className="mx-auto my-4 bg-cyan-700 text-lg font-bold text-white"
          >
            Admission Form
          </Button>
          <div className="mr-1 flex flex-col justify-end border print:text-black">
            <div className="overflow-clip">
              <div className="flex flex-wrap text-sm">
                <div className="pl-2">Account:</div>
                <div className="pl-2">
                  {application.user.phoneNumber
                    ? `${application.user.phoneNumber}`
                    : application.user.email
                      ? `${application.user.email}`
                      : ""}
                </div>
              </div>
              <div className="flex gap-2 px-2 text-sm">
                <div>Password:</div>
                <div>*********</div>
              </div>
            </div>
            <div className="flex gap-2 border-t px-2">
              <div>Roll No:</div>
              <div>{application.roll}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col print:mx-10 print:text-black">
          <table className="w-full">
            <tbody>
              <tr className="flex flex-col md:flex-row print:flex-row">
                <td className="w-full border-collapse border-2 p-1 px-2 md:w-1/2 print:w-1/2">
                  <span className="font-bold">Student Full Name: </span>
                  <span className="pl-3">
                    {capitalizeFirstLetter(application.studentName)}
                  </span>
                </td>
                <td className="w-full border p-1 px-2 md:w-1/2 print:w-1/2">
                  <span className="font-bold">Session: </span>
                  <span className="pl-3">{application.session}</span>
                </td>
              </tr>
              <Model
                item1="Father Name"
                item2="Mother Name"
                value1={application.fatherName}
                value2={application.motherName}
              />
              <Model
                item1="Father's Occupation"
                item2="Marital Status"
                value1={application.fatherOccupation}
                value2={application.maritalStatus}
              />
              <tr className="flex flex-col md:flex-row print:flex-row">
                <td className="w-full border-collapse border-2 p-1 px-2 md:w-1/2 print:w-1/2">
                  <span className="font-bold">BirthDay: </span>
                  <span className="pl-3">
                    {application.birthDay
                      ? format(new Date(application.birthDay), "do MMMM yyyy")
                      : ""}
                  </span>
                </td>
                <td className="w-full border-collapse border-2 p-1 px-2 md:w-1/2 print:w-1/2">
                  <span className="font-bold">Blood Group: </span>
                  <span className="pl-3">{application.bloodGroup}</span>
                </td>
              </tr>
              <Model
                item1="Mobile Number"
                item2="Guardian Number"
                value1={application.mobileNumber}
                value2={application.guardianNumber}
              />
              <Model
                item1="Gender"
                item2="Religion"
                value1={application.gender}
                value2={application.religion}
              />
              <Model
                item1="Full Address"
                item2="District"
                value1={application.fullAddress}
                value2={application.district}
              />
              <tr className="flex flex-col md:flex-row print:flex-row">
                <td className="w-full border-collapse border-2 p-1 px-2 md:w-1/2 print:w-1/2">
                  <span className="font-bold">Email Address: </span>
                  <span className="pl-3">{application.email}</span>
                </td>
                <td className="w-full border-collapse border-2 p-1 px-2 md:w-1/2 print:w-1/2">
                  <span className="font-bold">Computer: </span>
                  <span className="pl-3">{application.pc}</span>
                </td>
              </tr>
              <Model
                item1="Education"
                item2="Board"
                value1={application.education}
                value2={application.board}
              />
              <Model
                item1="Roll Number"
                item2="Reg Number"
                value1={application.rollNumber}
                value2={application.regNumber}
              />
              <Model
                item1="Passing Year"
                item2="GPA/CGPA"
                value1={String(application.passingYear)}
                value2={application.gpa}
              />
              <Model
                item1="Birth Reg/NID"
                item2="Nationality"
                value1={application.nid}
                value2={application.nationality}
              />
              <tr className="flex flex-col md:flex-row print:flex-row">
                <td className="w-full border-collapse border-2 p-1 px-2 md:w-1/2 print:w-1/2">
                  <span className="font-bold">Course Name: </span>
                  <span className="pl-3 uppercase">{application.course}</span>
                </td>
                <td className="w-full border-collapse border-2 p-1 px-2 md:w-1/2 print:w-1/2">
                  <span className="font-bold">Duration: </span>
                  <span className="pl-3">{duration}</span>
                </td>
              </tr>
              <tr className="flex flex-col md:flex-row print:flex-row">
                <td className="w-full border p-1 px-2 md:w-1/2 print:w-1/2">
                  <span className="font-bold">Transaction ID: </span>
                  <span className="pl-3 uppercase">
                    {application.transactionId}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-24 hidden justify-between font-bold md:mx-12 md:flex lg:mx-10 print:mt-10 print:flex print:text-black">
            <div>
              <div className="h-0.5 w-40 bg-cyan-700"></div>
              <div>Director Signature</div>
              <div>Date:</div>
            </div>
            <div>
              <div className="h-0.5 w-40 bg-cyan-700"></div>
              <div>Student Signature</div>
              <div>Date:</div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 hidden w-full bg-cyan-600 p-2 text-center text-white print:block">
          <p>www.bestcomputerjhe.online</p>
        </div>

        <Image
          src={logo2}
          alt=""
          className="absolute -z-50 w-96 -translate-y-156 translate-x-2/3 transform opacity-10 print:left-1/2 print:top-1/2 print:-translate-x-1/2 print:-translate-y-1/2"
        />
        <div className="mt-3 border text-sm md:mx-10 print:mx-8 print:text-black">
          <div>
            আমি এতদ্বারা অঙ্গীকার করিতেছি যে, আমি প্রতিষ্ঠানের নিয়ম অনুযায়ী আমার
            সন্তান/পোষ্য, এর যাবতীয় ব্যয়ভার এবং আমার সন্তান/পোষ্য প্রতিষ্ঠানের
            এর নিয়ম শৃঙ্খলা ভঙ্গ করিলে বা অন্য কোনো কারণে প্রতিষ্ঠানের জন্য
            ক্ষতিকর বিবেচিত হইলে কতৃপক্ষের যে কোন সিধান্ত মানিয়া লইতে বাধ্য
            থাকিব।
          </div>
        </div>
        <div className="flex flex-col items-end justify-between gap-8 md:mx-10 md:flex-row md:gap-0 print:mx-8 print:flex-row print:gap-0">
          <div className="mt-2 w-fit border p-2 text-sm print:text-black">
            <p className="font-bold underline">
              ভর্তির জন্য প্রয়োজনীয় কাগজ পত্র ও শর্তাবলীঃ
            </p>
            <p>১. পাসপোর্ট সাইজের ২ কপি রঙিন ছবি</p>
            <p>২. এস.এস.সি/জে.এস.সি মার্কশীটের ফটোকপি (যে কোন একটা)</p>
            <p>৩. এন.আই.ডি/জন্ম নিবন্ধনের ফটোকপি (যে কোন একটা)</p>
            <p>
              ৪. ভর্তি হওয়ার পর, পরবর্তীতে ভর্তি বাতিল করতে চাইলে সে <br />{" "}
              ক্ষেত্র কোন টাকা ফেরত দেওয়া হবে না।
            </p>
          </div>
          <div className="print:text-black">
            <div className="h-0.5 w-40 bg-cyan-700"></div>
            <div>Guardian Signature</div>
            <div>Date:</div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => reactToPrintFn()}
        size="lg"
        className="mx-auto mb-10 mt-10 flex items-center gap-3 print:hidden"
      >
        <IoMdPrint />
        Print Application
      </Button>
    </div>
  );
}

type props = {
  item1: string;
  item2: string;
  value1: string;
  value2: string;
};

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ""; // Return an empty string if input is falsy
  return str
    .split(" ") // Split string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join the array of words back into a string
};

function Model({ item1, value1, value2, item2 }: props) {
  return (
    <>
      <tr className="flex flex-col md:flex-row print:flex-row">
        <td className="w-full border-collapse border-2 p-1 px-2 md:w-1/2 print:w-1/2">
          <span className="font-bold">{item1}: </span>
          <span className="pl-3">{capitalizeFirstLetter(value1)}</span>
        </td>
        <td className="w-full border-collapse border-2 p-1 px-2 md:w-1/2 print:w-1/2">
          <span className="font-bold">{item2}: </span>
          <span className="pl-3">{capitalizeFirstLetter(value2)}</span>
        </td>
      </tr>
    </>
  );
}

export default function SingleApplicationPageComponent() {
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Skeleton className="h-10 w-full" />
        </div>
      }
    >
      <SingleApplicationPage />
    </Suspense>
  );
}
