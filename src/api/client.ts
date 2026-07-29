// Backend API URL defined by the assignment setup.
// In a production app this could be provided through environment variables.

const API_URL = "http://localhost:3000/api";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

const getToken = () => localStorage.getItem("token");

export async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw error ?? new Error("Something went wrong");
  }

  // Some endpoints may return no content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}