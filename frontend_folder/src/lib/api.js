// API utility functions for communicating with NextJS API routes

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Makes a GET request to the NextJS API route which forwards to Python backend
 */
export async function fetchFromBackend() {
  try {
    const response = await fetch('/api/backend', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'Failed to fetch data', response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error or server unavailable');
  }
}

/**
 * Makes a POST request to the NextJS API route which forwards to Python backend
 */
export async function sendToBackend(payload) {
  try {
    const response = await fetch('/api/backend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'Failed to send data', response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error or server unavailable');
  }
}

/**
 * Generic API call function
 */
export async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'API call failed', response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error or server unavailable');
  }
}
