import { SkeletonBox } from '@/components';

export function ProjectsFallback() {
  return (
    <>
      <div className="flex justify-between items-center w-full bg-light-grey rounded-md px-4 py-3">
        <p className="font-semibold text-sm xs:text-base">
          프로젝트를 생성해보세요!
        </p>
        <div className="inline-flex items-center justify-center w-28 h-10 px-3 bg-blue rounded-lg text-white font-medium">
          <p>생성하기</p>
        </div>
      </div>
      <div className="w-full pb-20 animate-pulse">
        <ul className="flex flex-col gap-5 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="flex flex-col rounded-lg h-fit bg-light-grey overflow-hidden"
            >
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
