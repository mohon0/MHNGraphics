import { formatDistanceToNow } from 'date-fns';
import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
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

type UserTableProps = {
  users: UserProfile[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
};

export function UserTable({ users, onDelete, onStatusChange }: UserTableProps) {
  return (
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
          {users.map((item: UserProfile) => (
            <TableRow key={item.id} className='group'>
              <TableCell>
                <Link href={`/profile?id=${item.id}`}>
                  <Avatar className='h-10 w-10 border'>
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback className='bg-primary/10 text-sm font-medium text-primary'>
                      {item.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/profile?id=${item.id}`}
                  className='font-medium hover:text-primary'
                >
                  {item.name}
                </Link>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {item.status === 'ADMIN' ? (
                  <Badge>Admin</Badge>
                ) : (
                  <Select
                    defaultValue={item.status}
                    onValueChange={(value) => onStatusChange(item.id, value)}
                  >
                    <SelectTrigger className='h-8 w-[110px]'>
                      <SelectValue placeholder='Status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='USER'>User</SelectItem>
                      <SelectItem value='AUTHOR'>Author</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              <TableCell>
                <span className='text-sm text-muted-foreground'>
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex items-center justify-end gap-2'>
                  <TooltipProvider>
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
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive'
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className='sm:max-w-md'>
                            <DialogHeader>
                              <DialogTitle>Delete User</DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. It will delete
                                everything related to this user.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type='button' variant='secondary'>
                                  Cancel
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  type='button'
                                  variant='destructive'
                                  onClick={() => onDelete(item.id)}
                                >
                                  Delete
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TooltipTrigger>
                      <TooltipContent>Delete User</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
