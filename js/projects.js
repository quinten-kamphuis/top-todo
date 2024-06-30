import logger from './logger'
import validation from './validation';

const projects = []

const generateProjectId = () => {
    return projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
};

const generateTodoId = (projectId) => {
    const todos = findProject(projectId).todos
    return todos.length > 0 ? Math.max(...todos.map(p => p.id)) + 1 : 1;
};

const findProject = (projectId) => {
    const project = projects.find(project => project.id === projectId)
    if (project) {
        return project
    }
    logger.error('The project could not be found')
    return null
}

const findProjectIndex = (projectId) => {
    const index = projects.findIndex(project => project.id === projectId)
    if (index !== -1) {
        return index
    }
    logger.error('The project could not be found')
    return null
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

const confirmDeletion = () => {
    return new Promise((resolve) => {
        const userConfirmed = window.confirm('Are you sure? (click OK to confirm)');
        if (userConfirmed) {
            resolve(true);
        } else {
            logger.log('User canceled the deletion');
            resolve(false);
        }
    });
};

const deleteProject = async (id) => {
    if (!(await confirmDeletion())) {
        return false;
    }
    const index = findProjectIndex(id)
    if (index === null) {
        return false
    }
    projects.splice(index, 1);
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

const deleteTodo = async (projectId, id) => {
    if (!(await confirmDeletion())) {
        logger.log('User canceled the deletion')
        return false;
    }
    const projectIndex = findProjectIndex(projectId)
    if (projectIndex === null) {
        return false
    }
    const todoIndex = findTodoIndex(projectId, id)
    if (todoIndex === null) {
        return false
    }
    projects[projectIndex].todos.splice(todoIndex, 1);
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
    logger.message('Todo successfully added')
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

export default {
    deleteProject,
    addProject,
    editProjectName,
    deleteTodo,
    addTodo,
    editTodo,
}