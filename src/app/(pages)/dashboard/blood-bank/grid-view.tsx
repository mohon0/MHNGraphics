import { Donor } from "@/utils/Interface";
import { DonorCard } from "./donor-card";

interface GridViewProps {
  donors: Donor[];
  onDelete: (id: string) => Promise<void>;
  isDeleting?: boolean;
}

export function GridView({
  donors,
  onDelete,
  isDeleting = false,
}: GridViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {donors.map((donor) => (
        <DonorCard
          key={donor.id}
          donor={donor}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}
