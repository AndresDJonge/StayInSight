import * as d3 from "d3"

export default (data) => {
    let margin = {top: 30, right: 30, bottom: 70, left: 50},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#day-prices")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const accommodationsGroup = data.reduce((groups, item) => {
        const group = (groups[item.accommodates] || [])
        group.push(item)
        groups[item.accommodates] = group
        return groups;
    }, {});

    /* X-scale */
    let x = d3.scaleBand()
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
        .attr('x', width/2)
        .attr('y', height + margin.top + 20)
        .text('# people allowed in the BnB')

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
        .text('Amount of BnBs')

    const test = Object.keys(accommodationsGroup).map(k => {
        return {
            persons: k,
            value: accommodationsGroup[k].length,
        }
    })
    console.log(test)

    svg.selectAll("bar")
        .data(test)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.persons); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "#69b3a2");


    svg.selectAll("bar-label")
        .data(test)
        .enter()
        .append("text")
        .text(d => d.value)
        .attr("x", function(d) { return x(d.persons) + (x.bandwidth()/2); })
        .attr("y", function(d) { return y(d.value) - 10})
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
}
