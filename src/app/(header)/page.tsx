import { METADATA } from '@/constants';
import {
  LatestProjects,
  LatestProjectsFallback,
  RankedProjects,
  RankedProjectsFallback,
} from '@/features/project/components';
import { Attendance } from '@/features/user/components/attendance';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = METADATA.ROOT;

export default function HomePage() {
  return (
    <section className="flex flex-col gap-4 pb-15">
      <Suspense fallback={<RankedProjectsFallback />}>
        <RankedProjects />
      </Suspense>
      <Attendance />
      <Suspense fallback={<LatestProjectsFallback />}>
        <LatestProjects />
      </Suspense>
    </section>
  );
}
