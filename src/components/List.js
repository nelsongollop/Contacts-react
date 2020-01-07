import React, {useEffect} from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer'
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux'
import {getContacts, setUpdate, setSelected} from "../actions/listActions";

function ContactList (props) {
    useEffect(() => {
        props.getContacts()
    }, [])

    const Row = ({ index, style }) => (
        <div className={props.listState.selectedIndex === index ? "list-item selected" : "list-item"} style={style} onClick={() => {
            props.setSelected(index)
            props.setUpdate(true)
        }}>
            <div className="col-md-1">
                <Avatar>NG</Avatar>
            </div>
            <div className="col-md-11">
                <ul className="info-list">
                    <li><h5>{props.listState.filtered[index].first_name} {props.listState.filtered[index].last_name}</h5></li>
                    <li>{props.listState.filtered[index].phone}</li>
                    <li>{props.listState.filtered[index].email}</li>
                </ul>
            </div>
        </div>
    );

    return (
        <AutoSizer>
            {({ height, width }) => (
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)