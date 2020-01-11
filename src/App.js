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
    const [snackOpen, setOpen] = useState({open: false, error: false})

    //submit callback function passed as prop to the form
    const onSubmit = values => {
        if (props.state.update){
            API.updateContact(values)
                .then(
                    (result) => {
                        props.setContacts(result.data)
                        props.setSelected(null)
                        setOpen({open: true, error: false})
                        props.setUpdate(null)
                    },
                    (error) => setOpen({open: true, error: true})
                )
        } else {
            API.createContact(values)
                .then(
                    (result) => {
                        props.setContacts(result.data)
                        props.setSelected(null)
                        setOpen({open: true, error: false})
                        props.setUpdate(null)
                    },
                    (error) => setOpen({open: true, error: true})
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
                    {snackOpen.error ? "There was an error" :
                    props.state.update ?
                    "Your contact was successfully added" :
                    "Your contact was succesfully updated"}

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
