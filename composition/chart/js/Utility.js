'use strict';

const colors = ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C'];

const chartVertical = 'vertical';
const chartVerticalStacked = 'verticalStacked';
const chartVerticalLayered = 'verticalLayered';
const chartHorizontal = 'horizontal';

const charts = [
	{ chart: chartVertical, chartStyleCSS: '', chartSerieStyleCSS: '', chartItemStyleCSS: '', chartItem: { height: 250, divider: 1, sortedSerie: [] } },
	{ chart: chartVerticalStacked, chartStyleCSS: '', chartSerieStyleCSS: 'stacked', chartItemStyleCSS: 'stacked', chartItem: { height: 250, divider: 1, sortedSerie: [] } },
	{ chart: chartVerticalLayered, chartStyleCSS: '', chartSerieStyleCSS: 'layered', chartItemStyleCSS: 'layered', chartItem: { height: 250, divider: 1, sortedSerie: [] } },
	{ chart: chartHorizontal, chartStyleCSS: 'horizontal', chartSerieStyleCSS: '', chartItemStyleCSS: '', chartItem: { height: 'auto', divider: 1, sortedSerie: [] } },
]

function getChart(type) {
	if (type && charts.filter(c => c.chart === type) !== undefined) {
		return charts.filter(c => c.chart === type)[0];
	}
	else {
		return charts[0];
	}
}

function getChartStyle(type, allArr, curArr) {
	const chart = getChart(type);
	let chartStyle = Object.assign({}, chart, {chartItem: {...chart.chartItem}});

	if (chartStyle.chart === chartVerticalStacked) {
		chartStyle.chartItem.divider = curArr.reduce((carry, current) => carry + current, 0);
	}
	else {
		chartStyle.chartItem.divider = allArr.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);
	}

	if (chartStyle.chart === chartVerticalLayered) {
		chartStyle.chartItem.sortedSerie = curArr.slice(0).sort(compareNumbers);
	}

	return chartStyle;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function populateArray() {
	const series = 5;
	const serieLength = 5;

	let data = new Array(series).fill(new Array(serieLength).fill(0));
	data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

	return data;
}

function compareNumbers(a, b) {
	return a - b;
}