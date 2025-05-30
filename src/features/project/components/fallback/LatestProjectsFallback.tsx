import { SkeletonBox } from '@/components';

export function LatestProjectsFallback() {
  return (
    <section className="flex flex-col gap-4 mx-auto my-10 max-w-[25rem] w-full">
      <div className="text-center">
        <h2 className="text-lg font-semibold">작은 아이디어가 현실로!</h2>
        <p className="text-sm text-dark-grey">
          교육생들의 프로젝트를 구경해보세요.
        </p>
      </div>
      <div className="mb-4 mt-6">
        <div className="flex flex-col rounded-lg h-fit bg-light-grey overflow-hidden">
          <SkeletonBox className="aspect-[16/9]" />
          <div className="px-4 pt-2 pb-4">
            <SkeletonBox className="h-7" />
            <SkeletonBox className="mt-1 h-6" />
            <ul className="flex gap-2 mt-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index}>
                  <SkeletonBox className="w-16 h-8 rounded-full" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
