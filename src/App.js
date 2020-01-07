import React, {useEffect, useState} from "react";
import List from './components/List'
import NavBar from './components/NavBar'
import Contact from "./components/Contact";
import axios from 'axios'
import Unselected from "./components/dumb/unselected";
import {connect} from "react-redux";
import {getContacts} from "./actions/listActions";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const App = (props) => {
    const [selected, setSelected] = useState({})
    const [snackOpen, setOpen] = useState(false)

    const select = (contact) => {
        setSelected(contact)
    }

    const onSubmit = values => {
        console.log(values)
        if (values.id){
            axios.put(`http://localhost:3001/api/v1/contacts/${values.id}`, values)
                .then(
                    (result) => {
                        props.getContacts()
                        setOpen(true)
                        setSelected({})
                    },
                    (error) => console.log(error)
                )

        } else {
            axios.post("http://localhost:3001/api/v1/contacts", values)
                .then(
                    (result) => {
                        props.getContacts()
                        setOpen(true)
                        setSelected({})
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
                <NavBar onNew={select}/>
            </div>
            <div className="row h-100">
                <div className="col-md-6 no-padding d-flex">
                    <List onSelect={select}/>
                </div>
                <div className="col-md-6 no-padding vertical-center">
                    {Object.keys(selected).length == 0 ?
                        <Unselected/> :
                        <Contact onSubmit={onSubmit} selected={selected} update={props.state.update}/>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
