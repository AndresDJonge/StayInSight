import * as d3 from "d3"

export default (data, selectedRange) => {
    // width of the card itsef (card body is collapsed and has width 0)
    document.getElementById("capacity").innerHTML = ""
    const realWidth = document.getElementById("capacity").parentElement.parentElement.parentElement.offsetWidth

    let margin = { top: 30, right: 40, bottom: 70, left: 70 },
        width = realWidth - margin.left - margin.right,
        height = ((4 / 6) * realWidth) - margin.top - margin.bottom;

    const svg = d3.select("#capacity")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    /* X-scale */
    let x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(i => i.persons))
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
    //svg.append("g")
    //    .call(d3.axisLeft(y));

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
            return x(d.persons);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .attr("fill", "#69b3a2")
        .attr("fill-opacity", d => {
            if (selectedRange[1] === 8 && d.persons >= 8) return 1
            return !inRange(d.persons, selectedRange) ? 0.2 : 1
        });

    svg.selectAll("bar-label")
        .data(data)
        .enter()
        .append("text")
        .text(d => Number(d.value).toFixed(0))
        .attr("x", function (d) {
            return x(d.persons) + (x.bandwidth() / 2);
        })
        .attr("y", function (d) {
            return y(d.value) - 10
        })
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
}

function inRange(x, range) {
    return range[0] <= x && x <= range[1];
}

export function updateChart(data, selectedRange) {
    const svg = d3.select("#capacity");

    const bars = svg.selectAll('rect').data(data)

    bars.attr("fill-opacity", d => {
        if (selectedRange[1] === 8 && d.persons >= 8) return 1
        return !inRange(d.persons, selectedRange) ? 0.2 : 1
    });
}
