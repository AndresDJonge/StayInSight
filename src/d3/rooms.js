import * as d3 from "d3"
import { colorScale } from "./d3style";

export default (data, selectedRoomsCount) => {
    document.getElementById("rooms").innerHTML = ""
    const realWidth = document.getElementById("rooms").parentElement.parentElement.parentElement.offsetWidth
    const maxHeight = 280

    let margin = { top: 30, right: 30, bottom: 50, left: 40 },
        width = realWidth - margin.left - margin.right,
        height = maxHeight - margin.top - margin.bottom;

    const svg = d3.select("#rooms")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    /* X-scale */
    let x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => +d["rooms"]))
        .padding(0.2);

    // console.log("domaon:", x.domain())

    /* X-axis */
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style("text-anchor", "end");
    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + margin.top/2 + margin.bottom/2)
        .text('Bedrooms')

    /* Y-scale */
    const max = d3.max(data, d => d["value"])
    let y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

    /* Y-axis */
    /*
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .attr("x", -height / 2)
        .attr("y", -margin.right/2)
        .text("Amount of AirBnB's")
    */

    svg.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d["rooms"]))
        .attr("y", d => y("" + d["value"]))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d["value"]))
        .attr("fill",  d => {
            if (selectedRoomsCount > 4 && selectedRoomsCount <= +d["rooms"]) {
                return colorScale("color-complement-4")
            }
            else if (+d["rooms"] === selectedRoomsCount) return colorScale("color-complement-4")

            return colorScale("color-complement-1")
        });

    svg.selectAll("bar-label")
        .data(data)
        .enter()
        .append("text")
        .text((d, i) => d["avg_price"] ? "$" + Number(d["avg_price"]).toFixed(0) : "")
        .attr("x", (d, i) => x(d['rooms']) + (x.bandwidth() / 2))
        .attr("y", d => y("" + d["value"]) - 10)
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
}

export function updateChart(data, selectedRoomsCount) {
    const svg = d3.select("#rooms-chart");
    const bars = svg.selectAll('rect').data(data)
    bars.attr("fill", d => d === selectedRoomsCount ? colorScale("color-complement-4") : colorScale("color-complement-1"));
}

