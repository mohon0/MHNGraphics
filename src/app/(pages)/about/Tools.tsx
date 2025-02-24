import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import img2 from "@/images/tools/adobe-after-effects.svg";
import img1 from "@/images/tools/adobe-illustrator.svg";
import img4 from "@/images/tools/adobe-lightroom.svg";
import img5 from "@/images/tools/adobe-photoshop.svg";
import img3 from "@/images/tools/adobe.svg";
import Image from "next/image";

// Define tool names along with the images for tooltip display
const tools = [
  { img: img1, name: "Illustrator" },
  { img: img2, name: "AfterEffects" },
  { img: img3, name: "AdobeXd" },
  { img: img4, name: "LightRoom" },
  { img: img5, name: "PhotoShop" },
];

export default function Tools() {
  return (
    <div className="flex h-fit flex-wrap items-center justify-center gap-16">
      {tools.map(({ img, name }, index) => (
        <div key={index} className="h-20 w-20 md:h-32 md:w-32">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  src={img}
                  alt={name}
                  className="h-full w-full object-contain"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  );
}
