import { createEffect, createStore, sample } from "effector";
import { CurrentUser } from "shared/api/typicode/models/user";
import { Token } from "shared/api/typicode/models/token";
import { $token } from "./token";
import { useStore } from "effector-react";
import UserService from "shared/services/user-service";

const getCurrentUserFx = createEffect(
  async (token: Token | null): Promise<CurrentUser> => {
    if (token == null || !token.accessToken || !token.refreshToken) {
      return { isAuthenticated: false, user: null };
    }
    try {
      const currentUserRequest = await UserService.getCurrentUser();
      return { isAuthenticated: true, user: currentUserRequest.data };
    } catch (exception) {
      return { isAuthenticated: false, user: null };
    }
  }
);

const $currentUser = createStore<CurrentUser>({
  isAuthenticated: null,
  user: null,
}).on(getCurrentUserFx.doneData, (_, payload) => {
  return payload;
});

sample({
  source: $token,
  target: getCurrentUserFx,
});

const useCurrentUser = () => {
  return useStore($currentUser);
};

export default useCurrentUser;
