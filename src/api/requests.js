import axios from "axios";
import {Server} from '../config/app'

export const updateContact = (values) => {
    return axios.put(`${Server}/api/v1/contacts/${values.id}`, values)
}

export const createContact = (values) => {
    return axios.post(`${Server}/api/v1/contacts`, values)
}

export const getContacts = () => {
    return axios.get(`${Server}/api/v1/contacts`)
}

export const deleteContact = (id) => {
    return axios.delete(`${Server}/api/v1/contacts/${id}`)
}