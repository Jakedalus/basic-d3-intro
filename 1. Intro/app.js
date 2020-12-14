// document.addEventListener('DOMContentLoaded', function(e) {
// console.log('d3', d3);

const DUMMY_DATA = [
	{ id: 'd1', value: 10, region: 'USA' },
	{ id: 'd2', value: 37, region: 'China' },
	{ id: 'd3', value: 13, region: 'Japan' },
	{ id: 'd4', value: 9, region: 'Cuba' }
];

// d3
// 	.select('div')
// 	.selectAll('p')
// 	.data(DUMMY_DATA)
// 	.enter()
// 	.append('p')
// 	.text(data => data.region);

const xScale = d3
	.scaleBand()
	.domain(DUMMY_DATA.map(dataPoint => dataPoint.region))
	.rangeRound([ 0, 250 ])
	.padding(0.1);

const yScale = d3
	.scaleLinear()
	.domain([ 0, 50 ])
	.range([ 200, 0 ]);

const container = d3
	.select('svg')
	.classed('container', true);

container
	.selectAll('.bar')
	.data(DUMMY_DATA)
	.enter()
	.append('rect')
	.classed('bar', true)
	.attr('width', xScale.bandwidth())
	.attr('height', data => 200 - yScale(data.value))
	.attr('x', data => xScale(data.region))
	.attr('y', data => yScale(data.value));

// d3
// 	.select('div')
// 	.selectAll('p')
// 	.data([ 4, 8, 15, 16, 23, 42 ])
// 	.enter()
// 	.append('p')
// 	.text(function(d) {
// 		return 'I’m number ' + d + '!';
// 	});
// });
