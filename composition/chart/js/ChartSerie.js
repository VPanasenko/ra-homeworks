'use strict';

function ChartSerie({ chartStyle, items, labels, id }) {
    //Так как многие свойства вычисляются отдельно для каждого столбца каждой диаграммы, то оставил вычисления здесь, чтобы не дублировать вертикали кода. 
    const chartItem = items.map((item, itemIndex) => {
        const color = colors[itemIndex];
        const size = item / chartStyle.chartItem.divider * 100;
        const style = {
            backgroundColor: color,
            opacity: chartStyle.chart !== chartVerticalStacked ? (item / chartStyle.chartItem.divider + .05) : 1,
            zIndex: item,
            height: chartStyle.chart !== chartHorizontal ? (size + '%') : '',
            width: chartStyle.chart !== chartHorizontal ? '' : (size + '%'),
            right: chartStyle.chart !== chartVerticalLayered ? '' : ((chartStyle.chartItem.sortedSerie.indexOf(item) / (items.length + 1)) * 100) + '%',
        };

        return (
            <ChartItem key={itemIndex} text={item} style={style} color={color} itemClass={chartStyle.chartItemStyleCSS} />
        );
    });

    return (
        <div
            className={'Charts--serie ' + chartStyle.chartSerieStyleCSS}
            key={id}
            style={{ height: chartStyle.chartItem.height }}
        >
            <label>{labels[id]}</label>
            {chartItem}
        </div>
    )
}