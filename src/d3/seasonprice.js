import * as d3 from "d3"

// Define a custom x-axis tick function


export default (data) => {
    // width of the card itsef (card body is collapsed and has width 0)
    document.getElementById("season-chart").innerHTML = ""
    const realWidth = document.getElementById("season-chart").parentElement.parentElement.parentElement.offsetWidth

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 40, bottom: 30, left: 60 },
        width = realWidth - margin.left - margin.right,
        height = ((40 / 46) * realWidth) - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#season-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    const parsedData = data.map((e) => {
        return {
            date: d3.timeParse("%Y-%m-%d")(e["date"]),
            avg_price: +e["avg_price"]
        }
    }).sort((a, b) => a["date"] - b["date"])

    var customXAxis = (g) => {
        g.call(d3.axisBottom(x).tickValues(parsedData.filter((d, i) => i % 61 === 0 || i === 0).map(d => d["date"])).tickFormat(d3.timeFormat("%B")));
    };

    console.log("eeeeeeeeeee: ", parsedData)
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
        .domain(d3.extent(parsedData, d => d["date"]))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .call(customXAxis);

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(parsedData, d => d["avg_price"])])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
        .datum(parsedData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x(d["date"]))
            .y(d => y(d["avg_price"]))
        )

    console.log("realdatazz:", parsedData)

}