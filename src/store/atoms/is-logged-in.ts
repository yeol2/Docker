import { atom } from 'jotai';
import { accessTokenAtom } from './access-token';
import { authAtom } from './user';

export const isLoggedInAtom = atom((get) => {
  const auth = get(authAtom);
  const accessToken = get(accessTokenAtom);

  return Boolean(auth && accessToken);
});
