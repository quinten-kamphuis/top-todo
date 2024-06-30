export default function logger(){
    message = (value) => {
        alert(value)
    }
    log = (value) => {
        console.log(value)
    }
    warn = (value) => {
        console.warn(value)
    }
    error = (value) => {
        console.error('Something went wrong:' + value)
    }
    return{
        message,
        log,
        warn,
        error
    }
}