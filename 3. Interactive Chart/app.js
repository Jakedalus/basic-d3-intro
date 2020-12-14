const DUMMY_DATA = [
	{ id: 'd1', region: 'USA', value: 10 },
	{ id: 'd2', region: 'India', value: 12 },
	{ id: 'd3', region: 'China', value: 11 },
	{ id: 'd4', region: 'Germany', value: 6 }
];

CONST = MARGINS = { top: 20, bottom: 10 };
const CHART_WIDTH = 600;
const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

let selectedData = DUMMY_DATA;

const x = d3
	.scaleBand()
	.domain(DUMMY_DATA.map(d => d.region))
	.rangeRound([ 0, CHART_WIDTH ])
	.padding(0.1);

const y = d3
	.scaleLinear()
	.domain([ 0, d3.max(DUMMY_DATA, d => d.value) + 3 ])
	.range([ CHART_HEIGHT, 0 ]);

const chartContainer = d3
	.select('svg')
	.attr('width', CHART_WIDTH)
	.attr(
		'height',
		CHART_HEIGHT + MARGINS.top + MARGINS.bottom
	);

const chart = chartContainer.append('g');

const xAxis = d3.axisBottom(x).tickSizeOuter(0);

chart
	.append('g')
	.call(xAxis)
	.attr('color', '#4f009e')
	.attr('transform', `translate(0, ${CHART_HEIGHT})`);

function renderChart() {
	chart
		.selectAll('.bar')
		.data(selectedData, d => d.id)
		.enter()
		.append('rect')
		.classed('bar', true)
		.attr('width', x.bandwidth())
		.attr('height', d => CHART_HEIGHT - y(d.value))
		.attr('x', d => x(d.region))
		.attr('y', d => y(d.value));

	chart
		.selectAll('.bar')
		.data(selectedData, d => d.id)
		.exit()
		.remove();

	chart
		.selectAll('.label')
		.data(selectedData, d => d.id)
		.enter()
		.append('text')
		.text(d => d.value)
		.attr('x', d => x(d.region) + x.bandwidth() / 2)
		.attr('y', d => y(d.value) - 20)
		.attr('text-anchor', 'middle')
		.classed('label', true);

	chart
		.selectAll('.label')
		.data(selectedData, d => d.id)
		.exit()
		.remove();
}

renderChart();

let unselectedIds = [];

const listItems = d3
	.select('#data')
	.select('ul')
	.selectAll('li')
	.data(DUMMY_DATA)
	.enter()
	.append('li');

listItems.append('span').text(d => d.region);

listItems
	.append('input')
	.attr('type', 'checkbox')
	.attr('checked', true)
	.on('change', d => {
		if (!unselectedIds.includes(d.id)) {
			unselectedIds.push(d.id);
		} else {
			unselectedIds = unselectedIds.filter(
				id => id !== d.id
			);
		}
		selectedData = DUMMY_DATA.filter(
			d => !unselectedIds.includes(d.id)
		);
		console.log('selectedData', selectedData);
		console.log('unselectedIds', unselectedIds);
		renderChart();
	});
