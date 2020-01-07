import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button, InputBase} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"
import {connect} from "react-redux";
import {filter, setUpdate, setSelected} from '../actions/listActions'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    }
}));

const NavBar = (props) => {
    const classes = useStyles();
    const empty = {first_name: '', last_name:'', phone: '', email: ''}

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Contacts
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => props.filter(e.target.value)}
                        />
                    </div>
                    <div className={classes.title}/>
                    <Button variant="contained" color="secondary" onClick={() => {
                        props.onNew(empty)
                        props.setUpdate(false)
                        props.setSelected(-1)
                    }}>
                        New Contact
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        filter: (keyword) => {
            dispatch(filter(keyword))
        },
        setUpdate: (update) => {
            dispatch(setUpdate(update))
        },
        setSelected: (index) => {
            dispatch(setSelected(index))
        }
    }
}

export default connect(null, mapDispatchToProps)(NavBar)