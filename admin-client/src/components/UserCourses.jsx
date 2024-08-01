import React, { useEffect, useState } from 'react';
import UserAppbar from './UserAppbar';
import axios from 'axios';
import { Card, Button, Typography } from '@mui/material';
import { BASE_URL } from '../config';

function UserCourses() {
	const [courses, setCourses] = useState([]);
	const init = async () => {
		const response = await axios.get(`${BASE_URL}/user/purchasedCourses`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		setCourses(response.data.purchasedCourses);
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div>
			<UserAppbar />
			<div
				style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
			>
				{courses.map((course) => {
					return <DisplayCourse course={course} />;
				})}
			</div>
		</div>
	);
}

export default UserCourses;

function DisplayCourse({ course }) {
	return (
		<Card
			style={{
				margin: 10,
				width: 300,
				minHeight: 200,
				padding: 20,
			}}
		>
			<Typography textAlign={'center'} variant='h5'>
				{course.title}
			</Typography>
			<Typography textAlign={'center'} variant='subtitle1'>
				{course.description}
			</Typography>
			<img src={course.imageLink} style={{ width: 300 }}></img>
		</Card>
	);
}
