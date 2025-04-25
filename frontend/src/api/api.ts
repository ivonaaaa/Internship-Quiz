import axiosInstance from "./base";

export const handleRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: object
): Promise<T> => {
  try {
    const config = {
      method,
      url: endpoint,
      ...(body && { data: body }),
    };
    const response = await axiosInstance(config);
    return response as T;
  } catch (err: any) {
    throw new Error(err.message || "Request failed!");
  }
};
