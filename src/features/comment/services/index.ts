import { CreateComment } from '../schemas';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createComment = async (
  projectId: number,
  commentData: CreateComment,
  token: string,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/projects/${projectId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to create comment:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while creating a comment');
  }
};

export const getComments = async (
  projectId: number,
  cursorTime: string | null,
  cursorId: number = 0,
  pageSize: number = 10,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/projects/${projectId}/comments?cursor-id=${cursorId}${cursorTime ? `&cursor-time=${cursorTime}` : ''}&page-size=${pageSize}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to get comments:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting comments');
  }
};

export const editComment = async (
  commentId: number,
  content: CreateComment,
  token: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to edit comment:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while editing a comment');
  }
};

export const deleteComment = async (commentId: number, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/comments/${commentId}`, {
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
    console.error('Failed to delete comment:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while deleting a comment');
  }
};
