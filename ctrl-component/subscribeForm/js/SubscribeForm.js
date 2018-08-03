'use strict'

class SubscribeForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            iserror:'',
        }
    }

    handleForm = (event) => {
        event.preventDefault();
        if (this.inputRef && this.inputRef.validity.valid){
            this.setState({iserror: ''});
        }
        else{
            this.setState({iserror: 'is-error'});
        }
        return;
    }

    inputRef = null;

    render() {      
        const sForm = (
            <div className="subscribe__form">
                <form className={"form form--subscribe " + this.state.iserror} onSubmit={this.handleForm.bind(this)}>
                    <h4 className="form-title">Подписаться</h4>
                    <SubscribeInput iRef = {i => this.inputRef = i} onChange={this.handleForm.bind(this)}/>
                </form>
            </div>
        )

        return (
            <div>
                <div>Поиск</div>
                {sForm}
            </div>
        );
    }
};