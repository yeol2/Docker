import { UserProfileEditData } from '../schemas';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const checkAttendance = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/attendances`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check attendance');
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error(error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while checking attendance');
  }
};

export const getAttendanceState = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/attendances`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get attendance state');
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error(error);

    throw error instanceof Error
      ? error
      : new Error(
          'An unexpected error occurred while getting attendance state',
        );
  }
};

export const getDashboard = async (teamId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/teams/${teamId}`);

    if (!response.ok) {
      throw new Error('Failed to get dashboard');
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error(error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting dashboard');
  }
};

export const editUserProfile = async (
  token: string,
  userData: UserProfileEditData,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/members/me`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to edit user profile');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while editing user profile');
  }
};

export const withdraw = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/members/me`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to withdraw');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while withdrawing');
  }
};
