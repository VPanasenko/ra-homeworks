'use strict';

function MessageHistory({list}){
    if (!list && list.length() < 1){
        return null;
    }

    const arr = list.map((v, i) => {
        let M = '';
        switch (v.type){
            case 'response':
                M = Response;
                break;
            case 'message':
                M = Message;
                break;
            default:
                M = Typing;
        }
        return (<li><M key={i} from={v.from} message={v}/></li>);
    });

    return (
        <ul>
            {arr}
        </ul>
    );
}