//Не нашёл способа передать только {items}. Атрибут родителя opened получался undefined, когда я не использовал props.
function Menu(props){
    
    let m = null;

    if (props.opened){
        m = (
        <div className="menu menu-open">
            <div className="menu-toogle">
                <span/>
            </div>
            <nav>
                <ul>
                    {props.items.map((item, index) =>(
                        <li><a href={item.href}>{item.title}</a></li>
                    ))}
                </ul>
            </nav>
        </div>
    );
    }
    else{
        if (props.opened != undefined){
            m = (
            <div className="menu">
                <div classname="menu-toogle">
                    <span/>
                </div>
            </div>
            );
        }
    }

    return m;
}