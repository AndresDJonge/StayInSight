import * as d3 from "d3"
import { colorScale } from "./d3style";

export default (data, selectedRange) => {
    let margin = {top: 30, right: 30, bottom: 70, left: 50},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#radius-prices")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        /* X-scale */
        let x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(i => i.distance))
        .padding(0.2);

    /* X-axis */
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style("text-anchor", "end");
    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 20)
        .text('Maximum Occupancy Limit BnB')

    /* Y-scale */
    const max = d3.max(data.map(i => i.value))
    let y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

    /* Y-axis */
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .attr("x", -height / 2)
        .attr("y", -margin.right - 5)
        .text('Price')

    const bars = svg.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(d.distance);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .attr("fill", d => {
            if (selectedRange === 40 && d.distance >= 40) return colorScale("color-complement-4")
            return !inRange(d.distance, selectedRange) ? colorScale("color-complement-1") : colorScale("color-complement-4")
        });

    svg.selectAll("bar-label")
        .data(data)
        .enter()
        .append("text")
        .text(d => Number(d.value).toFixed(0))
        .attr("x", function (d) {
            return x(d.distance) + (x.bandwidth() / 2);
        })
        .attr("y", function (d) {
            return y(d.value) - 10
        })
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
}

function inRange(x, range) {
    return x <= range;
}

export function updateChart(data, selectedRange) {
    const svg = d3.select("#radius-prices");

    const bars = svg.selectAll('rect').data(data)

    bars.attr("fill", d => {
        if (selectedRange === 40 && d.distance >= 40) return colorScale("color-complement-4")
        return !inRange(d.distance, selectedRange) ? colorScale("color-complement-1") : colorScale("color-complement-4")
    });
}