import { LogoIcon } from '@/components/icons';
import { METADATA } from '@/constants';
import { LoginButton } from '@/features/auth/components';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = METADATA.LOGIN;

export default function LoginPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-20 h-[calc(100vh-4rem)]">
      <h1>
        <Link href="/">
          <LogoIcon width={120} />
        </Link>
      </h1>
      <LoginButton />
    </section>
  );
}
