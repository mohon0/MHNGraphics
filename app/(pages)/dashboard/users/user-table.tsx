import { formatDistanceToNow } from 'date-fns';
import { Eye, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { UserProfile } from '@/utils/Interface';

// ---- Types ----

type UserStatus = 'USER' | 'AUTHOR' | 'MODERATOR' | 'ADMIN';

type UserTableProps = {
  users: UserProfile[];
  onDelete: (id: string) => Promise<void> | void;
  onStatusChange: (id: string, status: UserStatus) => void;
};

// ---- Status badge ----

const STATUS_CONFIG: Record<
  UserStatus,
  {
    label: string;
    variant: 'default' | 'secondary' | 'outline' | 'destructive';
  }
> = {
  ADMIN: { label: 'Admin', variant: 'default' },
  MODERATOR: { label: 'Moderator', variant: 'secondary' },
  AUTHOR: { label: 'Author', variant: 'outline' },
  USER: { label: 'User', variant: 'outline' },
};

function StatusBadge({ status }: { status: UserStatus }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.USER;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

// ---- Selectable statuses (non-admin roles) ----

const SELECTABLE_STATUSES: { value: UserStatus; label: string }[] = [
  { value: 'USER', label: 'User' },
  { value: 'AUTHOR', label: 'Author' },
  { value: 'MODERATOR', label: 'Moderator' },
];

// ---- Row component (isolates delete pending state per row) ----

function UserRow({
  item,
  onDelete,
  onStatusChange,
}: {
  item: UserProfile;
  onDelete: UserTableProps['onDelete'];
  onStatusChange: UserTableProps['onStatusChange'];
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const initials = item.name
    .split(' ')
    .map((n: string) => n[0])
    .join('');

  const isAdmin = item.status === 'ADMIN';

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await onDelete(item.id);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <TableRow className='group'>
      {/* Avatar */}
      <TableCell>
        <Link href={`/profile?id=${item.id}`}>
          <Avatar className='h-10 w-10 border'>
            <AvatarImage src={item.image} alt={item.name} />
            <AvatarFallback className='bg-primary/10 text-sm font-medium text-primary'>
              {initials}
            </AvatarFallback>
          </Avatar>
        </Link>
      </TableCell>

      {/* Name */}
      <TableCell>
        <Link
          href={`/profile?id=${item.id}`}
          className='font-medium hover:text-primary'
        >
          {item.name}
        </Link>
      </TableCell>

      {/* Email */}
      <TableCell className='text-muted-foreground'>{item.email}</TableCell>

      {/* Status */}
      <TableCell>
        {isAdmin ? (
          <StatusBadge status='ADMIN' />
        ) : (
          <Select
            defaultValue={item.status}
            onValueChange={(value) =>
              onStatusChange(item.id, value as UserStatus)
            }
          >
            <SelectTrigger className='h-8 w-[120px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              {SELECTABLE_STATUSES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </TableCell>

      {/* Created At */}
      <TableCell>
        <span className='text-sm text-muted-foreground'>
          {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell className='text-right'>
        <div className='flex items-center justify-end gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/profile?id=${item.id}`}
                className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20'
              >
                <Eye className='h-4 w-4' />
              </Link>
            </TooltipTrigger>
            <TooltipContent>View Profile</TooltipContent>
          </Tooltip>

          {/* Admins cannot be deleted */}
          {!isAdmin && (
            <Dialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Delete User</TooltipContent>
              </Tooltip>

              <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                  <DialogTitle>Delete {item.name}?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. All data associated with this
                    user will be permanently removed.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type='button' variant='secondary'>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type='button'
                    variant='destructive'
                    disabled={isDeleting}
                    onClick={handleDelete}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Deleting…
                      </>
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

// ---- Main table ----

export function UserTable({ users, onDelete, onStatusChange }: UserTableProps) {
  if (users.length === 0) {
    return (
      <Card className='flex items-center justify-center py-16 text-muted-foreground'>
        No users found.
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[80px]'>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((item) => (
              <UserRow
                key={item.id}
                item={item}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </TooltipProvider>
  );
}
