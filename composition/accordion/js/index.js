'use strict';

class Accordion extends React.Component {
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

    openCurrent(cId) {
        if (this.state.currentId !== cId) {
            this.setState({ currentId: cId });
        }
    }

    isOpened = (cId) => {
        return this.state.currentId === cId;
    }

    render() {
        return (
            <main className="main">
                <AccordionTitle title={this.props.title} />
                {this.state.data.map((element, eIndex) => {
                    return (
                        <AccordionElement
                            key={element.id}
                            data={element}
                            onClick={this.openCurrent.bind(this)}
                            opened={this.isOpened(element.id)}
                        >
                            <AccordionElementText data={element} />
                        </AccordionElement>
                    )
                })}
            </main>
        )
    }
}