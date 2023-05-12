import * as d3 from "d3"

export default (data, selectedRange) => {
    let margin = {top: 30, right: 30, bottom: 70, left: 50},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#people-prices")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const accommodationsGroup = groupByAccomodates(data);

        /* X-scale */
        let
    x = d3.scaleBand()
        .range([0, width])
        .domain(Object.keys(accommodationsGroup))
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
    const max = d3.max(Object.keys(accommodationsGroup).map(k => accommodationsGroup[k].length))
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
        .attr("y", -margin.right)
        .text('Total Amount Bnbs')

    const groupedData = getGroupedData(data);

    const bars = svg.selectAll("bar")
        .data(groupedData)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(d.persons);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .attr("fill", "#69b3a2");

    svg.selectAll("bar-label")
        .data(groupedData)
        .enter()
        .append("text")
        .text(d => d.value)
        .attr("x", function (d) {
            return x(d.persons) + (x.bandwidth() / 2);
        })
        .attr("y", function (d) {
            return y(d.value) - 10
        })
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
}

function groupByAccomodates(data) {
    return data.reduce((groups, item) => {
        const group = (groups[item.accommodates] || [])
        group.push(item)
        groups[item.accommodates] = group
        return groups;
    }, {});
}

function getGroupedData(data){
    const accommodationsGroup = groupByAccomodates(data)
    return Object.keys(accommodationsGroup).map(k => {
        return {
            persons: k,
            value: accommodationsGroup[k].length,
        }
    })
}

function inRange(x, range) {
    return range[0] <= x && x <= range[1];
}

export function updateChart(data, selectedRange) {
    const svg = d3.select("#people-prices");

    const groups = getGroupedData(data);

    const bars = svg.selectAll('rect').data(groups)

    bars.attr("fill-opacity", d => {
        if (selectedRange[1] === 8 && d.persons >= 8) return 1
        return !inRange(d.persons, selectedRange) ? 0.2 : 1
    });
}
