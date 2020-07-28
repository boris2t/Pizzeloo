// Setting this attribure is nessesery to target the element in css when it has a value (a style change happends)
const setAttribute = event => {
    if (event.target.value) {
        event.target.setAttribute('value', 'v')
    } else {
        event.target.setAttribute('value', '')
    }
}

export default setAttribute