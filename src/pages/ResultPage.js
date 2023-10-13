import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Grid, styled, Button } from '@mui/material';
import Header from '../components/Header';
import ApexCharts from 'react-apexcharts';

import axios from 'axios';

function ResultPage() {
	const [stockData, setStockData] = useState();
	const [series, setSeries] = useState([]);
	const [options, setOptions] = useState({});

	useEffect(() => {
		const fetchData = () => {
			axios
				.get('https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo', {
					headers: {
						'Content-Type': 'application/json',
					},
					params: {
						serviceKey: '3D/hQQLa34EIssXyL96d8sUQaCs5YuG/Gqlvn59ggFLbbD138P/nxryTicBJXMnZHLtf74JrS/07XQNMjLqdbQ==',
						numOfRows: '247',
						pageNo: '1',
						beginBasDt: '20221013',
						endBasDt: '20231013',
						resultType: 'json',
						itmsNm: '삼성전자',
					},
				})
				.then((response) => {
					console.log(response.data);
					setStockData(response.data.response.body.items.item[0]);

					const prices = response.data.response.body.items.item.map((item) => parseInt(item.clpr, 10));
					const dates = response.data.response.body.items.item.map((item) => {
						const year = item.basDt.substring(2, 4);
						const month = item.basDt.substring(4, 6);
						return `${year}년 ${month}월`;
					});

					const reversedDates = dates.reverse();

					setSeries([{ name: '삼성전자', data: prices.reverse() }]);
					setOptions({
						chart: { type: 'line', zoom: { enabled: false } },
						dataLabels: { enabled: false },
						stroke: { curve: 'straight' },
						title: { text: '' },
						grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } },
						xaxis: {
							categories: reversedDates,
							tickAmount: 11,
						},
					});
				})
				.catch((error) => {
					console.log(error);
				});
		};
		fetchData();
	}, []);

	const rows = [
		{ name: '삼성전자', price: '68,900', rate: '+1.03%' },
		{ name: 'SK하이닉스', price: '124,200', rate: '+4.40%' },
		{ name: 'LG디스플레이', price: '12,490', rate: '-0.72%' },
	];

	return (
		<>
			<Header />

			<Grid
				sx={{
					margin: '30px 140px',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					gap: 3,
					justifyContent: 'space-around',
				}}>
				<Container sx={{ width: '397px', borderRadius: '40px', padding: '30px 40px' }}>
					<Grid sx={{ fontSize: 20, fontWeight: 600, marginBottom: '25px' }}>나영현님의 포트폴리오</Grid>
					<Grid sx={GridStyle}>
						<div>보유 자산</div>
						<div style={InputStyle}>100만원</div>
					</Grid>
					<Grid sx={GridStyle}>
						<div>보유 기간</div>
						<div style={InputStyle}>1년</div>
					</Grid>
				</Container>
				<Container sx={{ width: '803px', borderRadius: '20px', padding: '20px' }}>
					<Grid sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
						<div style={{ fontWeight: 600, fontSize: 18 }}>추천 종목</div>
						<Button sx={ButtonStyle}>더보기</Button>
					</Grid>
					<div style={{ maxHeight: '190px', overflowY: 'auto', marginTop: '8px' }}>
						<table style={{ width: '100%', borderCollapse: 'collapse' }}>
							<thead>
								<tr>
									<th style={TableStyle}>종목</th>
									<th style={TableStyle}>현재가</th>
									<th style={TableStyle}>등락률</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td style={{ borderBottom: '1px solid #eee', padding: '16px' }}>{stockData.itmsNm}</td>
									<td style={{ borderBottom: '1px solid #eee', padding: '16px', textAlign: 'right' }}>{stockData.clpr}</td>
									<td style={{ borderBottom: '1px solid #eee', padding: '16px', textAlign: 'right' }}>{stockData.fltRt}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</Container>
			</Grid>
			<Grid sx={{ margin: '30px 140px' }}>
				<div style={{ fontWeight: 600, fontSize: '20px', padding: '10px 20px' }}>주가 그래프</div>
				<Container sx={{ borderRadius: '20px', height: '350px' }}>
					<ApexCharts options={options} series={series} type='line' height={320} />
				</Container>
			</Grid>
		</>
	);
}
const Container = styled(Grid)(() => ({
	background: '#fff',
	height: '250px',
}));

const GridStyle = {
	color: '#1D242A',
	display: 'flex',
	flexDirection: 'row',
	padding: '15px 30px',
};

const InputStyle = {
	fontSize: '17px',
	marginTop: '-4px',
	marginLeft: '20px',
	width: '70px',
	background: 'rgba(0, 0, 0, 0.10)',
	color: '#7B7B7B',
	borderRadius: '7px',
	padding: '5px 11px',
	textAlign: 'center',
};

const TableStyle = {
	borderBottom: '1px solid #999',
	padding: '16px',
	fontWeight: 'bold',
};

const ButtonStyle = {
	display: 'flex',
	background: '#3671ba',
	color: '#fff',
	borderRadius: '10px',
	justifyContent: 'center',
	padding: '5px 13px',
	marginRight: '20px',
	'&:hover': {
		background: '#3671ba',
	},
};

export default ResultPage;
