import { EditForm } from '@/features/project/components';
import { getProject } from '@/features/project/services';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type ProjectEditPageProps = {
  params: Promise<{ id: string }>;
};

const getProjectData = cache(async (projectId: string) =>
  getProject(Number(projectId)),
);

export async function generateMetadata({
  params,
}: ProjectEditPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectData(id);

  return {
    title: project ? `${project.title} 수정` : '프로젝트 수정',
    description: project?.introduction,
  };
}

export default async function ProjectEditPage({
  params,
}: ProjectEditPageProps) {
  const { id } = await params;
  const project = await getProjectData(id);

  if (!project) {
    notFound();
  }
  return (
    <section className="flex flex-col items-center min-h-[calc(100vh-6rem)]">
      <h1 className="text-xl font-semibold mt-9">프로젝트 수정</h1>
      <EditForm project={project} />
    </section>
  );
}
