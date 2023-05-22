import * as d3 from "d3"

export default (data, selectedRoomsCount) => {
    document.getElementById("rooms-chart").innerHTML = ""
    const realWidth = document.getElementById("rooms-chart").parentElement.parentElement.parentElement.offsetWidth

    let margin = { top: 30, right: 30, bottom: 70, left: 50 },
        width = realWidth - margin.left - margin.right,
        height = ((4 / 6) * realWidth) - margin.top - margin.bottom;

    const svg = d3.select("#rooms-chart")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    /* X-scale */
    let x = d3.scaleBand()
        .range([0, width])
        .domain(["1", "2", "3", "4", "5", "6", "7", "8", "8+"])
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
    const max = d3.max(data)
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

    svg.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => data.indexOf(d))
        .attr("y", d => d)
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d))
        .attr("fill", "#69b3a2")
        .attr("fill-opacity", d => d === selectedRoomsCount ? 1 : 0.2);

    svg.selectAll("bar-label")
        .data(data)
        .enter()
        .append("text")
        .text(d => Number(d).toFixed(0))
        .attr("x", d => { console.log("bar label x:", data.indexOf(d)); return x(data.indexOf(d)) + (x.bandwidth() / 2) })
        .attr("y", d => y(d) - 10)
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
}

export function updateChart(data, selectedRoomsCount) {
    const svg = d3.select("#rooms-chart");
    const bars = svg.selectAll('rect').data(data)
    bars.attr("fill-opacity", d => d === selectedRoomsCount ? 1 : 0.2);
}
