import { LoginProvider, NonTraineeSignupData, SignupData } from '../schemas';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginWithProvider = async (provider: LoginProvider) => {
  window.location.href = `${BASE_URL}/api/oauth/${provider}/redirection`;
};

export const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/tokens`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to logout:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while logging out');
  }
};

export const getMe = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/members/me`, {
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
    console.error('Failed to get me:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while fetching me');
  }
};

export const getTeamList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/teams`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to fetch team list:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while fetching team list');
  }
};

export const signup = async (signupData: SignupData | NonTraineeSignupData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/members/social`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to signup:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while signing up');
  }
};

export const refresh = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/tokens`, {
      method: 'PUT',
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json();

        return data.message;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to refresh:', error);

    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while refreshing');
  }
};
