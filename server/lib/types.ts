export type APIResponse<T = void> = {
  status: "success" | "error";
  data?: T;
  error?: string;
  statusCode?: number;
};
