import { SkeletonBox } from '@/components';

export function ProjectDetailFallback() {
  return (
    <div className="flex flex-col gap-1">
      <div className="max-w-[25rem] w-full mx-auto animate-pulse">
        <SkeletonBox className="aspect-[16/9] max-h-[300px] rounded-none mt-6" />
        <div className="flex flex-col gap-4 mt-4">
          <SkeletonBox className="h-8" />
          <div className="flex flex-col gap-1">
            <SkeletonBox className="h-5" />
            <SkeletonBox className="h-5 w-3/4" />
            <SkeletonBox className="h-[50px] px-6 py-3 mt-2" />
          </div>
          <ul className="flex gap-2 mt-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <SkeletonBox className="w-16 h-8 rounded-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4 max-w-[25rem] w-full mx-auto mt-16 mb-10">
        <h2 className="text-lg font-semibold">프로젝트 상세 설명</h2>
        <SkeletonBox className="h-64 animate-pulse" />
      </div>
      <div className="flex flex-col gap-4 max-w-[25rem] w-full mx-auto">
        <h2 className="text-lg font-semibold mt-16 mb-4">
          이 프로젝트를 만든 팀이에요
        </h2>
        <ul className="flex flex-col animate-pulse">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index} className="flex gap-4 py-3 mx-1">
              <SkeletonBox className="w-13 h-13 rounded-full" />
              <div className="flex flex-col gap-2 w-1/2">
                <SkeletonBox className="h-6 rounded-full" />
                <SkeletonBox className="h-5 w-1/2" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-w-[25rem] w-full mx-auto">
        <p className="text-lg font-semibold mt-16 mb-4">대시보드</p>
        <SkeletonBox className="h-36 animate-pulse" />
      </div>
    </div>
  );
}
