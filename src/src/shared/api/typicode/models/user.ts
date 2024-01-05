export type User = {
  userName: string;
};

export type CurrentUser = {
  user: User | null;
  isAuthenticated: boolean | null;
};
