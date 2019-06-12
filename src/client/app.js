import React from "react";
import Chart from "./chart";
import UploadForm from "./uploadForm";
import '../../public/style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('/shipments')
        .then(response => response.json())
        .then(data => {
            this.setState({data: data});
        });
    }

    getChart() {
        if (!this.state) {
            return (<div></div>);
        } else {
            if (!this.state.data.children) {
                return <span>No data available</span>;
            }
            return (<Chart data={this.state.data} height="500" width="500"></Chart>);
        }
    }
    
    render() {
        const chart = this.getChart();
        return (
            <div className="app">
                <div className="forms">
                    <div className="config-form">
                        <h3>Upload Configuration</h3>
                        <UploadForm action="/config/upload" name="config" />
                    </div>
                    <div className="data-form">
                        <h3>Upload Data</h3>
                        <UploadForm action="/shipments/upload" name="shipments" />
                    </div>
                </div>
                <div className="chart">
                    <button onClick = { this.fetchData }>Refresh</button>
                    { chart }
                </div>
            </div>
        )
    }
}

export default App;