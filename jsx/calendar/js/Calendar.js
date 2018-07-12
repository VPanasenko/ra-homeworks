let dayNames = [
    {full:"Восресенье", short:"Вс"},
    {full:"Понедельник", short:"Пн"},
    {full:"Вторник", short:"Вт"},
    {full:"Среда", short:"Ср"},
    {full:"Четверг", short:"Чт"},
    {full:"Пятница", short:"Пт"},
    {full:"Суббота", short:"Сб"},
];

let monthNames = [
    {i:"Январь", r:"Января"},
    {i:"Февраль", r:"Февраля"},
    {i:"Март", r:"Марта"},
    {i:"Апрель", r:"Апреля"},
    {i:"Май", r:"Мая"},
    {i:"Июнь", r:"Июня"},
    {i:"Июль", r:"Июля"},
    {i:"Август", r:"Августа"},
    {i:"Сентябрь", r:"Сентября"},
    {i:"Октябрь", r:"Октября"},
    {i:"Ноябрь", r:"Ноября"},
    {i:"Декабрь", r:"Декабря"},
]

//https://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
function splitToMultipleArrays(a, n, balanced) {
    if (n < 2)
        return [a];

    let len = a.length;
    let outa = [];
    let i = 0;
    let size = 0;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            outa.push(a.slice(i, i += size));
        }
    } else {
        if (balanced) {
            while (i < len) {
                size = Math.ceil((len - i) / n--);
                outa.push(a.slice(i, i += size));
            }
        } else {
            n--;
            size = math.floor(len / n);
            if (len % size === 0) {
                size--;
            }
            while (i < size * n) {
                outa.push(a.slice(i, i += size));
            }
            outa.push(a.slice(size * n));
        }
    }

    return outa;
}

function getCalendarDates(inDate){
  
    let dates = Array();
    let tMax = 0;

    let cYear = inDate.getFullYear();
    let cMonth = inDate.getMonth();
    let cDate = inDate.getDate();
    let cMonthMinDate = new Date(cYear, cMonth, 1);
    let cMonthMaxDate = new Date(cYear, cMonth + 1, 0);
    let cMonthMinDayOnly = cMonthMinDate.getDay();
    let cMonthMaxDateOnly = cMonthMaxDate.getDate();
    let cMonthMaxDayOnly = cMonthMaxDate.getDay();

    for (let i=1; i <= cMonthMaxDateOnly; i++)
    {
        let tDate = new Date(cYear, cMonth, i);
        let tDay = tDate.getDay();
        dates.push({date: tDate, dateNum: i, month: 0, day: tDay, dateFullname: dayNames[tDay].full, dateShortname: dayNames[tDay].short, selected: i === cDate})
    }

    switch (cMonthMinDayOnly){
        case 0:
            tMax = 6;
            break;
        case 1:
            tMax = 7;
            break;
        default:
            tMax = cMonthMinDayOnly - 1;
    }

    for(let j = 0; j < tMax; j++)
    {
        let dToUnshift = new Date(cYear, cMonth, -1*j);
        let tDay = dToUnshift.getDay();
        dates.unshift({date: dToUnshift, dateNum: dToUnshift.getDate(), month: -1, day: tDay, dateFullName: dayNames[tDay].full, dateShortname: dayNames[tDay].short, selected: false});
    }

    tMax = 7 - cMonthMaxDayOnly;

    for(let k = 0; k < tMax; k++)
    {
        let dToPush = new Date(cYear, cMonth + 1, k + 1);
        let tDay = dToPush.getDay();
        dates.push({date: dToPush, dateNum: dToPush.getDate(), month: 1, day: tDay, dateFullName: dayNames[tDay].full, dateShortname: dayNames[tDay].short, selected: false});
    }

    return dates;
}

function HeadersMonFirst({ds}){
    let dn = ds.slice();
    dn.push(dn.shift());

    let mapped = dn.map((d)=>
        <th key={d.short} scope="col" title={d.full}>
            {d.short}
        </th>
    )

    return (<tr>{mapped}</tr>);
}

function BodyDatesColumns({bdcs}){
    let colDays = bdcs.map((d, index)=>{
        return (
            <td key={index} className={(d.month !== 0 ? "ui-datepicker-other-month" : " ") + (d.selected == true ? "ui-datepicker-today" : "")}>
                {d.dateNum}
            </td>
        );
    })

    return (<tr>{colDays}</tr>)
}

function BodyDatesRows({bdrs}){
    let allDates = bdrs.map((a, index)=>{
        return (
            <BodyDatesColumns bdcs = {a}/>
        );
    })

    return (<tbody>{allDates}</tbody>);
}

function Calendar({date}){
    let dates = getCalendarDates(date);
    let bDates = splitToMultipleArrays(dates, 6, true);

    const c = (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">
                    {dayNames[date.getDay()].full}
                </div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">
                        {date.getDate()}
                    </div>
                    <div className="ui-datepicker-material-month">
                        {monthNames[date.getMonth()].r}
                    </div>
                    <div classname="ui-datepicker-material-year">
                        {date.getFullYear()}
                    </div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">
                        {monthNames[date.getMonth()].i}
                    </span>
                    &nbsp;
                    <span className="ui-datepicker-year">
                        {date.getFullYear()}
                    </span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    {dayNames.map((d, index)=>{
                        return (<col
                            className={(index === 5) || (index === 6)? "ui-datepicker-week-end" : ""}
                        />)
                    })}
                </colgroup>
                <thead>
                    <HeadersMonFirst ds={dayNames}/>
                </thead>
                <BodyDatesRows bdrs={bDates}/>
            </table>
        </div>
    );

    return c;
}