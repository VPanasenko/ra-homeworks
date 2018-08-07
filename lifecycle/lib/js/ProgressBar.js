class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      total: 0,
      percent: 0
    };
  }

  update = false;

  calculatePercenetCompeleted(dividend, divisor) {
    let completedCalc = parseFloat(dividend);
    let totalCalc = parseFloat(divisor);
    if (isNaN(completedCalc) || isNaN(totalCalc) || totalCalc === 0) {
      return 0;
    }
    return parseFloat((completedCalc / totalCalc) * 100).toFixed(0);
  }

  createCanvas(radius, width, canvasPercent, color, text) {
    const canvas = document.getElementById("progressCanvas");
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const isTexted = (text && ((text != null) || (text !='')));
    
    if (isTexted){
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

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
    if (isTexted) {
      context.fillText(text, centerX, centerY + 10);
    }
    context.lineWidth = width;
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
  }

  drawCanvas() {
    this.createCanvas(45, 7, this.state.percent, `#96d6f4`, `${this.state.percent}%`);
    this.createCanvas(52, 7, 100, `#4ca89a`);
  }

  componentWillMount() {
    this.setState({
      completed: this.props.completed,
      total: this.props.total,
      percent: this.calculatePercenetCompeleted(
        this.props.completed,
        this.props.total
      )
    });
  }

  render() {
    return <canvas id="progressCanvas" className="progress" />;
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentWillReceiveProps(nextProps) {
    this.update = (
      nextProps.total > this.state.total ||
      nextProps.completed > this.state.completed
    )
    if (this.update) {
      this.setState({
        completed: nextProps.completed,
        total: nextProps.total,
        percent: this.calculatePercenetCompeleted(
          nextProps.completed,
          nextProps.total
        )
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.update;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.drawCanvas();
    this.update = false;
  }
}
