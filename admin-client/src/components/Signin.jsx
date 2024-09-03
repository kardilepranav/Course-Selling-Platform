import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config.js';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { adminState } from '../store/atoms/admin.js';
import Appbar from './Appbar.jsx';

function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const setAdmin = useSetRecoilState(adminState);

	return (
		<div>
			<Appbar />
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
							const res = await axios.post(`${BASE_URL}/admin/login`, {
								username: email,
								password: password,
							});
							console.log(res);
							const data = res.data;

							localStorage.setItem('token', data.token);
							setAdmin({
								adminEmail: email,
								isLoading: false,
							});
							navigate('/adminLanding');
						}}
					>
						Signin
					</Button>
				</Card>
			</div>
		</div>
	);
}

export default Signin;
