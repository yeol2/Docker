import { USER_QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../services';

export function useDashboard(teamId?: number | null) {
  return useQuery({
    queryKey: USER_QUERY_KEY.DASHBOARD(teamId!),
    queryFn: () => getDashboard(teamId!),
    enabled: !!teamId,
  });
}
