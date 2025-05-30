'use client';

import { AUTH_QUERY_KEY } from '@/constants/query-key';
import { getTeamList } from '@/features/auth/services';
import { useSuspenseQuery } from '@tanstack/react-query';
import { TeamList } from '../schemas/signup';

export function useTeamList() {
  return useSuspenseQuery<TeamList>({
    queryKey: AUTH_QUERY_KEY.TEAM_LIST,
    queryFn: getTeamList,
  });
}
