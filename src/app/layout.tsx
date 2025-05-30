import { pretendard } from '@/assets/fonts';
import { METADATA } from '@/constants';
import { Providers } from '@/providers';
import { cn } from '@/utils/style';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = METADATA.ROOT_LAYOUT;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          pretendard.className,
          'min-h-screen w-full bg-blue-white',
        )}
      >
        <Providers>
          <main className="relative mx-auto min-w-[375px] max-w-[600px] w-full min-h-screen bg-white shadow-md">
            {children}
          </main>
          <div id="modal-portal" />
        </Providers>
      </body>
    </html>
  );
}
