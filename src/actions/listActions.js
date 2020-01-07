import axios from "axios";

export function getContacts () {
    return{
        type: "GET_CONTACTS",
        payload: new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/api/v1/contacts')
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

