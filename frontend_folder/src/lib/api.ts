// API utility functions for communicating with NextJS API routes

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

export class ApiError extends Error {
  public readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Makes a GET request to the NextJS API route which forwards to Python backend
 */
export async function fetchFromBackend(): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/backend", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: ApiResponse = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || "Failed to fetch data", response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error or server unavailable");
  }
}

/**
 * Generic API call function
 */
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || "API call failed", response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error or server unavailable");
  }
}
