import * as d3 from "d3";

const id = 'type-of-day'
export default (data, selectedTypeOfDay) => {
    document.getElementById(id)
    const realWidth = document.getElementById(id).parentElement.parentElement.parentElement.offsetWidth

    data = sortData(data);

    let margin = { top: 30, right: 40, bottom: 70, left: 70 },
        width = realWidth - margin.left - margin.right,
        height = ((4 / 6) * realWidth) - margin.top - margin.bottom;

    const svg = d3.select(`#${id}`)
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    console.log('check')
    /* X-scale */
    let x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(i => i.typeOfDay))
        .padding(0.2);

    /* X-axis */
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style("text-anchor", "middle");

    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 20)
        .text('Type Of Day')

    /* Y-scale */
    const max = d3.max(data.map(i => i.value))
    let y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

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
            return x(d.typeOfDay);
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
            const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            if (selectedTypeOfDay === 1) return weekdays.includes(d.typeOfDay) ? 1 : 0.2
            else return weekdays.includes(d.typeOfDay) ? 0.2 : 1
        });

    svg.selectAll("bar-label")
        .data(data)
        .enter()
        .append("text")
        .text(d => `$${Number(d.value).toFixed(0)}`)
        .attr("x", function (d) {
            return x(d.typeOfDay) + (x.bandwidth() / 2);
        })
        .attr("y", function (d) {
            return y(d.value) - 10
        })
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
}

export function updateChart(data, selectedTypeOfDay) {
    console.log(selectedTypeOfDay)
    const svg = d3.select(`#${id}`);

    data = sortData(data)
    const bars = svg.selectAll('rect').data(data)

    bars.attr("fill-opacity", d => {
        const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        if (selectedTypeOfDay === 1) return weekdays.includes(d.typeOfDay) ? 1 : 0.2
        else return weekdays.includes(d.typeOfDay) ? 0.2 : 1
    });
}

function sortData(data){
    return data.sort((a, b) => {
        const order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return order.indexOf(a.typeOfDay) - order.indexOf(b.typeOfDay);
    });
}
