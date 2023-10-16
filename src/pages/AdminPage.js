import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function AdminPage() {
	const navigate = useNavigate();
	window.location.href = 'http://localhost:8080/oauth2/authorization/google';

	useEffect(() => {
		try {
			// 현재 URL에서 쿼리 파라미터를 가져옵니다.
			const urlParams = new URLSearchParams(window.location.search);

			// 쿼리 파라미터에서 accessToken, refreshToken, name을 추출합니다.
			const accessToken = urlParams.get('accessToken');
			const refreshToken = urlParams.get('refreshToken');
			const name = urlParams.get('name');

			// 만약 토큰이 존재한다면, 쿠키에 저장합니다.
			if (accessToken && refreshToken && name) {
				document.cookie = `accessToken=${accessToken}; path=/; HttpOnly`;
				document.cookie = `refreshToken=${refreshToken}; path=/; HttpOnly`;
				document.cookie = `name=${name}; path=/; HttpOnly`;

				console.log('accessToken:', accessToken);
				console.log('refreshToken:', refreshToken);
				console.log('name:', name);
			}

			// 메인 페이지로 리디렉션합니다.
			navigate('/', { replace: true });
		} catch (err) {
			console.log(err);
		}
	}, [navigate]);
}
export default AdminPage;
