export type ApiError = {
  message: string;
  status?: number;
  details?: {
    error: string;
    message: string;
    statusCode: number;
  };
};
