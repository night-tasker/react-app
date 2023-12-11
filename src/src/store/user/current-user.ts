import { createEffect, createStore, sample } from "effector";
import { CurrentUserInfo } from "../../types/user/user";
import { Token } from "../../types/user/token";
import { $token } from "./token";
import { useStore } from "effector-react";
import UserService from "../../services/user-service";

const currentUserFx = createEffect(
  async (token: Token | null): Promise<CurrentUserInfo> => {
    if (token == null || !token.accessToken || !token.refreshToken) {
      return { isAuthenticated: false, userInfo: null };
    }
    try {
      const currentUserRequest = await UserService.getCurrentUserInfo();
      return { isAuthenticated: true, userInfo: currentUserRequest.data };
    } catch (exception) {
      return { isAuthenticated: false, userInfo: null };
    }
  }
);

const $currentUser = createStore<CurrentUserInfo>({
  isAuthenticated: null,
  userInfo: null,
}).on(currentUserFx.doneData, (_, payload) => {
  return { ...payload };
});

sample({
  source: $token,
  target: currentUserFx,
});

const useCurrentUser = () => {
  return useStore($currentUser);
};

export default useCurrentUser;
