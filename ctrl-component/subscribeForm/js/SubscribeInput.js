'use strict'

const SubscribeInput = (props) => {
    const sInput = (
        <div className="form-group">
            <label htmlFor="input-email" className="sr-only">
                Email
            </label>
            <input
                type="email"
                id="input-email"
                placeholder="Email"
                className="form-control"
                onChange={props.onChange}
                ref={props.iRef}
            />
            <div className="form-error">
                Пожалуйста, проверьте корректность адреса электронной почты
                    </div>
            <button type="submit" className="form-next">
                <i className="material-icons">keyboard_arrow_right</i>
            </button>
        </div>

    )
    return sInput;
}