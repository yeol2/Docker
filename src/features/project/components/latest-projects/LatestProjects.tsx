import { getLatestProjects } from '../../services';
import { ProjectGallery } from '../project-gallery';

export async function LatestProjects() {
  const { data: projects } = await getLatestProjects(null, 0);

  return <ProjectGallery projects={projects} />;
}
