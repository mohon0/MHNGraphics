import { UserCog, UsersIcon } from "lucide-react";

type EmptyStateProps = {
  message: string;
  icon?: "users" | "access";
};

export function EmptyState({ message, icon = "users" }: EmptyStateProps) {
  return (
    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      {icon === "users" ? (
        <UsersIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
      ) : (
        <UserCog className="mb-4 h-12 w-12 text-muted-foreground/50" />
      )}
      <p className="text-xl font-medium text-muted-foreground">{message}</p>
    </div>
  );
}

export function AccessDenied() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <UserCog className="mb-4 h-16 w-16 text-muted-foreground/50" />
      <h2 className="mb-2 text-2xl font-bold">Access Denied</h2>
      <p className="text-muted-foreground">
        You are not authorized to view this page.
      </p>
    </div>
  );
}
