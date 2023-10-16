import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, styled, Button } from '@mui/material';
import background from '../images/background.svg';
import mainIcon from '../images/imageIcon.png';
import axios from 'axios';

function MainPage() {
	const navigate = useNavigate();

	const onClickStart = async () => {
		//const res = await axios.get("http://localhost:8080/test");
		navigate('/portfolio');
	};
	const Login = async () => {
		window.location.href = 'http://localhost:8080/oauth2/authorization/google';
	};
	const AuthTest = async () => {
		try {
			await axios.get('http://localhost:8080/oauth/test', { withCredentials: true });
			console.log('인증 성공');
		} catch (err) {
			console.log(err);
		}
	};

	// const GetTokenTest = async () => {
	// 	try {
	// 		// 현재 URL에서 쿼리 파라미터를 가져옵니다.
	// 		const urlParams = new URLSearchParams(window.location.search);

	// 		// 쿼리 파라미터에서 accessToken, refreshToken, name을 추출합니다.
	// 		const accessToken = urlParams.get('accessToken');
	// 		const refreshToken = urlParams.get('refreshToken');
	// 		const name = urlParams.get('name');

	// 		// 추출한 값을 쿠키에 저장합니다.
	// 		document.cookie = `accessToken=${accessToken}; path=/`;
	// 		document.cookie = `refreshToken=${refreshToken}; path=/`;
	// 		document.cookie = `name=${name}; path=/`;

	// 		console.log('accessToken:', accessToken);
	// 		console.log('refreshToken:', refreshToken);
	// 		console.log('name:', name);

	// 		navigate('/');
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

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
						<StyledButton onClick={() => AuthTest()}>인증 TEST</StyledButton>
						{/* <StyledButton onClick={() => GetTokenTest()}>토큰 가져오기 TEST</StyledButton> */}
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
