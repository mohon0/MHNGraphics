import { DropletIcon, UserIcon } from "lucide-react";

interface EmptyStateProps {
  message: string;
  type?: "empty" | "error" | "access";
}

export function EmptyState({ message, type = "empty" }: EmptyStateProps) {
  const icons = {
    empty: <DropletIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />,
    error: <DropletIcon className="mb-4 h-12 w-12 text-destructive/50" />,
    access: <UserIcon className="mb-4 h-16 w-16 text-muted-foreground/50" />,
  };

  const titles = {
    empty: "",
    error: "Error",
    access: "Access Denied",
  };

  return (
    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      {icons[type]}
      {type === "access" && (
        <h2 className="mb-2 text-2xl font-bold">{titles[type]}</h2>
      )}
      <p className="text-xl font-medium text-muted-foreground">{message}</p>
    </div>
  );
}

export function AccessDenied() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
      <UserIcon className="mb-4 h-16 w-16 text-muted-foreground/50" />
      <h2 className="mb-2 text-2xl font-bold">Access Denied</h2>
      <p className="text-muted-foreground">
        You don&#39;t have permission to access this page.
      </p>
    </div>
  );
}
