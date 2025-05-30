'use client';

import { USER_QUERY_KEY } from '@/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Attendance } from '../schemas';
import { checkAttendance } from '../services';

export function useCheckAttendance() {
  const queryClient = useQueryClient();

  return useMutation<Attendance, Error, string>({
    mutationFn: checkAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.ATTENDANCE_STATE,
      });
    },
  });
}
