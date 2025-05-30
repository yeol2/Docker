import { useMutation } from '@tanstack/react-query';
import { receivePumati } from '../services';

export function useReceivePumati() {
  return useMutation({
    mutationFn: receivePumati,
  });
}
