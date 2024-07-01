import logger from './logger.js'
import validation from './validation.js';

const projects = []

const generateProjectId = () => {
    return projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
};

const generateTodoId = (projectId) => {
    const todos = findProject(projectId).todos
    return todos.length > 0 ? Math.max(...todos.map(p => p.id)) + 1 : 1;
};

const findProject = (projectId) => {
    if (typeof projectId !== 'number'){
        logger.error('Project ID was given as a string')
        return null
    }
    const project = projects.find(project => project.id === projectId)
    if (project) {
        return project
    }
    logger.error('The project could not be found')
    return null
}

const findProjectIndex = (projectId) => {
    if (typeof projectId !== 'number'){
        logger.error('Project ID was given as a string')
        return null
    }
    const index = projects.findIndex(project => project.id === projectId)
    if (index === -1) {
        logger.error('The project could not be found')
        return null
    }
    return index
}

const findTodoIndex = (projectId, id) => {
    const todos = findProject(projectId).todos
    const index = todos.findIndex(todo => todo.id === id)
    if (index !== -1) {
        return index
    }
    logger.error('The todo could not be found')
    return null
}

const deleteProject = (projectId) => {
    const index = findProjectIndex(projectId)
    if (index === null) {
        return false
    }
    projects.splice(index, 1);
    logger.message("Project and it's todo's where successfully deleted")
    return true
}

const addProject = (name) => {
    if (!validation.validateProjectName(name)) {
        return false
    }
    const project = {
        id: generateProjectId(),
        name: name,
        todos: [],
    }
    // logger.message('Project successfully added')
    projects.push(project)
    return true
}

const editProjectName = (id, name) => {
    const index = findProjectIndex(id)
    if (index === null) {
        return false
    }
    if (!validation.validateProjectName(name)) {
        return false
    }
    projects[index].name = name
    return true
}

const deleteTodo = (projectId, id) => {
    const projectIndex = findProjectIndex(projectId)
    if (projectIndex === null) {
        return false
    }
    const todoIndex = findTodoIndex(projectId, id)
    if (todoIndex === null) {
        return false
    }
    projects[projectIndex].todos.splice(todoIndex, 1);
    logger.message("Todo was successfully deleted")
    return true
}

const addTodo = (projectId, title, description) => {
    if (!validation.validateTodoTitle(title)) {
        return false
    }
    if (!validation.validateTodoDescription(description)) {
        return false
    }
    const projectIndex = findProjectIndex(projectId)
    if (projectIndex === null) {
        return false
    }
    projects[projectIndex].todos.push({
        id: generateTodoId(projectId),
        title: title,
        description: description,
    })
    // logger.message('Todo successfully added')
    return true
}

const editTodo = (projectId, id, title, description) => {
    if (!validation.validateTodoTitle(title)) {
        return false
    }
    if (!validation.validateTodoDescription(description)) {
        return false
    }
    const projectIndex = findProjectIndex(projectId)
    if (projectIndex === null) {
        return false
    }
    const todoIndex = findTodoIndex(projectId, id)
    if (todoIndex === null) {
        return false
    }
    projects[projectIndex].todos[todoIndex].title = title
    projects[projectIndex].todos[todoIndex].description = description
    return true
}

const getProjects = () => projects

export default {
    findProjectIndex,
    findTodoIndex,
    deleteProject,
    addProject,
    editProjectName,
    deleteTodo,
    addTodo,
    editTodo,
    getProjects,
}