import {atom} from "recoil";

export const courseState = atom({
  key: 'courseState',
  default: {
    isLoading: true,
    adminCourse: null
  },
});
