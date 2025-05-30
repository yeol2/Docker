import { UserProfileEditForm } from '@/features/user/components';

export default function UserProfileEditPage() {
  return (
    <>
      <h1 className="text-xl font-semibold my-9">회원정보 수정</h1>
      <div className="mb-12 w-full">
        <UserProfileEditForm />
      </div>
    </>
  );
}
