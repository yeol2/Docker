import { getRankedProjects, getSnapshot } from '../../services';
import { SimpleProjects } from '../simple-projects';

export async function RankedProjects() {
  const { id } = await getSnapshot();

  const { data: projects } = await getRankedProjects(id, 0, 3);

  return <SimpleProjects projects={projects} />;
}
