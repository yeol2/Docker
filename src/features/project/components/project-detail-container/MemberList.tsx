import { TeamMember } from '../../schemas';
import { getTeamMembers } from '../../services';
import { MemberItem } from './MemberItem';

type MemberListProps = {
  teamId: number;
};

export async function MemberList({ teamId }: MemberListProps) {
  const teamMembers: TeamMember[] = await getTeamMembers(teamId);

  return (
    <section>
      <h2 className="text-lg font-semibold mt-16 mb-4">
        이 프로젝트를 만든 팀이에요
      </h2>
      <ul className="flex flex-col">
        {teamMembers.map((member) => (
          <MemberItem key={member.id} member={member} />
        ))}
      </ul>
    </section>
  );
}
