import logger from "./logger.js"

const validateProjectName = (name) => {
    if (!name) {
        logger.message('Name is not a valid name')
        return false
    }
    return true
}
const validateTodoTitle = (title) => {
    if (!title) {
        logger.message('Title is not valid')
        return false
    }
    return true
}
const validateTodoDescription = (description) => {
    if (!description) {
        logger.message('Description is not valid')
        return false
    }
    return true
}

export default{
    validateProjectName,
    validateTodoTitle,
    validateTodoDescription,
}