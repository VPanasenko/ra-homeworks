class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      total: 0,
      update: false,
      percent: 0
    };
  }

  setStateProperty(p, v, callback) {
    if (this.state[p] !== v) {
      this.setState({
        [p]: v
      }, callback);
      return true;
    }
    return false;
  }

  calculatePercenetCompeleted(dividend, divisor) {
    let completedCalc = parseFloat(dividend);
    let totalCalc = parseFloat(divisor);
    if (isNaN(completedCalc) || isNaN(totalCalc) || totalCalc === 0) {
      return 0;
    }
    return parseFloat((completedCalc / totalCalc) * 100).toFixed(0);
  }

  createCanvas(radius, width, canvasPercent, color) {
    var canvas = document.getElementById("progressCanvas");
    var context = canvas.getContext("2d");
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(
      centerX,
      centerY,
      radius,
      0,
      (canvasPercent / 100) * 2 * Math.PI,
      false
    );
    context.font = "30px Comic Sans MS";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(`${this.state.percent}%`, centerX, centerY);
    context.lineWidth = width;
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
  }

  drawCanvas() {
    this.createCanvas(45, 7, this.state.percent, `#96d6f4`);
    this.createCanvas(52, 7, 100, `#4ca89a`);
  }

  // componentWillMount() {
  //   this.setState(
  //     {
  //       total: Object.assign({}, this.state.total, {
  //         value: this.props.total,
  //         update: true
  //       }),
  //       completed: Object.assign({}, this.state.completed, {
  //         value: this.props.completed,
  //         update: true
  //       })
  //     },
  //     () => {
  //       console.log(`componentWillMount2:`);
  //       console.log(this.state);
  //       this.setPercentage(this.calculatePercenetCompeleted());
  //     }
  //   );
  //   console.log(`componentWillMount:`);
  //   console.log(this.state);
  // }

  // componentDidMount() {
  //   this.drawCanvas();
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   let update = false;

  //   if (nextProps.completed > this.state.completed.value) {
  //     this.setState(
  //       Object.assign({}, this.state.completed, {
  //         value: nextProps.completed,
  //         update: true
  //       }),
  //       () => {
  //         this.setPercentage(this.calculatePercenetCompeleted());
  //       }
  //     );
  //     update = true;
  //   }

  //   if (nextProps.total > this.state.total.value) {
  //     this.setState(
  //       Object.assign({}, this.state.total, {
  //         value: nextProps.total,
  //         update: true
  //       }),
  //       () => {
  //         this.setPercentage(this.calculatePercenetCompeleted());
  //       }
  //     );
  //     update = true;
  //   }

  //   console.log(`shouldComponentUpdate:`);
  //   console.log(this.state);

  //   return update;
  // }

  // componentDidUpdate() {
  //   this.drawCanvas();
  // }

  componentWillMount() {
    console.log("componentWillMount");
    this.setStateProperty("completed", this.props.completed);
    this.setStateProperty("total", this.props.total);
    this.setStateProperty(
      "percent",
      this.calculatePercenetCompeleted(this.props.completed, this.props.total)
    );
  }

  render() {
    console.log("render");
    return <canvas id="progressCanvas" className="progress" />;
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.drawCanvas();
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    let completedUpdated = this.setStateProperty(
      "completed",
      nextProps.completed
    );
    let totalUpdated = this.setStateProperty("total", nextProps.total);
    if (completedUpdated || totalUpdated) {
      this.setStateProperty(
        "percent",
        this.calculatePercenetCompeleted(nextProps.completed, nextProps.total),
        this.drawCanvas()
      );
      this.setStateProperty("update", true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    console.log(this.state);
    return this.state.update;
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
    this.setStateProperty("update", false);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
}
