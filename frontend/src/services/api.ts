import { API_BASE_URL } from "../constants/constants";

const handleRequest = async (
  endpoint: string,
  method: string,
  body?: object,
  token?: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(method !== "GET" &&
        method !== "HEAD" &&
        body && { body: JSON.stringify(body) }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Something went wrong!");

    return data;
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message || "Request failed!");
    else throw new Error("Request failed!");
  }
};

export { handleRequest };
