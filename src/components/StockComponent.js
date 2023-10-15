import { useState, useEffect } from 'react';
import axios from 'axios';

const StockComponent = (stockNames) => {
	const [stockData, setStockData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const responses = await Promise.all(
					stockNames.map((stockName) =>
						axios.get('https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo', {
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
						}),
					),
				);
				setStockData(responses);
			} catch (error) {
				console.error(error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [stockNames]);

	return { stockData, loading, error };
};

export default StockComponent;
