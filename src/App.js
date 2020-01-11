import React, {useState} from "react";
import List from './components/List'
import NavBar from './components/NavBar'
import Contact from "./components/Contact";
import Unselected from "./components/dumb/unselected";
import {connect} from "react-redux";
import {getContacts, setSelected, setUpdate, setContacts} from "./actions/listActions";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import * as API from './api/requests'

const App = (props) => {
    const [snackOpen, setOpen] = useState({open: false, error: false, message:""})

    const handleError = (error) => {
        if (error.response.status == '422') {
            setOpen({open: true, error: true, message: "There's already a user with that email"})
        } else {
            setOpen({open: true, error: true, message: "An error occurred"})
        }
    }
    const handleSuccess = (result, message) => {
        props.setContacts(result.data)
        props.setSelected(null)
        setOpen({open: true, error: false, message: `Your contact was successfully ${message}`})
        props.setUpdate(null)
    }

    //submit callback function passed as prop to the form
    const onSubmit = values => {
        if (props.state.update){
            API.updateContact(values)
                .then(
                    (result) => {
                        handleSuccess(result, "updated")
                    },
                    (error) => {
                        handleError(error)
                    }
                )
        } else {
            API.createContact(values)
                .then(
                    (result) => {
                        handleSuccess(result, "created")
                    },
                    (error) => {
                        handleError(error)
                    }
                )
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen({open: false});
    };

    return(
        <div className="container-fluid h-100 d-flex flex-column">
            <div className="row">
                <NavBar/>
            </div>
            <div className="row h-100">
                <div className="col-md-6 no-padding d-flex">
                    <List/>
                </div>
                <div className="col-md-6 no-padding vertical-center">
                    {props.state.update != null ?
                        <Contact onSubmit={onSubmit} update={props.state.update}/> :
                        <Unselected/>
                    }
                </div>
            </div>
            <Snackbar open={snackOpen.open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} color={snackOpen.error ? "error" : "success"}>
                    {snackOpen.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        state: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: () => {
            dispatch(getContacts())
        },
        setSelected: (index) => {
            dispatch(setSelected(index))
        },
        setUpdate: (update) => {
            dispatch(setUpdate(update))
        },
        setContacts: (list) => {
            dispatch(setContacts(list))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
