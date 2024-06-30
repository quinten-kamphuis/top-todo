import logger from './logger'

const projects = []

const generateId = () => {
    return projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
};

const findProject = (id) => {
    const index = projects.findIndex(project => project.id === id)
    if (index !== -1) {
        return index
    }
    return null
}

const confirmDeletion = () => {
    if (prompt('Are you sure? (type: "yes")') === 'yes'){
        return true
    }
    return false
}

const deleteProject = (id) => {
    if (!confirmDeletion()) {
        logger.log('User canceled the deletion')
        return false
    }
    const index = findProject(id)
    if (index === null) {
        logger.error('The project could not be found')
        return false
    }
    projects.splice(index, 1);
    return true
}

const validateProjectName = (name) => {
    if (!name) return false
    return true
}

const addProject = (name) => {
    if (!validateProjectName(name)) {
        logger.message('Name is not a valid name')
        return false
    }
    const project = {
        id: generateId(),
        name: name
    }
    projects.push(project)
    return true
}

const editProjectName = (id, name) => {
    const index = findProject(id)
    if (index === null) {
        logger.error('The project could not be found')
        return false
    }
    if (!validateProjectName(name)) {
        logger.message('Name is not a valid name')
        return false
    }
    projects[index].name = name
    return true
}

export {
    deleteProject,
    addProject,
    editProjectName
}