import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MainLanding() {
  const navigate = useNavigate();
	return (
		<Grid container style={{ padding: '5vw' }}>
			<Grid item xs={12} md={6} lg={6}>
				<div style={{ marginTop: 100 }}>
					<Typography variant={'h2'}>Coursera</Typography>
					<Typography variant={'h5'}>
						A place to learn, earn and grow
					</Typography>
					<div style={{ display: 'flex', marginTop: 20 }}>
						<div style={{ marginRight: 10 }}>
							<Button
								size={'large'}
								variant={'contained'}
								onClick={() => {
									navigate('/adminLanding');
								}}
							>
								Admin
							</Button>
						</div>
						<div>
							<Button
								size={'large'}
								variant={'contained'}
								onClick={() => {
									navigate('/userLanding');
								}}
							>
								User
							</Button>
						</div>
					</div>
				</div>
			</Grid>
			<Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
				<img src={'/image.jpg'} width={'100%'} />
			</Grid>
		</Grid>
	);
}

export default MainLanding;
