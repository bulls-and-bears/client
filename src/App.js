import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.js';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
 body, html {
        margin: 0;
        padding: 0;
        font-family: 'Noto Sans', sans-serif;
    }

`;
function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path='/' element={<MainPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
