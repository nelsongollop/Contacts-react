export const required = (value) => {
    if (!value || value === '') {
        return "This field is required"
    }
    return undefined
}

export const email = (value) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value.toLowerCase())) {
        return "Email is not valid"
    }
    return undefined
}