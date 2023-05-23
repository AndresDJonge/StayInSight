import * as d3 from "d3"
import { colorScale } from "./d3style";

const binSize = 50;

export default (data, selectedRange) => {
    // width of the card itsef (card body is collapsed and has width 0)
    document.getElementById("price-per-day").innerHTML = ""
    const realWidth = document.getElementById("price-per-day").parentElement.parentElement.parentElement.offsetWidth

    let margin = { top: 30, right: 40, bottom: 70, left: 40 },
        width = realWidth - margin.left - margin.right,
        height = ((4 / 6) * realWidth) - margin.top - margin.bottom;

    const prices = getPrices(data);

    const bins = getBins(prices);

    const svg = d3.select("#price-per-day")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    /* X-scale */
    let x = d3.scaleLinear()
        .domain([0, bins.length])
        .range([0, width]);

    /* X-axis */
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(bins.length).tickFormat(i => {
            if (i === bins.length) return bins[i - 1].end
            else return bins[i].start
        }));

    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2 + margin.left)
        .attr('y', height + margin.top + margin.bottom / 2)
        .text('Price bins ($)')

    /* Y-scale */
    const max = d3.max(bins, bin => bin.count);
    let y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

    // /* Y-axis */
    // svg.append("g")
    //     .call(d3.axisLeft(y));

    // svg.append('text')
    //     .attr('text-anchor', 'middle')
    //     .attr('transform', 'rotate(-90)')
    //     .attr("x", -(height / 2))
    //     .attr("y", - margin.left - 10)
    //     .text('Frequency')

    svg.selectAll("bar")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", (bin, i) => x(i))
        .attr("y", (bin) => y(bin.count))
        .attr("width", _ => x(1) - x(0))
        .attr("height", (bin) => height - y(bin.count))
        .attr("fill", bin => {
            return !inRange(bin.start, selectedRange) ? colorScale("color-complement-1") : colorScale("color-complement-4")
        });


    svg.selectAll("bar-label")
        .data(bins)
        .enter()
        .append("text")
        .text(d => d.count)
        .attr("x", function (d, i) { return x(i) + (x(1) - x(0)) / 2; })
        .attr("y", function (d) { return y(d.count) - 10 })
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
}

function getPrices(data) {
    return data.map(i => i.avg_price).filter(i => i <= 750);
}

function getBins(prices) {
    const bins = Array.from({ length: Math.ceil(d3.max(prices) / binSize) }, (_, i) => ({
        start: i * binSize,
        end: (i + 1) * binSize,
        count: 0,
    }));

    prices.forEach(price => {
        const bin = bins.find(bin => price > bin.start && price <= bin.end);
        bin.count++;
    });

    return bins;
}

function inRange(x, range) {
    return range[0] <= x && x <= range[1];
}

export function updateChart(data, selectedRange) {
    const svg = d3.select("#price-per-day");
    const prices = getPrices(data);
    const bins = getBins(prices);
    const bars = svg.selectAll('rect').data(bins)

    bars.attr("fill", bin => {
        return !inRange(bin.start, selectedRange) ? colorScale("color-complement-1") : colorScale("color-complement-4")
    });
}
