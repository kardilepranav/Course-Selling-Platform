import { adminState } from "../atoms/admin";
import {selector} from "recoil";

export const isAdminLoading = selector({
  key: 'adminLoadingState',
  get: ({get}) => {
    const state = get(adminState);

    return state.isLoading;
  },
});
