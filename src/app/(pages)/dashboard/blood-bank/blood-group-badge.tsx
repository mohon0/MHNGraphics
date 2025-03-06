import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BloodGroupBadgeProps {
  group: string;
  className?: string;
}

export function BloodGroupBadge({ group, className }: BloodGroupBadgeProps) {
  const getColorByBloodGroup = (group: string) => {
    const colors: Record<string, string> = {
      "A+": "bg-red-100 text-red-800 border-red-200",
      "A-": "bg-red-50 text-red-700 border-red-100",
      "B+": "bg-blue-100 text-blue-800 border-blue-200",
      "B-": "bg-blue-50 text-blue-700 border-blue-100",
      "AB+": "bg-purple-100 text-purple-800 border-purple-200",
      "AB-": "bg-purple-50 text-purple-700 border-purple-100",
      "O+": "bg-green-100 text-green-800 border-green-200",
      "O-": "bg-green-50 text-green-700 border-green-100",
    };

    return colors[group] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <Badge
      variant="outline"
      className={cn("font-bold", getColorByBloodGroup(group), className)}
    >
      {group}
    </Badge>
  );
}
