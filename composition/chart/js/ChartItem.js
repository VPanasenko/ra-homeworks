'use strict';

function ChartItem({text, style, color, itemClass}) {
    return (
        <div
            className={'Charts--item ' + itemClass}
            style={style}
        >
            <b style={{ color: color }}>{text}</b>
        </div>
    )
}