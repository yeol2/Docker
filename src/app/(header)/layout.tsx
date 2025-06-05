import { Header } from '@/components';
import { AuthProvider } from '@/features/auth/components';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Header />
      <div className="px-6 min-h-[calc(100vh-4rem)] h-full">{children}</div>
    </AuthProvider>
  );
}
