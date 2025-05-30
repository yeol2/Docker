'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  AuthData,
  UserProfileEditForm,
  userProfileEditFormSchema,
} from '../schemas';

export function useUserProfileEditForm(authData: AuthData | null) {
  const { name, nickname, profileImageUrl, teamNumber, course, term } =
    authData || {
      name: '',
      nickname: '',
      profileImageUrl: undefined,
      teamNumber: undefined,
      course: undefined,
      term: undefined,
    };

  return useForm<UserProfileEditForm>({
    defaultValues: {
      name,
      nickname,
      profileImageUrl: {
        url: profileImageUrl,
      },
      term: term ?? undefined,
      teamNumber: teamNumber ?? undefined,
      course: course ?? undefined,
    },
    resolver: zodResolver(userProfileEditFormSchema),
  });
}
