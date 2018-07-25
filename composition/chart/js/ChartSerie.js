'use strict';

function ChartSerie({type, items, labels,params, id}) {
    const chartItem = items.map((item, itemIndex) => {
        const color = colors[itemIndex];
        const size = item / params.divider * 100;
        const style = {
            backgroundColor: color,
            opacity: type !== chartVerticalStacked ? (item / params.divider + .05) : 1,
            zIndex: item,
            height: type !== chartHorizontal ? (size + '%') : '',
            width: type !== chartHorizontal ? '' : (size + '%'),
            right: type !== chartVerticalLayered ? '' : ((params.sortedSerie.indexOf(item) / (items.length + 1)) * 100) + '%',
        };

        return (
            <ChartItem key={itemIndex} style={style} color={color} text={item} type={type} />
        );
    });

    return (
        <div
            className={'Charts--serie ' + getChartStyle(type).chartStyle}
            key={id}
            style={{ height: getChartStyle(type).height }}
        >
            <label>{labels[id]}</label>
            {chartItem}
        </div>
    )
}