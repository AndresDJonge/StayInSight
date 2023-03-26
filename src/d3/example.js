import * as d3 from "d3"

export default (data, setData) => {
    let svg = d3.select("#samples")
    console.log("svg", svg)
    let margin = { top: 0, right: 0, bottom: 0, left: 0 };


    updateRoomSamples(data.slice(0, 3), svg, margin);

    d3.select("#d3-button").on("click", () => {
        console.log("d3 clicked!")
        const samples = sampleRandomRooms(data, setData);
        updateRoomSamples(samples, svg, margin);
    });
}

const sampleRandomRooms = (data, setData) => {
    let lower = Math.floor(Math.random() * 10);
    let upper = lower + Math.floor(Math.random() * 10);

    // use hook callback to reset data
    const samples = d3.shuffle(data).slice(lower, upper)
    setData(samples);

    return samples
}

const updateRoomSamples = (samples, svg, margin) => {
    let t = d3.transition().duration(1000);
    console.log("samples: ", samples)

    svg.selectAll('circle')
        .data(samples, d => d.ID)
        .join(
            enter => enter.append("circle")
                .attr("cx", d => margin.left + (samples.indexOf(d) * 30) + 10)
                .attr("cy", d => margin.top + 100)
                .attr("r", d => 10)
                .attr("fill", "green"),
            update => update
                .attr("fill", "grey"),
            exit => exit
                .attr("fill", "red")
                .transition(t)
                .attr("r", 0)
                .remove()
        );
}