import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEYS } from '@/constant/QueryKeys';
import { useDebounce } from '@/hooks/useDebounce';

export function useProfile(id: string, take: number, skip: number) {
  return useQuery({
    queryKey: ['profile', id, take],
    queryFn: async () => {
      const response = await axios(
        `/api/profile?id=${id}&take=${take}&skip=${skip}`,
      );
      return response.data;
    },
    enabled: !!id,
  });
}
export function useProfileDesign({
  id,
  take,
  page,
  sort,
  category,
  search,
}: {
  id: string;
  take: number;
  page: number;
  sort: string;
  category: string;
  search: string;
}) {
  const debouncedSearchQuery = useDebounce(search, 300);
  return useQuery({
    queryKey: [
      QUERY_KEYS.PROFILE_DESIGN,
      id,
      page,
      sort,
      category,
      debouncedSearchQuery,
    ],
    queryFn: async () => {
      const response = await axios(
        `/api/profile/user-design?id=${id}&take=${take}&page=${page}&sort=${sort}&category=${category}&search=${search}`,
      );
      return response.data;
    },
  });
}

export function useEditProfileInfo() {
  return useQuery({
    queryKey: ['Edit Profile'],
    queryFn: async () => {
      const response = await axios(`/api/editprofile`);
      return response.data;
    },
  });
}
