import {
  ProjectDetailFallback,
  ProjectDetailFetcher,
} from '@/features/project/components';
import { getProject } from '@/features/project/services';
import { Metadata } from 'next';
import { cache, Suspense } from 'react';

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const getProjectData = cache(async (projectId: string) =>
  getProject(Number(projectId)),
);

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectData(id);

  return {
    title: project?.title,
    description: project?.introduction,
    openGraph: {
      title: project?.title,
      description: project?.introduction,
    },
    twitter: {
      card: 'summary_large_image',
      title: project?.title,
      description: project?.introduction,
      images: ['/opengraph-image.png'],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;

  return (
    <section className="pb-25">
      <Suspense fallback={<ProjectDetailFallback />}>
        {/* <ProjectDetailFallback /> */}
        <ProjectDetailFetcher id={id} />
      </Suspense>
    </section>
  );
}
