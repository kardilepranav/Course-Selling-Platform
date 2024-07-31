import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminEmailState } from "../store/selectors/adminEmail.js";
import { isAdminLoading } from "../store/selectors/isAdminLoading.js";
import Appbar from "./Appbar.jsx";

export const AdminLanding = () => {
  const navigate = useNavigate();
  const adminEmail = useRecoilValue(adminEmailState);
  const adminLoading = useRecoilValue(isAdminLoading);
  return (
		<div>
			<Appbar />
			<Grid container style={{ padding: '5vw' }}>
				<Grid item xs={12} md={6} lg={6}>
					<div style={{ marginTop: 100 }}>
						<Typography variant={'h2'}>Coursera Admin</Typography>
						<Typography variant={'h5'}>
							A place to learn, earn and grow
						</Typography>
						{!adminLoading && !adminEmail && (
							<div style={{ display: 'flex', marginTop: 20 }}>
								<div style={{ marginRight: 10 }}>
									<Button
										size={'large'}
										variant={'contained'}
										onClick={() => {
											navigate('/admin/signup');
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
											navigate('/admin/signin');
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
};
