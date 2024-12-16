import ScrollNotice from "../ScrollNotice";
import ApplicationHeader from "./ApplicationHeader";
import { StudentApplicationForm } from "./StudentApplication";

export default function page() {
  return (
    <div className="mt-10">
      <ScrollNotice />
      <ApplicationHeader />
      <StudentApplicationForm />
    </div>
  );
}
