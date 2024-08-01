import React, { useEffect, useState } from 'react';
import UserAppbar from './UserAppbar';
import axios from 'axios';
import { BASE_URL } from '../config.js';
import { Button, Card, Typography } from '@mui/material';

function BuyCourse() {
	const [courses, setCourses] = useState([]);

	const init = async () => {
		const resopnse = await axios.get(`${BASE_URL}/user/courses`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		setCourses(resopnse.data.courses);
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
					return <Course course={course} />;
				})}
			</div>
		</div>
	);
}

export default BuyCourse;

export function Course({ course }) {
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
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
				<Button
					variant='contained'
					size='large'
          onClick={async () => {
						const response = await axios.post(
              `${BASE_URL}/user/courses/` + course._id,
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              }
            );
					}}
				>
					Buy
				</Button>
			</div>
		</Card>
	);
}
