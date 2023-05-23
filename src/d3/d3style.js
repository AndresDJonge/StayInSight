import { scaleOrdinal } from "d3";

export var colorScale = scaleOrdinal()
.domain([
  "color-primary-0", "color-primary-1", "color-primary-2", "color-primary-3", "color-primary-4",
  "color-secondary-1-0", "color-secondary-1-1", "color-secondary-1-2", "color-secondary-1-3", "color-secondary-1-4",
  "color-secondary-2-0", "color-secondary-2-1", "color-secondary-2-2", "color-secondary-2-3", "color-secondary-2-4",
  "color-complement-0", "color-complement-1", "color-complement-2", "color-complement-3", "color-complement-4"
])
.range([
  "#42A4F5", "#98CDF9", "#69B7F7", "#1A8FF0", "#0780E4",
  "#5552F7", "#A3A1FA", "#7976F8", "#302CF2", "#140FE8",
  "#FFCE37", "#FFE594", "#FFD962", "#FFC30B", "#FFC000",
  "#FFAB37", "#FFD294", "#FFBD62", "#FF980B", "#FF9400"
]);