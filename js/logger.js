const message = (value) => {
    alert(value)
}
const log = (value) => {
    console.log(value)
}
const warn = (value) => {
    console.warn(value)
}
const error = (value) => {
    console.error('Something went wrong: ' + value)
}
export default {
    message,
    log,
    warn,
    error
}