'use strict';

function AccordianTitle({ title }) {
    return (
        <h2 className="title">{title}</h2>
    )
}

function AccordianElement(props) {
    const { data } = props;

    const handle = event => {
        event.preventDefault();
        if (props.onClick && typeof(props.onClick) === 'function'){
            props.onClick(data.id)
        }
    }

    return (
        <section onClick={handle} className={'section ' + (props.opened ? 'open' : '')}>
            <button>toggle</button>
            <h3 className="sectionhead">
                {data.value.head}
            </h3>
            <div className="articlewrap">
                <div className="article">
                    {data.value.article}
                </div>
            </div>
        </section>
    )
}

class Accordian extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentId: 0,
        }

    }

    setStateInitialValues = () => {
        const es = this.props.elements.map((element) => ({
            id: uuid(), value: element
        }))
        this.setState({ data: es, currentId: es.length > 0 ? es[0].id : 0 });
    }

    componentDidMount() {
        const { data } = this.state;
        if (data && data.length === 0) {
            this.setStateInitialValues();
        }
    }

    openCurrent(cId){
        console.log(cId);
        this.setState({ currentId: cId });
    }

    isOpened = (cId) => {
        return this.state.currentId === cId;
    }

    render() {
        return (
            <main className="main">
                <AccordianTitle title={this.props.title} />
                {this.state.data.map((element, eIndex) => {
                    return (
                        <AccordianElement 
                            key={element.id} 
                            data={element} 
                            onClick={this.openCurrent.bind(this)} 
                            opened={this.isOpened(element.id)} 
                        />
                    )
                })}
            </main>
        )
    }
}