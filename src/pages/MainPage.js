import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, styled, Button } from '@mui/material';
import background from '../images/background.svg';
import mainIcon from '../images/imageIcon.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// const sendTokenToServer = async (access_token) => {
// 	try {
// 		const response = await axios.post('http://localhost:8080', { token: access_token });
// 		console.log(response.data);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

function MainPage() {
	const navigate = useNavigate();

	const onClickStart = () => {
		navigate('/portfolio');
	};
	const Login = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			console.log(tokenResponse);
			// const { access_token } = tokenResponse;
			// sendTokenToServer(access_token);
		},
	});

	return (
		<>
			<Grid
				sx={{
					backgroundImage: 'url(' + background + ')',
					width: '100%',
					height: '100vh',
					backgroundSize: 'cover',
					display: 'flex',
					flexDirection: 'row',
				}}>
				<Section>
					<div style={{ fontSize: '24px', fontWeight: 600 }}>매 달 받게될 예상 배당금과 내 자산 분석까지 한 번에</div>
					<div style={{ fontFamily: 'Pacifico', fontSize: '48px', letterSpacing: '2.88px' }}>Bulls & Bares</div>
					<div style={{ fontSize: '18px', letterSpacing: '1.08px' }}>
						신뢰할 수 있는 금융데이터를 기반으로 <br />
						주식 초보자를 위한 서비스를 제공합니다.
					</div>
					<div style={ButtonStyle}>
						<MainButton
							sx={{
								background: '#fff',
								color: '#293782',
								'&:hover': {
									background: '#fff',
								},
							}}
							onClick={onClickStart}>
							시작하기
						</MainButton>
						<StyledButton onClick={() => Login()}>로그인하기</StyledButton>
					</div>
				</Section>

				<Grid>
					<img style={{ padding: '100px 0px 0px 80px', width: 690, height: 600 }} src={mainIcon} alt='Main Icon' />
				</Grid>
			</Grid>
		</>
	);
}

const Section = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'column',
	padding: '190px 0px 0px 100px',
	color: '#FFFFFF',
}));

const ButtonStyle = {
	display: 'flex',
	gap: 28,
	paddingTop: 20,
};

const MainButton = styled(Button)(() => ({
	width: 120,
	padding: '10px',
	borderRadius: 50,
}));
const StyledButton = styled(Button)(() => ({
	width: 120,
	padding: '10px',
	borderRadius: 50,
	color: '#fff',
	border: '1px solid #fff',
}));

export default MainPage;
