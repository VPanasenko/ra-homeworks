'use strict';

function Chart(props) {
    const { data } = props;

    //В идеале getChartComponentParams опустить бы на уровень вниз, 
    //но тогда нам ниже нужно передавать data, что тоже нехорошо. Решил оставить так.
    const chartSerie = data.map((serie, serieIndex) => {
        return (
            <ChartSerie 
                labels={props.labels} 
                items={serie} 
                params={getChartComponentParams(props.type, data, serie)} 
                key={serieIndex} 
                id={serieIndex} 
                type={props.type}
            />
        );
    })

    return (
        <div className={'Charts ' + getChartStyle(props.type).mainStyle}>
            {chartSerie}
        </div>
    )
}