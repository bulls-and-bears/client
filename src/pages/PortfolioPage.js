import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, styled, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import Header from '../components/Header';
import axios from 'axios';
import questionmark from '../images/questionmark.png';
import Dividend from '../components/Dividend.js';

function PortfolioPage() {
	const location = useLocation();
	const name = new URLSearchParams(location.search).get('name');
	const [open, setOpen] = useState(false);
	const [reportId, setReportId] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onClickButton = () => {
		setIsModalOpen(true);
	};

	// Handle modal close
	const handleClose = () => {
		setOpen(false);
	};

	const [amount, setAmount] = useState('');
	const [duration, setDuration] = useState('');
	const navigate = useNavigate();
	const [amountLabel, setAmountLabel] = useState('금액');
	const [durationLabel, setDurationLabel] = useState('날짜');
	const [totalDividend, setTotalDividend] = useState();

	const onClickResult = () => {
		navigate(`/result?name=${encodeURIComponent(name)}`, { state: { reportId } });
	};

	const postToBackend = async () => {
		try {
			const response = await axios.post(
				'/api/v1/report?name=' + name,
				{ amount, duration },
				{
					withCredentials: true,
				},
			);
			setReportId(response.data.reportId);
			setTotalDividend(response.data.totalDividend);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (amount && duration) {
			postToBackend();
		}
	}, [amount, duration]);

	const amountChange = (event) => {
		const selectedAmount = event.target.value;
		setAmount(selectedAmount);

		switch (selectedAmount) {
			case 100000:
				setAmountLabel('10만원');
				break;
			case 300000:
				setAmountLabel('30만원');
				break;
			case 500000:
				setAmountLabel('50만원');
				break;

			default:
				setAmountLabel('금액');
		}
	};

	const durationChange = (event) => {
		const selectedIndex = event.target.value;
		setDuration(selectedIndex);

		switch (selectedIndex) {
			case 2:
				setDurationLabel('2개월');
				break;

			case 6:
				setDurationLabel('6개월');
				break;

			case 10:
				setDurationLabel('10개월');
				break;
			default:
				setDurationLabel('날짜');
		}
	};

	return (
		<>
			<Header />
			<Grid sx={{ display: 'flex', flexDirection: 'row', margin: '70px 100px 20px 180px' }}>
				<LeftContainer>
					<Grid sx={{ fontSize: 20, fontWeight: 600 }}>신규 포트폴리오 입력</Grid>
					<div style={GridStyle}>
						<div style={ItemStyle}>
							<div style={{ width: '150px' }}>보유 자산 입력</div>
							<FormControl sx={{ width: 180 }}>
								<InputLabel id='amount-label'>자산</InputLabel>
								<Select labelId='amount-label' id='amount' value={amount} label='amount' onChange={amountChange}>
									<MenuItem value={100000}>10만원</MenuItem>
									<MenuItem value={300000}>30만원</MenuItem>
									<MenuItem value={500000}>50만원</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div style={ItemStyle}>
							<div style={{ width: '150px' }}> 보유 기간 입력</div>
							<FormControl sx={{ width: 180 }}>
								<InputLabel id='duration-label'>기간</InputLabel>
								<Select labelId='duration-label' id='duration' value={duration} label='duration' onChange={durationChange}>
									<MenuItem value={2}>2개월</MenuItem>

									<MenuItem value={6}>6개월</MenuItem>

									<MenuItem value={10}>10개월</MenuItem>
								</Select>
							</FormControl>
						</div>
						<Button
							style={{
								fontSize: '16px',

								marginTop: '15px',
								color: '#58606d',
								borderRadius: 20,
							}}
							onClick={onClickButton}>
							<div>배당금이란</div>
							<img src={questionmark} alt='questionmark' style={{ width: '21px', height: '21px' }} />
						</Button>
					</div>

					<Button
						sx={{
							marginLeft: '30px',
							width: '250px',
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
				</LeftContainer>
				<RightContainer>
					<Grid sx={{ fontWeight: 700, fontSize: 32, marginBottom: '40px' }}>
						{amount || duration ? (
							<>
								{`${name}님,`}
								<br />
								<span style={{ color: 'black', fontSize: 40 }}>{amountLabel}</span>을 넣으면
								<br />
								<span style={{ color: 'black', fontSize: 40 }}>{durationLabel}</span> 뒤 최대{' '}
								<span style={{ color: 'black', fontSize: 40 }}>{totalDividend}원</span>의 배당금을
								<br />
								받을 수 있어요
							</>
						) : (
							<>
								{name}님!
								<br />
								자산과 금액을 입력하여 <br />
								최대배당금을 확인해보세요!
							</>
						)}
					</Grid>

					<div
						style={{
							color: '#58606d',
							textAlign: 'center',

							alignItems: 'center',
							lineHeight: 1.5,
						}}>
						내가 받을 수 있는 배당주는 얼마일까요? <br />
						자산과 기간을 입력하여, 배당주 포트포리오를 확인해보세요.
					</div>
				</RightContainer>
			</Grid>
			<Dividend open={isModalOpen} onClose={() => setIsModalOpen(false)} name={name} />
		</>
	);
}

const LeftContainer = styled(Grid)(() => ({
	width: 397,
	height: 440,
	borderRadius: 20,
	background: '#ffff',
	padding: '30px',
}));

const Container = styled(Grid)(() => ({
	width: 500,
	height: 300,
	borderRadius: 20,
	background: '#ffff',
	padding: '30px',
}));

const RightContainer = styled(Grid)(() => ({
	color: '#58606d',
	textAlign: 'center',
	padding: ' 120px 0px 80px 180px',
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
{
	/* <Container sx={{ marginTop: '30px' }}>
						<Grid>
							<strong>더 오랜 기간 보유하고 싶으신가요?</strong> <br />
							시뮬레이션으로 예상 배당금을 확인해보세요!
						</Grid>
						<Grid
							sx={{
								textAlign: 'center',
								display: 'flex',
								flexDirection: 'row',
								gap: 2,
								marginTop: '20px',
								marginLeft: '90px',
							}}>
							<div style={{ lineHeight: 4 }}> 보유 기간 입력</div>
							<FormControl sx={{ width: 180 }}>
								<InputLabel id='year-label'>기간</InputLabel>
								<Select labelId='year-label' id='year' label='year'>
									<MenuItem value={1}>1년</MenuItem>
									<MenuItem value={2}>2년</MenuItem>
									<MenuItem value={3}>3년</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Button
							sx={{
								marginTop: '20px',
								width: '350px',
								borderRadius: 6,
								color: '#fff',
								background: '#3671ba',
								'&:hover': {
									background: '#3671ba',
								},
							}}
							onClick={onClickSimulate}>
							조회하기
						</Button>
					</Container> */
}
