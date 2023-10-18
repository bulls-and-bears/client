import { Grid, styled, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const data = [
	{
		title: '2004',

		desc: [
			'안전한 화장품을 위한 아로마티카의 시작',
			'No, 미네랄오일 & 실리콘 - 아로마테라피롤온, 마사지 오일 출시',
			'Free 파라벤 & 실리콘 - 로즈 스킨케어 라인 출시',
		],
	},
	{
		title: '2005',

		desc: [
			'기업 부설 연구소 설립',
			'천연 방부제 특허 취득',
			'Free 실리콘 & 설페이트 - 샴푸 출시',
			'Free 합성향 - 페이셜 미스트 출시',
		],
	},
	{
		title: '2010',

		desc: ['Free PEG & 페녹시에탄올 - 알로에 베라 젤 출시', 'EWG Skindeep 전성분 등재'],
	},
	{
		title: '2020',

		desc: ['100% PCR 용기 제품 출시', '국내 뷰티 브랜드 최초 리필 스테이션 오픈'],
	},
];

function StockStepper({ name }) {
	return (
		<>
			<Container sx={{ width: '397px', borderRadius: '40px', padding: '30px 0px' }}>
				<Grid sx={{ fontSize: 20, fontWeight: 600, margin: '0px 40px 0px 40px' }}>{`${name}`}님의 최적 포트폴리오</Grid>

				<Carousel
					autoPlay={false}
					navButtonsAlwaysVisible={true}
					sx={{ margin: '10px 0px', height: '280px', width: '400px', alignItems: 'center', textAlign: 'center' }}>
					{data.map((content) => (
						<>
							<h4 variant='h3' color='#112b23'>
								{content.title}
							</h4>

							{content.desc.map((description) => (
								<li>{description}</li>
							))}
							<Button>종목 확인</Button>
						</>
					))}
				</Carousel>
			</Container>
		</>
	);
}

const Container = styled(Grid)(() => ({
	background: 'orange',
	height: '250px',
}));

export default StockStepper;
