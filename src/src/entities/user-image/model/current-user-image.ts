import {
  Effect,
  createEffect,
  createEvent,
  createStore,
  forward,
} from "effector";
import { useStore } from "effector-react";
import { UserImage } from "shared/api/typicode/models/user-image";
import UserImageService from "shared/services/user-image-service";

const getCurrentUserImageFx = createEffect(
  async (): Promise<UserImage | null> => {
    try {
      setCurrentUserImageLoading(true);
      const currentUserImageRequest =
        await UserImageService.getCurrentUserImageUrl();
      console.log(currentUserImageRequest);
      setCurrentUserImageLoading(false);
      return currentUserImageRequest.data;
    } catch {
      setCurrentUserImageLoading(false);
      return null;
    }
  }
);

const $currentUserImageLoading = createStore<boolean>(false);
const setCurrentUserImageLoading = createEvent<boolean>();
forward({
  from: setCurrentUserImageLoading,
  to: $currentUserImageLoading,
});

const $currentUserImage = createStore<UserImage | null>(null).on(
  getCurrentUserImageFx.doneData,
  (_, payload) => {
    return payload;
  }
);

const useCurrentUserImage = (): [
  { data: UserImage | null; loading: boolean },
  Effect<void, UserImage | null, Error>
] => {
  return [
    {
      data: useStore($currentUserImage),
      loading: useStore($currentUserImageLoading),
    },
    getCurrentUserImageFx,
  ];
};

export default useCurrentUserImage;
