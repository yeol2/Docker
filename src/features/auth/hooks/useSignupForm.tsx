import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupForm, signupFormSchema } from '../schemas';

export function useSignupForm() {
  const methods = useForm<SignupForm>({
    defaultValues: {
      profileImageUrl: undefined,
      name: '',
      nickname: '',
      code: '',
      term: undefined,
      teamNumber: undefined,
      course: undefined,
    },
    resolver: zodResolver(signupFormSchema),
  });

  return methods;
}
