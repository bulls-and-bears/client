import React, { useState } from 'react';
import { Grid, styled, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import Header from '../components/Header';

function PortfolioPage() {
	const [asset, setAsset] = useState('');
	const [period, setPeriod] = useState('');

	const assetChange = (event) => {
		setAsset(event.target.value);
	};

	const periodChange = (event) => {
		setPeriod(event.target.value);
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
								<InputLabel id='asset-label'>자산</InputLabel>
								<Select labelId='asset-label' id='asset' value={asset} label='Asset' onChange={assetChange}>
									<MenuItem value={1}>100만원 이상</MenuItem>
									<MenuItem value={2}>500만원 이상</MenuItem>
									<MenuItem value={3}>1,000만원 이상</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div style={ItemStyle}>
							<div> 보유 기간 입력</div>
							<FormControl sx={{ width: 180 }}>
								<InputLabel id='period-label'>기간</InputLabel>
								<Select labelId='period-label' id='period' value={period} label='Period' onChange={periodChange}>
									<MenuItem value={10}>2개월</MenuItem>
									<MenuItem value={20}>6개월</MenuItem>
									<MenuItem value={30}>1년</MenuItem>
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
							}}>
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
