import { selector } from 'recoil';
import { userCourseState } from '../atoms/userCourse';

export const isUserCourseLoading = selector({
	key: 'isUserCourseLoading',
	get: ({ get }) => {
		const state = get(userCourseState);
		return state.isLoading;
	},
});

export const userCourseDetails = selector({
	key: 'userCourseDetails',
	get: ({ get }) => {
		const state = get(userCourseState);
		return state.userCourse;
	},
});
