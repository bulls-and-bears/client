import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, styled, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import Header from '../components/Header';
import axios from 'axios';

function PortfolioPage() {
	const [amount, setAmount] = useState('');
	const [duration, setDuration] = useState('');
	const navigate = useNavigate();

	const onClickResult = () => {
		navigate('/result', { state: { amount, duration } });
		axios
			.post('/port', { amount, duration })
			.then((response) => {
				console.log('Success:', response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	const amountChange = (event) => {
		setAmount(event.target.value);
	};

	const durationChange = (event) => {
		setDuration(event.target.value);
	};

	return (
		<>
			<Header />
			<Grid sx={{ display: 'flex', flexDirection: 'row', margin: '110px 100px 40px 100px' }}>
				<LeftContainer>
					<Grid sx={{ fontSize: 20, fontWeight: 600 }}>신규 포트폴리오 입력</Grid>
					<div style={GridStyle}>
						<div style={ItemStyle}>
							<div>보유 자산 입력</div>
							<FormControl sx={{ width: 180 }}>
								<InputLabel id='amount-label'>자산</InputLabel>
								<Select labelId='amount-label' id='amount' value={amount} label='amount' onChange={amountChange}>
									<MenuItem value={'100'}>100만원 이상</MenuItem>
									<MenuItem value={'500'}>500만원 이상</MenuItem>
									<MenuItem value={'1,000'}>1,000만원 이상</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div style={ItemStyle}>
							<div> 보유 기간 입력</div>
							<FormControl sx={{ width: 180 }}>
								<InputLabel id='duration-label'>기간</InputLabel>
								<Select labelId='duration-label' id='duration' value={duration} label='duration' onChange={durationChange}>
									<MenuItem value={2}>2개월</MenuItem>
									<MenuItem value={6}>6개월</MenuItem>
									<MenuItem value={12}>12개월</MenuItem>
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
					<div style={{ color: '#58606d' }}>자산과 기간을 입력하여, 배당주 포트포리오를 확인해보세요.</div>
				</RightContainer>
			</Grid>
		</>
	);
}

const LeftContainer = styled(Grid)(() => ({
	width: 397,
	height: 581,
	borderRadius: 20,
	background: '#ffff',
	padding: '30px',
}));

const RightContainer = styled(Grid)(() => ({
	padding: 200,
	alignItems: 'center',
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
