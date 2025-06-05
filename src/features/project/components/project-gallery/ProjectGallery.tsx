import { ProjectItem } from '../../schemas';
import { CardItem } from '../card-item';
import { Carousel } from '../carousel';

type ProjectGalleryProps = {
  projects: ProjectItem[];
};

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  return (
    <section className="flex flex-col gap-4 mx-auto my-10 max-w-[25rem] w-full">
      <div className="text-center">
        <h2 className="text-lg font-semibold">작은 아이디어가 현실로!</h2>
        <p className="text-sm text-dark-grey">
          교육생들의 프로젝트를 구경해보세요.
        </p>
      </div>
      <div className="mb-4">
        <Carousel pagination={false}>
          {projects.map((project) => (
            <CardItem key={project.id} project={project} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
