import { Card, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { Loading } from './Loading';
import { BASE_URL } from '../config.js';
import { courseState } from '../store/atoms/course';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	courseTitle,
	coursePrice,
	isCourseLoading,
	courseImage,
} from '../store/selectors/course';
import Appbar from './Appbar.jsx';

function Course() {
	let { courseId } = useParams();
	const setCourse = useSetRecoilState(courseState);
	const courseLoading = useRecoilValue(isCourseLoading);

	useEffect(() => {
		const fetchCourse = async () => {
			await axios
				.get(`${BASE_URL}/admin/course/${courseId}`, {
					method: 'GET',
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				})
				.then((res) => {
					setCourse({ isLoading: false, adminCourse: res.data.course });
				})
				.catch((e) => {
					setCourse({ isLoading: false, adminCourse: null });
				});
		};
		fetchCourse();
	}, [courseId, setCourse]);

	if (courseLoading) {
		return <Loading />;
	}

	return (
		<div>
			<Appbar />
			<GrayTopper />
			<Grid container>
				<Grid item lg={8} md={12} sm={12}>
					<UpdateCard />
				</Grid>
				<Grid item lg={4} md={12} sm={12}>
					<CourseCard />
				</Grid>
			</Grid>
		</div>
	);
}

function GrayTopper() {
	const title = useRecoilValue(courseTitle);
	return (
		<div
			style={{
				height: 250,
				background: '#212121',
				top: 0,
				width: '100vw',
				zIndex: 0,
				marginBottom: -250,
			}}
		>
			<div
				style={{
					height: 250,
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<div>
					<Typography
						style={{ color: 'white', fontWeight: 600 }}
						variant='h3'
						textAlign={'center'}
					>
						{title}
					</Typography>
				</div>
			</div>
		</div>
	);
}

function UpdateCard() {
	let { courseId } = useParams();
	const navigate = useNavigate();
	const [courseDetails, setCourse] = useRecoilState(courseState);
	const [title, setTitle] = useState(courseDetails.adminCourse.title);
	const [description, setDescription] = useState(
		courseDetails.adminCourse.description
	);
	const [image, setImage] = useState(courseDetails.adminCourse.imageLink);
	const [price, setPrice] = useState(courseDetails.adminCourse.price);

	useEffect(() => {
		if (courseDetails.adminCourse) {
			setTitle(courseDetails.adminCourse.title);
			setDescription(courseDetails.adminCourse.description);
			setImage(courseDetails.adminCourse.imageLink);
			setPrice(courseDetails.adminCourse.price);
		}
	}, [courseDetails]);

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Card varint={'outlined'} style={{ maxWidth: 600, marginTop: 200 }}>
				<div style={{ padding: 20 }}>
					<Typography style={{ marginBottom: 10 }}>
						Update course details
					</Typography>
					<TextField
						value={title}
						style={{ marginBottom: 10 }}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						fullWidth={true}
						label='Title'
						variant='outlined'
					/>

					<TextField
						value={description}
						style={{ marginBottom: 10 }}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						fullWidth={true}
						label='Description'
						variant='outlined'
					/>

					<TextField
						value={image}
						style={{ marginBottom: 10 }}
						onChange={(e) => {
							setImage(e.target.value);
						}}
						fullWidth={true}
						label='Image link'
						variant='outlined'
					/>
					<TextField
						value={price}
						style={{ marginBottom: 10 }}
						onChange={(e) => {
							setPrice(e.target.value);
						}}
						fullWidth={true}
						label='Price'
						variant='outlined'
					/>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button
							variant='contained'
							onClick={async () => {
								axios.put(
									`${BASE_URL}/admin/courses/` + courseDetails.adminCourse._id,
									{
										title: title,
										description: description,
										imageLink: image,
										published: true,
										price,
									},
									{
										headers: {
											'Content-type': 'application/json',
											Authorization: 'Bearer ' + localStorage.getItem('token'),
										},
									}
								);
								let updatedCourse = {
									_id: courseDetails.adminCourse._id,
									title: title,
									description: description,
									imageLink: image,
									price,
								};
								setCourse({ adminCourse: updatedCourse, isLoading: false });
							}}
						>
							Update course
						</Button>
						<Button
							variant='contained'
							onClick={() => {
								const res = axios
									.delete(`${BASE_URL}/admin/remove-course/${courseId}`, {
										headers: {
											Authorization: 'Bearer ' + localStorage.getItem('token'),
										},
									})
									.then((res) => {
										navigate('/courses');
									});
							}}
						>
							REMOVE COURSE
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}

function CourseCard() {
	return (
		<div
			style={{
				display: 'flex',
				marginTop: 50,
				justifyContent: 'center',
				width: '100%',
			}}
		>
			<Card
				style={{
					margin: 10,
					width: 350,
					minHeight: 200,
					borderRadius: 20,
					marginRight: 50,
					paddingBottom: 15,
					zIndex: 2,
				}}
			>
				<Image />
				<div style={{ marginLeft: 10 }}>
					<Title />
					<Price />
				</div>
			</Card>
		</div>
	);
}

function Image() {
	const image = useRecoilValue(courseImage);
	return (
		<>
			<img src={image} style={{ width: 350 }}></img>
		</>
	);
}

function Title() {
	const title = useRecoilValue(courseTitle);
	return (
		<>
			<Typography variant='h5'>{title}</Typography>
		</>
	);
}

function Price() {
	const price = useRecoilValue(coursePrice);
	return (
		<>
			<Typography variant='subtitle2' style={{ color: 'gray' }}>
				Price
			</Typography>
			<Typography variant='subtitle1'>
				<b>Rs {price} </b>
			</Typography>
		</>
	);
}

export default Course;
