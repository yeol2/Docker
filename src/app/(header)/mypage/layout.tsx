import { AUTH_PATH } from '@/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    redirect(AUTH_PATH.LOGIN);
  }
  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-[25rem]">
        {children}
      </div>
    </section>
  );
}
