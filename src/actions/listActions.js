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

export function addContact(contact){
    return{
        type: "ADD_CONTACT",
        payload: contact
    }
}

