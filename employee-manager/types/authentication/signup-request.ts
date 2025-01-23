export type SignupRequest = {
  username: string;
  password: string;
  roles?: string[] | [];
};

export type LoginRequest = {
  username: string;
  password: string;
};
