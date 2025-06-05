import { NewProject } from '../schemas';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const checkProjectExists = async (token: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/members/teams/projects/existence`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to check project existence:', error);

    throw error instanceof Error
      ? error
      : new Error(
          'An unexpected error occurred while checking project existence',
        );
  }
};

export const createProject = async (
  newProjectData: NewProject,
  accessToken: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newProjectData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to create project:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while creating a project');
  }
};

export const editProject = async (
  projectId: number,
  projectData: NewProject,
  accessToken: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to edit project:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while editing a project');
  }
};

export const deleteProject = async (projectId: number, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to delete project:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while deleting a project');
  }
};

export const getProject = async (projectId: number) => {
  if (typeof projectId !== 'number' || isNaN(projectId)) return undefined;

  try {
    const response = await fetch(`${BASE_URL}/api/projects/${projectId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }

      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to get project:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting a project');
  }
};

export const getTeamMembers = async (teamId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/teams/${teamId}/members`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to get team members:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting team members');
  }
};

export const getSnapshot = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/projects/snapshot`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to get snapshot:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting snapshot');
  }
};

export const getRankedProjects = async (
  contextId: number,
  cursorId: number = 0,
  pageSize: number = 10,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/projects?sort=rank&context-id=${contextId}&cursor-id=${cursorId}&page-size=${pageSize}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to get projects:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting projects');
  }
};

export const getLatestProjects = async (
  cursorTime: string | null,
  cursorId: number = 0,
  pageSize: number = 10,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/projects?sort=latest${cursorTime ? `&cursor-time=${cursorTime}` : ''}&cursor-id=${cursorId}&page-size=${pageSize}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to get projects:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting projects');
  }
};

export const givePumati = async ({
  token,
  teamId,
}: {
  token: string;
  teamId: number;
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/teams/${teamId}/gived-pumati`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to give pumati:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while giving pumati');
  }
};

export const receivePumati = async ({
  token,
  teamId,
}: {
  token: string;
  teamId: number;
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/teams/${teamId}/received-pumati`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to give pumati:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while receiving pumati');
  }
};
