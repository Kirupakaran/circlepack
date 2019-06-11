import React from "react";
import * as d3 from "d3";

/* props: {
    data: {
        master: {
            parent: [{
                value,
                size,
                children: [{}]
            }]
        }
    },
    height,
    width
} */
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.createCirclePack = this.createCirclePack.bind(this);
    }

    componentDidMount() {        
        this.createCirclePack();
    }

    componentDidUpdate() {
        this.createCirclePack();
    }

    pack(data) {
        return d3.pack()
        .size([this.props.width - 2, this.props.height - 2])
        .padding(3)
    (d3.hierarchy(data)
        .sum(d => d.size)
        .sort((a, b) => b.size - a.size));
    }

    getColor() {
        const colors = ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2", "#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"];
        return colors[Math.floor(Math.random()*colors.length)];   
    }

    createCirclePack() {
        const node = this.node;
        const root = this.pack(this.props.data);
        
        d3.select(node)
            .selectAll("g")
            .data(root.descendants())
            .join("g")
                .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)
            .append("circle")
                .attr("r", d => d.r)
                .attr("fill", d => this.getColor())
                .attr("stroke", "black")
                .attr("stroke-width", 0.5)
            .append("title")
                .text(d => d.data.tooltip);

    }

    render() {
        return (
            <svg className="rootSvg" height={this.props.height} width={this.props.width}
                ref={node => this.node = node}>
            </svg>
        );
    }
}

export default Chart;