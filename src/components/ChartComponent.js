import React from 'react';
import ReactApexChart from 'react-apexcharts';

function ChartComponent({ options, series }) {
	if (!options || !series) {
		return <p>Loading...</p>;
	}

	return <ReactApexChart options={options} series={series} type='line' />;
}

export default ChartComponent;
