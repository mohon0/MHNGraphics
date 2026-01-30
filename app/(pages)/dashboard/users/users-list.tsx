'use client';
import { useSearchParams } from 'next/navigation';
import type React from 'react';
import { useCallback, useState } from 'react';
import {
  useDeleteUser,
  useUserList,
  useUserStatusUpdate,
} from '@/services/admin';
import type { UserProfile } from '@/utils/Interface';
import { EmptyState } from './empty-state';
import Pagination from './Pagination';
import { SearchHeader } from './search-header';
import TableSkeleton from './TableSkeleton';
import { UserCard } from './user-card';
import { UserTable } from './user-table';

export function UsersList() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { isLoading, data, isError, refetch } = useUserList({
    page,
    searchQuery,
  });

  const deleteUser = useDeleteUser();
  const updateStatus = useUserStatusUpdate();

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  const handleDelete = (id: string) => {
    deleteUser.mutate({ id });
  };

  const handleStatusChange = (id: string, status: string) => {
    return updateStatus.mutateAsync({ id, status });
  };

  return (
    <div>
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onRefetch={refetch}
        isLoading={isLoading}
      />

      {isLoading ? (
        <TableSkeleton rowCount={10} />
      ) : isError ? (
        <EmptyState message='Something went wrong while fetching the users.' />
      ) : !data?.data || data.data.length === 0 ? (
        <EmptyState message='No users available.' />
      ) : (
        <>
          {/* Mobile View */}
          <div className='grid gap-4 md:hidden'>
            {data.data.map((item: UserProfile) => (
              <UserCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>

          {/* Desktop View */}
          <div className='hidden md:block'>
            <UserTable
              users={data.data}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </div>
        </>
      )}

      {data?.meta && data.meta.totalPages > 1 && (
        <div className='mt-8 flex justify-center'>
          <Pagination
            totalPages={data.meta.totalPages}
            currentPage={page}
            query={searchQuery}
          />
        </div>
      )}
    </div>
  );
}
