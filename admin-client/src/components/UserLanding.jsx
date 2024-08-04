import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail.js';
import { isUserLoading } from '../store/selectors/isUserLoading.js';
import UserAppbar from './UserAppbar.jsx';

function UserLanding() {
	const navigate = useNavigate();
	const userEmail = useRecoilValue(userEmailState);
	const userLoading = useRecoilValue(isUserLoading);
	return (
		<div>
			<UserAppbar/>
			<Grid container style={{ padding: '5vw' }}>
				<Grid item xs={12} md={6} lg={6}>
					<div style={{ marginTop: 100 }}>
						<Typography variant={'h2'}>Coursera User</Typography>
						<Typography variant={'h5'}>
							A place to learn, earn and grow
						</Typography>
						{!userLoading && !userEmail && (
							<div style={{ display: 'flex', marginTop: 20 }}>
								<div style={{ marginRight: 10 }}>
									<Button
										size={'large'}
										variant={'contained'}
										onClick={() => {
											navigate('/user-signup');
										}}
									>
										Signup
									</Button>
								</div>
								<div>
									<Button
										size={'large'}
										variant={'contained'}
										onClick={() => {
											navigate('/user-signin');
										}}
									>
										Signin
									</Button>
								</div>
							</div>
						)}
					</div>
					<div></div>
				</Grid>
				<Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
					<img src={'/image.jpg'} width={'100%'} />
				</Grid>
			</Grid>
		</div>
	);
}

export default UserLanding;
