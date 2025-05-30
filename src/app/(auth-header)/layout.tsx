import { ROOT_PATH } from '@/constants';
import { AuthHeader } from '@/features/auth/components';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (refreshToken) {
    redirect(ROOT_PATH);
  }
  return (
    <>
      <AuthHeader />
      <div className="px-6 min-h-[calc(100vh-4rem)] h-full">{children}</div>
    </>
  );
}
