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
          죄송합니다. 현재 페이지를 찾을 수 없습니다.
        </p>
        <p className="text-dark-grey">
          페이지의 주소가 잘못 입력되었거나,
          <br />
          요청하신 페이지의 주소가 변경 또는 삭제되어 찾을 수 없습니다.
        </p>
      </div>
      <NotFoundButtons />
    </div>
  );
}
