import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, styled, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import Header from '../components/Header';
import axios from 'axios';

function PortfolioPage() {
	const location = useLocation();
	const name = location.state?.name;
	const [amount, setAmount] = useState('');
	const [duration, setDuration] = useState('');
	const navigate = useNavigate();
	const [amountLabel, setAmountLabel] = useState('금액');
	const [durationLabel, setDurationLabel] = useState('날짜');

	const onClickResult = () => {
		navigate('/result', { state: { amount, duration, name: name } });
		axios
			.post('http://localhost:8080/api/v1/report/', { amount, duration }, { withCredentials: true })
			.then((response) => {
				console.log('Success:', response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const amountChange = (event) => {
		const selectedAmount = event.target.value;
		setAmount(selectedAmount);

		switch (selectedAmount) {
			case 100:
				setAmountLabel('100만원 이상');
				break;
			case 500:
				setAmountLabel('500만원 이상');
				break;
			case 1000:
				setAmountLabel('1,000만원 이상');
				break;
			default:
				setAmountLabel('금액');
		}
	};

	const durationChange = (event) => {
		const selectedIndex = event.target.value;
		setDuration(selectedIndex);

		switch (selectedIndex) {
			case 0:
				setDurationLabel('2개월');
				break;
			case 1:
				setDurationLabel('6개월');
				break;
			case 2:
				setDurationLabel('1년');
				break;
			default:
				setDurationLabel('날짜');
		}
	};

	return (
		<>
			<Header />
			<Grid sx={{ display: 'flex', flexDirection: 'row', margin: '70px 100px 40px 100px' }}>
				<LeftContainer>
					<Grid sx={{ fontSize: 20, fontWeight: 600 }}>신규 포트폴리오 입력</Grid>
					<div style={GridStyle}>
						<div style={ItemStyle}>
							<div>보유 자산 입력</div>
							<FormControl sx={{ width: 180 }}>
								<InputLabel id='amount-label'>자산</InputLabel>
								<Select labelId='amount-label' id='amount' value={amount} label='amount' onChange={amountChange}>
									<MenuItem value={100}>100만원 이상</MenuItem>
									<MenuItem value={500}>500만원 이상</MenuItem>
									<MenuItem value={1000}>1,000만원 이상</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div style={ItemStyle}>
							<div> 보유 기간 입력</div>
							<FormControl sx={{ width: 180 }}>
								<InputLabel id='duration-label'>기간</InputLabel>
								<Select labelId='duration-label' id='duration' value={duration} label='duration' onChange={durationChange}>
									<MenuItem value={0}>2개월</MenuItem>
									<MenuItem value={1}>6개월</MenuItem>
									<MenuItem value={2}>1년</MenuItem>
								</Select>
							</FormControl>
						</div>
						<Button
							sx={{
								marginTop: '40px',
								borderRadius: 6,
								color: '#fff',
								background: '#3671ba',
								'&:hover': {
									background: '#3671ba',
								},
							}}
							onClick={onClickResult}>
							조회하기
						</Button>
					</div>
				</LeftContainer>
				<RightContainer>
					<Grid sx={{ fontWeight: 700, fontSize: 32, marginBottom: '40px' }}>
						{`${name}님,`}
						<br />
						{amountLabel}을 넣으면
						<br />
						{durationLabel} 뒤 최대 5000만원의 배당금을
						<br />
						받을 수 있어요
					</Grid>
					<div>
						내가 받을 수 있는 배당주는 얼마일까요? <br />
						자산과 기간을 입력하여, 배당주 포트포리오를 확인해보세요.
					</div>
				</RightContainer>
			</Grid>
		</>
	);
}

const LeftContainer = styled(Grid)(() => ({
	width: 397,
	height: 400,
	borderRadius: 20,
	background: '#ffff',
	padding: '30px',
}));

const RightContainer = styled(Grid)(() => ({
	color: '#58606d',
	textAlign: 'center',
	padding: ' 80px 200px 100px 200px',
	alignItems: 'center',
	lineHeight: 1.5,
}));

const GridStyle = {
	display: 'flex',
	flexDirection: 'column',
	gap: 10,
	color: '#1D242A',
	padding: '40px 10px',
};

const ItemStyle = {
	display: 'flex',
	flexDirection: 'row',
	gap: 20,
	alignItems: 'center',
	paddingBottom: 10,
};

export default PortfolioPage;
