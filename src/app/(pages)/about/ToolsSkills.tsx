import Skills from "./Skills";
import Tools from "./Tools";

export default function ToolsSkills() {
  return (
    <div className="mx-4 mt-20 space-y-16 md:mx-10">
      <p className="text-center text-4xl font-bold md:text-6xl">
        Tools & Skills
      </p>
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
        <Tools />
        <Skills />
      </div>
    </div>
  );
}
