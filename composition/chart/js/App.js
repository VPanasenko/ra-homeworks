'use strict';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
		}
	}

	//Так как занесение в state относится к App, оставил данный код в App, а не utility.
	populateData = () => {
		const data = populateArray.bind(this)();
		this.setState({ data });
	}

	componentDidMount() {		
		const {data} = this.state;
		if (data && data.length === 0){
			this.populateData();
			setInterval(this.populateData, 2000);
		}
	}

	render() {	
		return (
			<section>
				<Chart {...this.props} data={this.state.data} type={chartVertical}/>
				<Chart {...this.props} data={this.state.data} type={chartVerticalStacked}/>
				<Chart {...this.props} data={this.state.data} type={chartVerticalLayered}/>
				<Chart {...this.props} data={this.state.data} type={chartHorizontal} labels={this.props.series}/>
				<Legend labels={this.props.labels} />
			</section>
		);
	}
}
