import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge'; // Ensure Badge is imported

type QuizStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';

interface StatusConfig {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

const statusConfig: Record<QuizStatus, StatusConfig> = {
  DRAFT: {
    label: 'Draft',
    variant: 'outline',
    className: 'text-muted-foreground border-border hover:bg-secondary',
  },
  PUBLISHED: {
    label: 'Published',
    variant: 'default',
    className: 'bg-primary text-primary-foreground border-0',
  },
  SCHEDULED: {
    label: 'Scheduled',
    variant: 'secondary',
    className: 'bg-accent/10 text-accent border-accent/20',
  },
  ARCHIVED: {
    label: 'Archived',
    variant: 'destructive',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

interface StatusBadgeProps {
  status: QuizStatus;
}

export function StatusBadge({ status }: StatusBadgeProps): JSX.Element {
  const config = statusConfig[status];
  return (
    <Badge
      variant={config.variant}
      className={`font-medium text-xs ${config.className || ''}`}
    >
      {config.label}
    </Badge>
  );
}
