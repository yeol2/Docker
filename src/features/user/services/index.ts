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
