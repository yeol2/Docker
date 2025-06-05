import Image from 'next/image';
import { Comments } from '../../../comment/components/comments/Comments';
import { ProjectDetail } from '../../schemas';
import { Carousel } from '../carousel';
import { Dashboard } from './Dashboard';
import { Description } from './Description';
import { MemberList } from './MemberList';

type ProjectDetailContainerProps = {
  project: ProjectDetail;
};

export function ProjectDetailContainer({
  project,
}: ProjectDetailContainerProps) {
  const {
    id,
    images,
    title,
    modifiedAt,
    term,
    teamId,
    teamNumber,
    introduction,
    deploymentUrl,
    detailedDescription,
    tags,
    givedPumatiCount,
    receivedPumatiCount,
    teamRank,
  } = project;

  return (
    <div className="flex flex-col gap-1">
      <div className="max-w-[25rem] w-full mx-auto">
        <Carousel>
          {images.map(({ id, url }) => (
            <div
              key={id}
              className="relative w-full aspect-[16/9] max-h-[300px] overflow-hidden bg-blue-white"
            >
              <Image
                src={url}
                alt="프로젝트 이미지"
                fill
                sizes="100%"
                className="object-contain group-hover:scale-105 transition-all duration-300"
                priority
              />
            </div>
          ))}
        </Carousel>
        <Description
          id={id}
          teamId={teamId}
          teamNumber={teamNumber}
          title={title}
          modifiedAt={modifiedAt}
          term={term}
          introduction={introduction}
          deploymentUrl={deploymentUrl}
          detailedDescription={detailedDescription}
          tags={tags}
        />
        <MemberList teamId={teamId} />
      </div>
      <div className="xs:py-10 xs:px-2 my-20 xs:my-10 bg-blue-white">
        <Dashboard
          givedPumatiCount={givedPumatiCount}
          receivedPumatiCount={receivedPumatiCount}
          teamRank={teamRank}
        />
      </div>
      <div className="max-w-[25rem] w-full mx-auto">
        <Comments projectId={id} />
      </div>
    </div>
  );
}
