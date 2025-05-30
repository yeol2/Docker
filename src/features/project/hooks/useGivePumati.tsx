import { useMutation } from '@tanstack/react-query';
import { givePumati } from '../services';

export function useGivePumati() {
  return useMutation({
    mutationFn: givePumati,
  });
}
