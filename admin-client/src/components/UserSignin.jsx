import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config.js';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user.js';
import UserAppbar from './UserAppbar.jsx';

function UserSignin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const setUser = useSetRecoilState(userState);

	return (
		<div>
			<UserAppbar/>
			<div
				style={{
					paddingTop: 150,
					marginBottom: 10,
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Typography variant={'h6'}>
					Welcome to Coursera. Sign in below
				</Typography>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Card varint={'outlined'} style={{ width: 400, padding: 20 }}>
					<TextField
						onChange={(event) => {
							let elemt = event.target;
							setEmail(elemt.value);
						}}
						fullWidth={true}
						label='Email'
						variant='outlined'
					/>
					<br />
					<br />
					<TextField
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						fullWidth={true}
						label='Password'
						variant='outlined'
						type={'password'}
					/>
					<br />
					<br />

					<Button
						size={'large'}
						variant='contained'
						onClick={async () => {
							const res = await axios.post(`${BASE_URL}/user/login`, {
								username: email,
								password: password,
							});
							const data = res.data;

							localStorage.setItem('token', data.token);
							setUser({
								userEmail: email,
								isLoading: false,
							});
							navigate('/userLanding');
						}}
					>
						Signin
					</Button>
				</Card>
			</div>
		</div>
	);
}

export default UserSignin;
