import {selector} from "recoil";
import { courseState } from "../atoms/course";

export const isCourseLoading = selector({
  key: 'isCourseLoaingState',
  get: ({get}) => {
    const state = get(courseState);

    return state.isLoading;
  },
});

export const courseDetails = selector({
  key: 'courseDetailsState',
  get: ({get}) => {
    const state = get(courseState);

    return state.adminCourse;
  },
});

export const courseTitle = selector({
  key: 'courseTitleState',
  get: ({get}) => {
    const state = get(courseState);
    if (state.adminCourse) {
        return state.adminCourse.title;
    }
    return "";
  },
});

export const coursePrice = selector({
  key: 'coursePriceState',
  get: ({get}) => {
    const state = get(courseState);
    if (state.adminCourse) {
        return state.adminCourse.price;
    }
    return "";
  },
});

export const courseImage = selector({
  key: 'courseImageState',
  get: ({get}) => {
    const state = get(courseState);
    if (state.adminCourse) {
        return state.adminCourse.imageLink;
    }
    return "";
  },
});

