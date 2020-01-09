import React, {useState} from "react";
import List from './components/List'
import NavBar from './components/NavBar'
import Contact from "./components/Contact";
import Unselected from "./components/dumb/unselected";
import {connect} from "react-redux";
import {getContacts, setSelected, setUpdate} from "./actions/listActions";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import * as API from './api/requests'

const App = (props) => {
    const [snackOpen, setOpen] = useState(false)

    //submit callback function passed as prop to the form
    const onSubmit = values => {
        console.log(values)
        if (props.state.update){
            API.updateContact(values)
                .then(
                    (result) => {
                        props.getContacts()
                        setOpen(true)
                        props.setUpdate(null)
                        props.setSelected(null)
                    },
                    (error) => console.log(error)
                )
        } else {
            API.createContact(values)
                .then(
                    (result) => {
                        props.getContacts()
                        setOpen(true)
                        props.setUpdate(null)
                        props.setSelected(null)
                    },
                    (error) => console.log(error)
                )
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
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
            <Snackbar open={snackOpen}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} color="success">
                    Your contact was successfully added
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
