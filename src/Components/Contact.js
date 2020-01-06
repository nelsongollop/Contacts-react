import React, {useEffect, useState} from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";

const renderTextField = ({input, meta, label, edit}) => (
    <TextField
        {...input}
        id="standard-name"
        label={label}
        margin="normal"
        fullWidth={true}
        inputProps={{readOnly: edit}}
        helperText={meta.touched ? meta.error : ""}
        FormHelperTextProps={{error: true}}
        onKeyPress={e => {{
            if (e.key === 'Enter') e.preventDefault();
        }}}
    />
)

let ContactForm = props => {
    const { handleSubmit } = props
    const [readOnly, setReadOnly] = useState(false)
    useEffect(() => {
        console.log("prop updated")
        props.initialize(props.selected)
    }, [props.selected])

    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <Avatar/>
            </div>
            <div className="row justify-content-md-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <Field name="first_name" component={renderTextField} label="First Name" edit={readOnly}/>
                        <Field name="last_name" component={renderTextField} label="Last Name" edit={readOnly}/>
                        <Field name="phone" component={renderTextField} label="Phone" edit={readOnly}/>
                        <Field name="email" component={renderTextField} label="Email" edit={readOnly}/>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

ContactForm = reduxForm({
    form: 'contact'
})(ContactForm)

export default ContactForm