'use strict';

function getCurrencySymbol(cName){
    //https://stackoverflow.com/questions/19373860/convert-currency-names-to-currency-symbol
    let currency_symbols = {
        'USD': '$', // US Dollar
        'EUR': '€', // Euro
        'CRC': '₡', // Costa Rican Colón
        'GBP': '£', // British Pound Sterling
        'ILS': '₪', // Israeli New Sheqel
        'INR': '₹', // Indian Rupee
        'JPY': '¥', // Japanese Yen
        'KRW': '₩', // South Korean Won
        'NGN': '₦', // Nigerian Naira
        'PHP': '₱', // Philippine Peso
        'PLN': 'zł', // Polish Zloty
        'PYG': '₲', // Paraguayan Guarani
        'THB': '฿', // Thai Baht
        'UAH': '₴', // Ukrainian Hryvnia
        'VND': '₫', // Vietnamese Dong
        'RUB': '₽', // Russian Ruble - добавлен дополнительно, так как по ссылке выше его нет
    };

    return currency_symbols[cName] || currency_symbols['USD']; 
}

function ListingItemImage({itemUrl, imageUrl}){  
    return (
        <div className='item-image'>
            <a href={itemUrl}>
                <img src={imageUrl}/>
            </a>
        </div>
    )
}

function ListingItemDetails({item}){
    let leftClass = 'level-high';
    if (item.quantity <= 10){
        leftClass = 'level-low';
    }
    else{
        if (item.quantity <=20){
            leftClass = 'level-medium';
        }
    }

    let shortedTitle = item.title.length > 50 ? item.title.substring(0, 50) + '...' : item.title;

    let priceWithCurrency = '';
    switch(item.currency_code){
        case 'USD':
        case 'EUR':
            priceWithCurrency = getCurrencySymbol(item.currency_code) + item.price;
            break;
        default:
            priceWithCurrency = item.price + ' GBP';
            break;
    }
    
    return (
        <div className='item-details'>
            <p className='item-title'>{shortedTitle}</p>
            <p className='item-price'>{priceWithCurrency}</p>
            <p className={'item-quantity ' + leftClass}>{item.quantity + ' left'}</p>
        </div>
    )
}

function ListingItem({item}){
    const image = <ListingItemImage itemUrl={item.url} imageUrl={item.MainImage.url_570xN}/>;
    const i = <ListingItemDetails item={item}/>

    return (
        <div className='item'>
            {image}{i}
        </div>
    )
}

function Listing({items}){
    let allItems = null;

    if (items && items.length > 0){ 
        allItems = items.map((v, i) => {
            return <ListingItem key={v.listing_id} item={v}/>
        });
    }

    return (
        <div className='item-list'>
            {allItems}
        </div>
    )
}

function requestData(url, callback){  
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            let content = xhr.responseText;
            if (content && content != ''){
                callback(content);
            }
            else{
                callback(false);
            }
        }
    }
    xhr.open('GET', url);
    xhr.send();
}

function getItemsByUrl(url, callback)
{
    requestData(url, function(data){
        let items = null;

        if (data !== false){
            items = JSON.parse(data);
        }

        callback(items);
    })
}

getItemsByUrl('https://neto-api.herokuapp.com/etsy', function(items){
    ReactDOM.render(<Listing items={items}/>, document.getElementById('root'));
});