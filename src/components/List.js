import React, {useEffect, useState} from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer'
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete'
import {connect} from 'react-redux'
import {getContacts, setUpdate, setSelected, deleteContact} from "../actions/listActions";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

function ContactList (props) {
    //load all contacts on component mount (ComponentWillMount hook)
    const [open, setOpen] = useState(false)
    const [deleting, setDeleting] = useState(null)
    const handleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        props.getContacts()
    }, [])

    //each contact. Index is passed as prop from the virtualized list so it knows which one to render
    const Row = ({ index, style }) => {
        const contact = props.listState.filtered[index]
        return(
            <div className={props.listState.selectedIndex === index ? "list-item selected" : "list-item"} style={style}
                 onClick={() => {
                     props.setSelected(index)
                     props.setUpdate(true)
                 }}>
                <div className="col-md-1">
                    <Avatar/>
                </div>
                <div className="col-md-9">
                    <ul className="info-list">
                        <li>
                            <h5>{`${contact.first_name} ${contact.last_name}`}</h5>
                        </li>
                        <li>{contact.phone}</li>
                        <li>{contact.email}</li>
                    </ul>
                </div>
                <div className="col-md-1">
                    <IconButton onClick={() => {
                        setOpen(true)
                        setDeleting(contact.id)
                    }}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        )};

    return (
        <div className="flex-grow-1">
            <AutoSizer>
                {({ height, width }) => (
                    //Virtualized list. It just renders the amount of contacts that can fit in the screen for performance reasons
                    <List
                        className="List"
                        height={height}
                        itemCount={props.listState ? props.listState.filtered.length : 0}
                        itemSize={75}
                        width={width}
                    >
                        {Row}
                    </List>
                )}
            </AutoSizer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the contact?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button color="primary" autoFocus onClick={() => {
                        props.deleteContact(deleting)
                        setOpen(false)
                        props.setUpdate(null)
                        props.setSelected(null)
                    }}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        listState: state.list
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: () => {
            dispatch(getContacts())
        },
        setUpdate: (update) => {
            dispatch(setUpdate(update))
        },
        setSelected: (index) => {
            dispatch(setSelected(index))
        },
        deleteContact: (id) => {
            dispatch(deleteContact(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)