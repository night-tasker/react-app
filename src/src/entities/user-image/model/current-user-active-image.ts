import {
  Effect,
  createEffect,
  createEvent,
  createStore,
  forward,
} from "effector";
import { useStore } from "effector-react";
import { ActiveUserImage } from "shared/api/typicode/models/user-image";
import { AlertMessageService } from "shared/services/alert-message-service";
import UserImageService from "shared/services/user-image-service";

const getCurrentUserImageFx = createEffect(
  async (): Promise<ActiveUserImage | null> => {
    try {
      setCurrentUserImageLoading(true);
      const currentUserImageRequest =
        await UserImageService.getCurrentUserActiveImage();
      setCurrentUserImageLoading(false);
      return currentUserImageRequest.data;
    } catch {
      setCurrentUserImageLoading(false);
      AlertMessageService.showErrorMessage("Ошибка загрузки фото пользователя");
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

const $currentUserImage = createStore<ActiveUserImage | null>(null).on(
  getCurrentUserImageFx.doneData,
  (_, payload) => {
    return payload;
  }
);

const useCurrentUserActiveImage = (): [
  { data: ActiveUserImage | null; loading: boolean },
  Effect<void, ActiveUserImage | null, Error>
] => {
  return [
    {
      data: useStore($currentUserImage),
      loading: useStore($currentUserImageLoading),
    },
    getCurrentUserImageFx,
  ];
};

export default useCurrentUserActiveImage;
