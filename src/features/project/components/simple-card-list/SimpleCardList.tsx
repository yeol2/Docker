import { ProjectItem } from '../../schemas';
import { SimpleCardItem } from '../simple-card-item';

type SimpleCardListProps = {
  projects: ProjectItem[];
};

export function SimpleCardList({ projects }: SimpleCardListProps) {
  return (
    <ul className="flex flex-col gap-5">
      {projects.map((project, index) => (
        <SimpleCardItem key={project.id} project={project} rank={index + 1} />
      ))}
    </ul>
  );
}
