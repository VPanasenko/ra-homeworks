'use strict';

// Выделил отдельный тип сущности для аккордеона, однако пришлось менять структуру
// - без родительского div, добавленного в AccordionElementText, 
// выделить отдельных детей от AccordionElement не получается.
function AccordionElementText({data}) {
    return (
        <div>
            <button>toggle</button>
            <h3 className="sectionhead">
                {data.value.head}
            </h3>
            <div className="articlewrap">
                <div className="article">
                    {data.value.article}
                </div>
            </div>
        </div>
    )
}