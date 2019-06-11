import React from "react";
import Chart from "./chart";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({data: {}})
        fetch('/shipments')
        .then(response => response.json())
        .then(data => {
            this.setState({data: data});
        });
    }

    render() {
        return (
            <Chart data={this.state.data} height="500" width="500"></Chart>
        );
    }
}

export default App;