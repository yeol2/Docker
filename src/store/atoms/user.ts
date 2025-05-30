import { AuthData } from '@/features/user/schemas';
import { atom } from 'jotai';

export const authAtom = atom<AuthData | null>(null);
