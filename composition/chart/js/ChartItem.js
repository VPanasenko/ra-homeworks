'use strict';

function ChartItem({type, text, style, color}) {
    return (
        <div
            className={'Charts--item ' + getChartStyle(type).componentStyle}
            style={style}
        >
            <b style={{ color: color }}>{text}</b>
        </div>
    )
}