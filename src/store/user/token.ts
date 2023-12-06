import { createEffect, createEvent, createStore, forward } from "effector";
import { Token } from "../../types/user/token";
import { useStore } from "effector-react";
import { getToken } from "../../lib/get-token";

const updateTokenFx = createEffect<() => Token | null>((): Token | null => {
  return getToken();
});

export const $token = createStore<Token | null>(getToken()).on(
  updateTokenFx.doneData,
  (state, payload) => payload
);

const update = createEvent();

forward({ from: update, to: updateTokenFx });

export const updateToken = () => {
  update();
};
const useToken = (): [Token | null, () => void] => {
  return [useStore($token), updateToken];
};

export default useToken;
