import { Auth } from '@/features/auth/schemas';
import { atom } from 'jotai';

export const authAtom = atom<Auth | null>(null);
