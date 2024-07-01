const toaster = document.createElement('div');
toaster.id = 'toaster';
document.body.appendChild(toaster);

function showToast(message, type = 'info', duration = 3000) {
    const msg = document.createElement('div');
    msg.classList.add('toaster-msg', type, 'show');
    msg.textContent = message;

    toaster.appendChild(msg);

    setTimeout(() => {
        msg.classList.remove('show');
        setTimeout(() => toaster.removeChild(msg), 500); // Allow for fade out
    }, duration);
}

const message = (value) => {
    showToast(value, 'info');
}
const log = (value) => {
    console.log(value)
}
const warn = (value) => {
    showToast(value, 'warning');
}
const error = (value) => {
    showToast(value, 'error');
}

export default {
    message,
    log,
    warn,
    error
}