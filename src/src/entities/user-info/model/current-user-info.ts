import {
  Effect,
  createEffect,
  createEvent,
  createStore,
  forward,
} from "effector";
import { useStore } from "effector-react";
import { CurrentUserInfo } from "shared/api/typicode/models/user-info";
import UserInfoService from "shared/services/user-info-service";

const getCurrentUserInfoFx = createEffect(
  async (): Promise<CurrentUserInfo | null> => {
    try {
      setCurrentUserInfoLoading(true);
      const currentUserInfoRequest = await UserInfoService.getCurrentUserInfo();
      setCurrentUserInfoLoading(false);
      return currentUserInfoRequest.data;
    } catch {
      setCurrentUserInfoLoading(false);
      return null;
    }
  }
);

const $currentUserInfoLoading = createStore<boolean>(false);
const setCurrentUserInfoLoading = createEvent<boolean>();
forward({
  from: setCurrentUserInfoLoading,
  to: $currentUserInfoLoading,
});

const $currentUserInfo = createStore<CurrentUserInfo | null>(null).on(
  getCurrentUserInfoFx.doneData,
  (_, payload) => {
    return payload;
  }
);

const useCurrentUserInfo = (): [
  { data: CurrentUserInfo | null; loading: boolean },
  Effect<void, CurrentUserInfo | null, Error>
] => {
  return [
    {
      data: useStore($currentUserInfo),
      loading: useStore($currentUserInfoLoading),
    },
    getCurrentUserInfoFx,
  ];
};

export default useCurrentUserInfo;
