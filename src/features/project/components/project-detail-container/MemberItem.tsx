import { COURSE } from '@/constants';
import Image from 'next/image';
import { TeamMember } from '../../schemas';

type MemberItemProps = {
  member: TeamMember;
};

export function MemberItem({ member }: MemberItemProps) {
  const { id, profileImageUrl, nickname, name, course } = member;
  return (
    <li
      key={id}
      className="flex items-center gap-4 py-3 mx-1 border-b border-light-grey"
    >
      <div className="relative w-13 h-13 shrink-0">
        <Image
          src={profileImageUrl}
          alt={name}
          fill
          sizes="100%"
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <p className="font-medium">
          {nickname}({name})
        </p>
        <p className="text-sm text-grey">{COURSE[course]}</p>
      </div>
    </li>
  );
}
