import { NewProjectContent } from '@/features/project/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '프로젝트 생성',
  description:
    '프로젝트 생성 페이지입니다. 품앗이에서 프로젝트를 생성하고 공유하세요.',
};

export default function NewProjectPage() {
  return (
    <section className="flex flex-col items-center min-h-[calc(100vh-6rem)]">
      <h1 className="text-xl font-semibold mt-9">프로젝트 생성</h1>
      <NewProjectContent />
    </section>
  );
}
