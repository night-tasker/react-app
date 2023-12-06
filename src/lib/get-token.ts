import { Token } from "../types/user/token";

export const getToken = () => {
  const token: Token | null = JSON.parse(localStorage.getItem("user")!);
  return token
    ? { accessToken: token.accessToken, refreshToken: token.refreshToken }
    : null;
};
