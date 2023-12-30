import { createEffect, createEvent, createStore, forward } from "effector";
import { useStore } from "effector-react";
import { Token } from "shared/api/typicode/models/token";
import TokenService from "shared/services/token-service";

const updateTokenFx = createEffect<() => Token | null>((): Token | null => {
  return TokenService.getToken();
});

export const $token = createStore<Token | null>(null).on(
  updateTokenFx.doneData,
  (_, payload) => {
    return payload;
  }
);

const update = createEvent();

forward({ from: update, to: updateTokenFx });

export const updateToken = () => {
  update();
};
export const useToken = (): [Token | null, () => void] => {
  return [useStore($token), updateToken];
};
