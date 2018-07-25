'use strict';

const colors = ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C'];

const chartVertical = 'vertical';
const chartVerticalStacked = 'verticalStacked';
const chartVerticalLayered = 'verticalLayered';
const chartHorizontal = 'horizontal';

const chartStyles = [
	{ chart: chartVertical, mainStyle: '', chartStyle: '', componentStyle: '', height: 250 },
	{ chart: chartVerticalStacked, mainStyle: '', chartStyle: 'stacked', componentStyle: 'stacked', height: 250 },
	{ chart: chartVerticalLayered, mainStyle: '', chartStyle: 'layered', componentStyle: 'layered', height: 250 },
	{ chart: chartHorizontal, mainStyle: 'horizontal', chartStyle: '', componentStyle: '', height: 'auto' },
]

function getChartStyle(type) {
	
	if (type && chartStyles.filter(c=>c.chart === type) !== undefined) {
		return chartStyles.filter(c=>c.chart === type)[0];
	}
	else {
		return chartStyles[0];
	}
}

function getChartComponentParams(type, arrSizes, curArrSize) {
	let componentParams = {
		divider: 1,
		sortedSerie: [],
	}
	if (type === chartVerticalStacked) {
		componentParams.divider = curArrSize.reduce((carry, current) => carry + current, 0);
	}
	else {
		componentParams.divider = arrSizes.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);
	}

	if (type === chartVerticalLayered){
		componentParams.sortedSerie = curArrSize.slice(0).sort(compareNumbers);
	}

	return componentParams;
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