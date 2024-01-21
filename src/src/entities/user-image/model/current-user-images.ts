import {
  Effect,
  createEffect,
  createEvent,
  createStore,
  forward,
} from "effector";
import { useStore } from "effector-react";
import { UserImage } from "shared/api/typicode/models/user-image";
import { AlertMessageService } from "shared/services/alert-message-service";
import UserImageService from "shared/services/user-image-service";

const getCurrentUserImagesFx = createEffect(
  async (): Promise<UserImage[] | null> => {
    try {
      setCurrentUserImageLoading(true);
      const currentUserImagesRequest =
        await UserImageService.getCurrentUserActiveImages();
      console.log(currentUserImagesRequest);
      setCurrentUserImageLoading(false);
      return currentUserImagesRequest.data.images;
    } catch {
      AlertMessageService.showErrorMessage("Ошибка загрузки фото пользователя");
      setCurrentUserImageLoading(false);
      return null;
    }
  }
);

const $currentUserImagesLoading = createStore<boolean>(false);
const setCurrentUserImageLoading = createEvent<boolean>();
forward({
  from: setCurrentUserImageLoading,
  to: $currentUserImagesLoading,
});

const $currentUserImages = createStore<UserImage[] | null>(null).on(
  getCurrentUserImagesFx.doneData,
  (_, payload) => {
    return payload;
  }
);

const useCurrentUserImages = (): [
  { data: UserImage[] | null; loading: boolean },
  Effect<void, UserImage[] | null, Error>
] => {
  return [
    {
      data: useStore($currentUserImages),
      loading: useStore($currentUserImagesLoading),
    },
    getCurrentUserImagesFx,
  ];
};

export default useCurrentUserImages;
