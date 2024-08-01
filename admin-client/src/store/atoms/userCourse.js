import { atom } from 'recoil';

export const userCourseState = atom({
	key: 'userCourseState',
	default: {
		isLoading: true,
		userCourse: null,
	},
});
