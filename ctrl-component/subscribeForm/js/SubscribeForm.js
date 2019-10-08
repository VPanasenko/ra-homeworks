'use strict'

class SubscribeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorCSS: ""
        }
    }

    handleInput = (event) => {
        let cssClass = ""
        if (!event.currentTarget.validity.valid){
            cssClass = "is-error"
        }
        this.setState({ errorCSS: cssClass });
    }

    render() {
        const sForm = (
            <div className="subscribe__form">
                <form className={`form form--subscribe ${this.state.errorCSS}`}>
                    <h4 className="form-title">Подписаться</h4>
                    <div className="form-group">
                        <label htmlFor="input-email" className="sr-only">
                            Email
                        </label>
                        <input
                            type="email"
                            id="input-email"
                            placeholder="Email"
                            className="form-control"
                            onChange={this.handleInput}
                        />
                        <div className="form-error">
                            Пожалуйста, проверьте корректность адреса электронной почты
                        </div>
                        <button type="submit" className="form-next">
                            <i className="material-icons">keyboard_arrow_right</i>
                        </button>
                    </div>
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