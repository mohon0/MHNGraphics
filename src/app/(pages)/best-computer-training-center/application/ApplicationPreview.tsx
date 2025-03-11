import type { SingleApplicationType } from "@/components/interface/ApplicationType";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logo from "@/images/hero/logo3.png";
import { format } from "date-fns";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { InfoRow } from "./Model";

export default function Preview() {
  const { watch } = useFormContext<SingleApplicationType>();
  const values = watch();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full shadow-lg">
          Preview Application
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Application Preview</DialogTitle>
        </DialogHeader>
        <div className="h-[29rem] overflow-y-scroll">
          <div>
            {/* Header */}
            <div className="flex flex-col items-center justify-center gap-6 bg-cyan-500 px-2 py-2 md:flex-row md:px-10 md:py-8 print:flex print:flex-row print:px-10 print:py-4">
              <div className="w-4/12 md:w-2/12 print:w-2/12">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Best Computer Training Center Logo"
                />
              </div>
              <div className="flex w-11/12 flex-col items-center justify-center text-center md:w-8/12 print:w-8/12">
                <h1 className="text-center text-3xl font-bold text-black">
                  Best Computer Training Center
                </h1>
                <p className="text-gray-900">
                  Rofi Tower, 4th Floor, Paira chattor, Jhenaidah
                </p>
                <p className="text-gray-900">
                  <span className="font-bold">Mobile: </span> 01989491248
                </p>
                <p className="text-gray-900">
                  <span className="font-bold">Email: </span>{" "}
                  bestcomputer.jhenaidah@gmail.com
                </p>
              </div>
              <div className="border md:w-2/12 print:w-2/12">
                <div className="flex h-32 w-full items-center justify-center text-black md:h-48 print:h-32">
                  Image preview not available
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="mt-2 h-0.5 w-full bg-black"></div>

            {/* Admission Form Header */}
            <div className="flex items-center justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="mx-auto my-6 bg-cyan-700 text-xl font-bold text-white hover:bg-cyan-800"
              >
                Admission Form
              </Button>
            </div>

            {/* Student Information */}
            <div className="flex flex-col print:mx-10 print:text-black">
              <table className="w-full border-collapse">
                <tbody>
                  <InfoRow
                    item1="Student Name"
                    item2="Session"
                    value1={values.studentName}
                    value2={values.session}
                  />
                  <InfoRow
                    item1="Father Name"
                    item2="Mother Name"
                    value1={values.fatherName}
                    value2={values.motherName}
                  />
                  <InfoRow
                    item1="Father's Occupation"
                    item2="Marital Status"
                    value1={values.fatherOccupation}
                    value2={values.maritalStatus}
                  />
                  <tr className="flex flex-col md:flex-row print:flex-row">
                    <td className="w-full border p-1 px-2 md:w-1/2 print:w-1/2">
                      <span className="font-bold">Date Of Birth: </span>
                      <span className="pl-3">
                        {values.birthDay
                          ? format(new Date(values.birthDay), "do MMMM yyyy")
                          : ""}
                      </span>
                    </td>
                    <td className="w-full border p-1 px-2 md:w-1/2 print:w-1/2">
                      <span className="font-bold">Blood Group: </span>
                      <span className="pl-3">{values.bloodGroup}</span>
                    </td>
                  </tr>
                  <InfoRow
                    item1="Mobile Number"
                    item2="Guardian Number"
                    value1={values.mobileNumber}
                    value2={values.guardianNumber}
                  />
                  <InfoRow
                    item1="Gender"
                    item2="Religion"
                    value1={values.gender}
                    value2={values.religion}
                  />
                  <InfoRow
                    item1="Full Address"
                    item2="District"
                    value1={values.fullAddress}
                    value2={values.district}
                  />
                  <tr className="flex flex-col md:flex-row print:flex-row">
                    <td className="w-full border p-1 px-2 md:w-1/2 print:w-1/2">
                      <span className="font-bold">Email Address: </span>
                      <span className="pl-3">{values.email}</span>
                    </td>
                    <td className="w-full border p-1 px-2 md:w-1/2 print:w-1/2">
                      <span className="font-bold">Has Computer: </span>
                      <span className="pl-3">{values.pc}</span>
                    </td>
                  </tr>
                  <InfoRow
                    item1="Course Name"
                    item2="Duration"
                    value1={values.course}
                    value2={values.duration}
                  />
                  <InfoRow
                    item1="Transaction Id"
                    item2="Nationality"
                    value1={values.trxId}
                    value2={values.nationality}
                  />
                </tbody>
              </table>
            </div>

            {/* Signatures Section */}
            <div className="mt-24 hidden justify-between font-bold md:mx-12 md:flex lg:mx-10 print:mt-16 print:flex print:text-black">
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

            {/* Terms and Conditions */}
            <div className="mt-3 border p-2 text-sm md:mx-10 print:mx-10 print:text-black">
              <p>
                আমি এতদ্বারা অঙ্গীকার করিতেছি যে, আমি প্রতিষ্ঠানের নিয়ম অনুযায়ী
                আমার সন্তান/পোষ্য, এর যাবতীয় ব্যয়ভার এবং আমার সন্তান/পোষ্য
                প্রতিষ্ঠানের এর নিয়ম শৃঙ্খলা ভঙ্গ করিলে বা অন্য কোনো কারণে
                প্রতিষ্ঠানের জন্য ক্ষতিকর বিবেচিত হইলে কতৃপক্ষের যে কোন সিধান্ত
                মানিয়া লইতে বাধ্য থাকিব।
              </p>
            </div>

            {/* Required Documents and Guardian Signature */}
            <div className="flex flex-col items-end justify-between gap-8 md:mx-10 md:flex-row md:gap-0 print:mx-10 print:flex-row print:gap-0">
              <div className="mt-2 w-fit border p-2 text-sm print:text-black">
                <p className="font-bold underline">
                  ভর্তির জন্য প্রয়োজনীয় কাগজ পত্র ও শর্তাবলীঃ
                </p>
                <p>১. পাসপোর্ট সাইজের ২ কপি রঙিন ছবি</p>
                <p>২. এস.এস.সি/জে.এস.সি মার্কশীটের ফটোকপি (যে কোন একটা)</p>
                <p>৩. এন.আই.ডি/জন্ম নিবন্ধনের ফটোকপি (যে কোন একটা)</p>
                <p>
                  ৪. ভর্তি হওয়ার পর, পরবর্তীতে ভর্তি বাতিল করতে চাইলে সে <br />{" "}
                  ক্ষেত্র কোন টাকা ফেরত দেওয়া হবে না।
                </p>
              </div>
              <div className="print:text-black">
                <div className="h-0.5 w-40 bg-cyan-700"></div>
                <div>Guardian Signature</div>
                <div>Date:</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
