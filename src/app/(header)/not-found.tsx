import { SmallIcon } from '@/components/icons/SmallIcon';
import { NotFoundButtons } from '@/components/not-found-buttons';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 text-center p-6">
      <div className="relative">
        <SmallIcon
          width={40}
          height={40}
          className="absolute -top-4 left-0 right-0 mx-auto"
        />
        <h1 className="text-8xl font-bold">404</h1>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-blue">
          죄송합니다. 요청하신 프로젝트를 찾을 수 없습니다.
        </p>
        <p className="text-dark-grey">
          입력하신 프로젝트 ID가 올바르지 않거나,
          <br />
          해당 프로젝트가 삭제되었을 수 있습니다.
        </p>
      </div>
      <NotFoundButtons />
    </div>
  );
}
