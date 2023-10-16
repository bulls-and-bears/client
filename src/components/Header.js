import { useNavigate } from 'react-router-dom';
import { Grid, Button, styled } from '@mui/material';
import logo from '../images/Logo.svg';

function Header() {
	const navigate = useNavigate();

	const onClickHome = () => {
		const name = localStorage.getItem('loggedInUserName');

		if (name) {
			navigate(`/?name=${encodeURIComponent(name)}&fromHomeButton=true`);
		} else {
			navigate('/');
		}
	};

	const onClickPortfolio = () => {
		navigate('/portfolio');
	};

	return (
		<>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroud: 'transparent' }}>
				<div
					onClick={onClickHome}
					style={{ padding: '45px 100px', display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
					<img style={{ width: 31.058, height: 32.453, cursor: 'pointer' }} src={logo} alt='Logo' />
					<div style={{ fontFamily: 'Pacifico', color: '#074c83', cursor: 'pointer', fontSize: 18 }}>Bulls & Bares</div>
				</div>
				<Grid
					sx={{
						marginRight: '100px',
						display: 'flex',
						justifyContent: 'flex-end',
						gap: 2,
					}}>
					<ItemButton>Dashboard</ItemButton>
					<ItemButton>보유 종목</ItemButton>
					<ItemButton onClick={onClickPortfolio}>포트폴리오 확인하기</ItemButton>
					<ItemButton>배당 순위</ItemButton>
					<ItemButton>오늘의 주가</ItemButton>
				</Grid>
			</div>
		</>
	);
}

const ItemButton = styled(Button)(({}) => ({
	fontWeight: 400,
	borderBottom: 'none',
}));

export default Header;
