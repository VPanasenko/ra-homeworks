'use strict';

function AccordionElement(props) {
    const { data } = props;

    const handle = event => {
        event.preventDefault();
        if (props.onClick && typeof (props.onClick) === 'function') {
            props.onClick(data.id)
        }
    }

    return (
        <section onClick={handle} className={'section ' + (props.opened ? 'open' : '')}>
            {props.children}
        </section>
    )
}