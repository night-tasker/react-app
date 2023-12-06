export type User = {
  userName: string;
};

export type CurrentUserInfo = {
  userInfo: User | null;
  isAuthenticated: boolean | null;
};
