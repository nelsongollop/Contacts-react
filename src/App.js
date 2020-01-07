import React, {useState} from "react";
import List from './components/List'
import NavBar from './components/NavBar'
import Contact from "./components/Contact";
import axios from 'axios'
import Unselected from "./components/dumb/unselected";
import {connect} from "react-redux";
import {getContacts, setSelected} from "./actions/listActions";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const App = (props) => {
    const [snackOpen, setOpen] = useState(false)

    const onSubmit = values => {
        console.log(values)
        if (values.id){
            axios.put(`http://localhost:3001/api/v1/contacts/${values.id}`, values)
                .then(
                    (result) => {
                        props.getContacts()
                        setOpen(true)
                        props.setSelected(null)
                    },
                    (error) => console.log(error)
                )

        } else {
            axios.post("http://localhost:3001/api/v1/contacts", values)
                .then(
                    (result) => {
                        props.getContacts()
                        setOpen(true)
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
