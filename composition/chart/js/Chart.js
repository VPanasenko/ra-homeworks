'use strict';

function Chart(props) {
    const { data } = props;

    const chartSerie = data.map((serie, serieIndex) => {
        return (
            <ChartSerie 
                key={serieIndex} 
                chartStyle={getChartStyle(props.type, data, serie)} 
                items={serie} 
                labels={props.labels} 
                id={serieIndex}
            />
        );
    })

    return (
        <div className={'Charts ' + getChart(props.type).chartStyleCSS}>
            {chartSerie}
        </div>
    )
}