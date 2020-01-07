import React, {useEffect} from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'

const renderTextField = ({input, meta, label}) => (
    <TextField
        {...input}
        id="standard-name"
        label={label}
        margin="normal"
        fullWidth={true}
        helperText={meta.touched ? meta.error : ""}
        FormHelperTextProps={{error: true}}
        onKeyPress={e => {
            if (e.key === 'Enter') e.preventDefault();
        }}
    />
)

let ContactForm = props => {
    const { handleSubmit } = props
    useEffect(() => {
        props.initialize(props.state.selected)
        props.change('id', props.state.selected.id)
    }, [props.state.selectedIndex])

    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <Avatar/>
            </div>
            <div className="row justify-content-md-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <Field name="first_name" component={renderTextField} label="First Name"/>
                        <Field name="last_name" component={renderTextField} label="Last Name"/>
                        <Field name="phone" component={renderTextField} label="Phone"/>
                        <Field name="email" component={renderTextField} label="Email"/>

                        <Button className="float-right mt-5" variant="contained" color="secondary" type="submit">
                            {props.state.update ? "Update" : "Create"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

ContactForm = reduxForm({
    form: 'contact'
})(ContactForm)

const mapStateToProps = (state) => {
    return {
        state : state.list
    }
}

export default connect(mapStateToProps)(ContactForm)