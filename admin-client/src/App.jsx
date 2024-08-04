import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import AddCourse from './components/AddCourse.jsx';
import Courses from './components/Courses';
import Course from './components/Course';
import MainLanding from './components/MainLanding.jsx';
import UserLanding from './components/UserLanding.jsx';
import { adminState } from './store/atoms/admin.js';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { BASE_URL } from './config.js';
import { useEffect } from 'react';
import { AdminLanding } from './components/AdminLanding.jsx';
import UserSignup from './components/UserSignup.jsx';
import UserSignin from './components/UserSignin.jsx';
import { userState } from './store/atoms/user.js';
import UserCourses from './components/UserCourses.jsx';
import BuyCourse from './components/BuyCourse.jsx';

function App() {
	return (
		<RecoilRoot>
			<div
				style={{ width: '100vw', height: '100vh', backgroundColor: '#eeeeee' }}
			>
				<Router>
          <InitAdmin />
          <InitUser />
					<Routes>
						<Route path={'/addcourse'} element={<AddCourse />} />
						<Route path={'/course/:courseId'} element={<Course />} />
						<Route path={'/courses'} element={<Courses />} />
						<Route path={'/admin-signin'} element={<Signin />} />
						<Route path={'/admin-signup'} element={<Signup />} />
						<Route path={'/user-signup'} element={<UserSignup />} />
						<Route path={'/user-signin'} element={<UserSignin />} />
						<Route path={'/adminLanding'} element={<AdminLanding />} />
						<Route path={'/userLanding'} element={<UserLanding />} />
						<Route path={'/user-courses'} element={<UserCourses />} />
						<Route path={'/buy-courses'} element={<BuyCourse />} />
						<Route path={'/'} element={<MainLanding />} />
					</Routes>
				</Router>
			</div>
		</RecoilRoot>
	);
}

function InitAdmin() {
	const setAdmin = useSetRecoilState(adminState);
	const init = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/admin/me`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});

			if (response.data.username) {
				setAdmin({
					isLoading: false,
					adminEmail: response.data.username,
				});
			} else {
				setAdmin({
					isLoading: false,
					adminEmail: null,
				});
			}
		} catch (e) {
			setAdmin({
				isLoading: false,
				adminEmail: null,
			});
		}
	};

	useEffect(() => {
		init();
	}, []);

	return <></>;
}

function InitUser() {
	const setUser = useSetRecoilState(userState);
	const set = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/user/me`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});

			if (response.data.username) {
				setUser({
					isLoading: false,
					userEmail: response.data.username,
				});
			} else {
				setUser({
					isLoading: false,
					userEmail: null,
				});
			}
		} catch (e) {
			setUser({
				isLoading: false,
				userEmail: null,
			});
		}
	};

	useEffect(() => {
		set();
	}, []);

	return <></>;
}
export default App;
