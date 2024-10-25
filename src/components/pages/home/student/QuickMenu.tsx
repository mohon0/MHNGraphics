import { FaEdit } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { GrAnnounce } from "react-icons/gr";

export default function QuickMenu() {
  return (
    <div>
      <p className="mb-8 text-center text-4xl font-bold">Quick Menu</p>
      <div className="flex justify-between gap-4 rounded-lg border border-primary p-4">
        <div className="white-bg dark:dark-bg flex h-24 w-24 flex-col items-center justify-center gap-4 rounded p-4 md:h-32 md:w-32">
          <GrAnnounce />
          <p>Notice</p>
        </div>
        <div className="white-bg dark:dark-bg flex h-24 w-24 flex-col items-center justify-center gap-4 rounded p-4 md:h-32 md:w-32">
          <FaRegShareFromSquare />
          <p>Result</p>
        </div>
        <div className="white-bg dark:dark-bg flex h-24 w-24 flex-col items-center justify-center gap-4 rounded p-4 md:h-32 md:w-32">
          <FaEdit />
          <p>Apply</p>
        </div>
      </div>
    </div>
  );
}
