import * as d3 from "d3"

export default (data, selectedRoomsCount) => {
    document.getElementById("rooms").innerHTML = ""
    const realWidth = document.getElementById("rooms").parentElement.parentElement.parentElement.offsetWidth

    let margin = { top: 30, right: 40, bottom: 70, left: 80 },
        width = realWidth - margin.left - margin.right,
        height = ((4 / 6) * realWidth) - margin.top - margin.bottom;

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
        .attr('y', height + margin.top + 20)
        .text('Bedrooms')

    /* Y-scale */
    const max = d3.max(data, d => d["value"])
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
        .text("Amount of AirBnB's")

    svg.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d["rooms"]))
        .attr("y", d => y("" + d["value"]))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d["value"]))
        .attr("fill", "#69b3a2")
        .attr("fill-opacity", d => {
            if (selectedRoomsCount > 4 && selectedRoomsCount <= +d["rooms"]) {
                // console.log("CORRECTTTTT:", d)
                return 1
            }
            else if (+d["rooms"] === selectedRoomsCount) return 1

            return 0.2
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
    bars.attr("fill-opacity", d => d === selectedRoomsCount ? 1 : 0.2);
}
