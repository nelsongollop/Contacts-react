import * as API from '../api/requests'

export function getContacts () {
    return{
        type: "GET_CONTACTS",
        payload: new Promise((resolve, reject) => {
            API.getContacts()
                .then(
                    (result) => {
                        resolve(result.data)
                    },
                    (error) => {
                        reject(error)
                    }
                )
        })
    }
}

export function deleteContact (id) {
    return{
        type: "GET_CONTACTS",
        payload: new Promise((resolve, reject) => {
            API.deleteContact(id)
                .then(
                    (result) => {
                        resolve(result.data)
                    },
                    (error) => {
                        reject(error)
                    }
                )
        })
    }
}

export function filter(keywords) {
    return {
        type: "FILTER_LIST",
        payload: keywords
    }
}

export function setUpdate(update){
    return{
        type: "SET_UPDATE",
        payload: update
    }
}

export function setSelected(index){
    return{
        type: "SET_SELECTED",
        payload: index
    }
}

export function setContacts(list){
    return{
        type: "SET_CONTACTS",
        payload: list
    }
}
