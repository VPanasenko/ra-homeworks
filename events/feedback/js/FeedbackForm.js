'use strict';

const salutations = [
    {abbr: 'mr', text: 'Мистер'},
    {abbr: 'mrs', text: 'Мисис'},
    {abbr: 'ms', text: 'Мис'},
]

const subjects = [
    'У меня проблема',
    'У меня важный вопрос'
]

const snacks = [
    {i: 'пицца', l: 'Пиццу'},
    {i: 'пирог', l: 'Пирог'},
]

// Из-за отсутствия родителя для каждых двух html-элементов input-label 
// не получается использовать map, поэтому пришлось писать вручную все элементы.
// Это характерно для данного компонента и всех последующих.
function Salutation({s}){
    const cs = (
        <div className='contact-form__input-group'>
            <input className='contact-form__input contact-form__input--radio' id={'salutation-' + salutations[0].abbr} name='salutation' type='radio' value={salutations[0].text} checked={s === salutations[0].text}/>
            <label className='contact-form__label contact-form__label--radio' htmlFor='salutation-mr'>
                {salutations[0].text}
            </label>
            <input className='contact-form__input contact-form__input--radio' id={'salutation-' + salutations[1].abbr} name='salutation' type='radio' value={salutations[1].text} checked={s === salutations[1].text}/>
            <label className='contact-form__label contact-form__label--radio' htmlFor={'salutation-' + salutations[1].abbr}>
                {salutations[1].text}
            </label> 
            <input className='contact-form__input contact-form__input--radio' id={'salutation-' + salutations[2].abbr} name='salutation' type='radio' value={salutations[2].text} checked={s === salutations[2].text}/>
            <label className='contact-form__label contact-form__label--radio' htmlFor={'salutation-' + salutations[2].abbr}>
                {salutations[2].text} 
            </label>   
        </div>
    );
    
    return cs;
}

function Name({n}){
    const cn = (
        <div className='contact-form__input-group'>
            <label className='contact-form__label' htmlFor='name'>Имя</label>
            <input className='contact-form__input contact-form__input--text' id='name' name='name' type='text' value={n}/>
        </div>
    );
    return cn;
}

function Email({e}){
    const ce = (
        <div className='contact-form__input-group'>
            <label className='contact-form__label' htmlFor='email'>Адрес электронной почты</label>
            <input className='contact-form__input contact-form__input--email' id='email' name='email' type='email' value={e}/>
        </div>
    );
    return ce;
}

function HelpSubject({h}){
    const ch = (
        <div className='contact-form__input-group'>
            <label className='contact-form__label' htmlFor='subject'>Чем мы можем помочь?</label>
            <select className='contact-form__input contact-form__input--select' id='subject' name='subject'>
                {subjects.map((v,i)=>{
                    let k = 'opt' + v;
                    return (<option key={k} value={k} selected={h===v}>{v}</option>)
                })}
            </select>
        </div>
    );
    return ch;
}

function Message({m}){
    const cm = (
        <div className='contact-form__input-group'>
            <label className='contact-form__label' htmlFor='message'>Ваше сообщение</label>
            <textarea className='contact-form__input contact-form__input--textarea' id='message' name='message' rows='6' cols='65' value={m}/>
        </div>
    );
    return cm;
}

function Snacks({s}){
    const cs = (
        <div className='contact-form__input-group'>
            <p className='contact-form__label--checkbox-group'>Хочу получить:</p>
            <input className='contact-form__input contact-form__input--checkbox' id='snacks-pizza' name='snacks' type='checkbox' value={snacks[0].i} checked={s.includes(snacks[0].i)}/>
            <label className='contact-form__label contact-form__label--checkbox' htmlFor='snacks-pizza'>{snacks[0].l}</label>
            <input className='contact-form__input contact-form__input--checkbox' id='snacks-cake' name='snacks' type='checkbox' value={snacks[1].i} checked={s.includes(snacks[1].i)}/>
            <label className='contact-form__label contact-form__label--checkbox' htmlFor='snacks-cake'>{snacks[1].l}</label>
        </div>
    );
    return cs;
}

function FeedbackForm(props){
    let {data} = props;

    //Возможно, preventDefault() здесь не нужен и должна происходить отправка данных. 
    //Тогда подойдёт закомментированная строка ниже.
    //const handle = event => props.onSubmit(JSON.stringify(data));
    const handle = event => {event.preventDefault(); props.onSubmit(JSON.stringify(data))};

    const f = (
        <form className='content__form contact-form'>
            <div className='testing'>
                <p>Чем мы можем помочь?</p>
            </div>
            <Salutation s={data.salutation}/>
            <Name n={data.name}/>
            <Email e={data.email}/>
            <HelpSubject h={data.subject}/>
            <Message m={data.message}/>
            <Snacks s={data.snacks}/>
            <button className='contact-form__button' type='submit' onClick={handle}>
                Отправить сообщение
            </button>
            <output id='result'/>
        </form>
    );
    
    return f;
}

Salutation.defaultProps = {
    s: '',
}

Name.defaultProps = {
    n: null,
}

Name.defaultProps = {
    e: '',
}

HelpSubject.defaultProps = {
    h: '',
}

Message.defaultProps = {
    m: '',
}

Snacks.defaultProps = {
    s: [''],
}

//Данные defaultProps будут использованы в случае, если объект data === null или undefined. 
//Поэтому для каждого из дочерних функциональных компонентов приходится задавать свои defaultProps.
FeedbackForm.defaultProps = {
    data: {
        salutation: '',
        name: null,
        email: '',
        subject: '',
        message: '',
        snacks: [''],
    }
}