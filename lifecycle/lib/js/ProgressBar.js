class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: { value: 0, update: false },
      total: { value: 0, update: false },
      percent: 0
    };
  }

  calculatePercenetCompeleted() {
    let completedCalc = parseFloat(this.state.completed.value);
    let totalCalc = parseFloat(this.state.total.value);
    if (isNaN(completedCalc) || isNaN(totalCalc) || totalCalc === 0) {
      return 0;
    }
    return parseFloat((completedCalc / totalCalc) * 100).toFixed(0);
  }

  setPercentage(value) {
    this.setState({ percent: value });
    console.log(`setPercentage:`);
    console.log(this.state);
  }

  createCanvas(radius, width, canvasPercent, color) {
    var canvas = document.getElementById("progressCanvas");
    var context = canvas.getContext("2d");
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

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
  }

  drawCanvas() {
    if (this.state.completed.update) {
      this.createCanvas(45, 7, this.state.percent, `#96d6f4`);
      this.setState(
        this.setState({
          completed: { update: false }
        })
      );
    }

    if (this.state.total.update) {
      this.createCanvas(52, 7, 100, `#4ca89a`);
      this.setState({ total: { update: false } });
    }
  }

  componentWillMount() {
    this.setState(
      {
        total: Object.assign({}, this.state.total, {
          value: this.props.total,
          update: true
        }),
        completed: Object.assign({}, this.state.completed, {
          value: this.props.completed,
          update: true
        })
      },
      () => {
        console.log(`componentWillMount2:`);
        console.log(this.state);
        this.setPercentage(this.calculatePercenetCompeleted());
      }
    );
    console.log(`componentWillMount:`);
    console.log(this.state);
  }

  componentDidMount() {
    this.drawCanvas();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let update = false;

    if (nextProps.completed > this.state.completed.value) {
      this.setState(
        Object.assign({}, this.state.completed, {
          value: nextProps.completed,
          update: true
        }),
        () => {
          this.setPercentage(this.calculatePercenetCompeleted());
        }
      );
      update = true;
    }

    if (nextProps.total > this.state.total.value) {
      this.setState(
        Object.assign({}, this.state.total, {
          value: nextProps.total,
          update: true
        }),
        () => {
          this.setPercentage(this.calculatePercenetCompeleted());
        }
      );
      update = true;
    }

    console.log(`shouldComponentUpdate:`);
    console.log(this.state);

    return update;
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  render() {
    return <canvas id="progressCanvas" className="progress" />;
  }
}
