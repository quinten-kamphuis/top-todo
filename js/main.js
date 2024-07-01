import projects from "./projects.js"
import ui from "./ui.js"
import logger from "./logger.js"

const addProjectButton = document.querySelector('#add-project')
const addProjectModal = document.querySelector('#add-project-modal')
const addProjectSave = document.querySelector('#add-project-modal .save-button')
const addProjectInput = document.querySelector('#add-project-modal .title-input')

const addTodoButton = document.querySelector('#add-todo')
const addTodoModal = document.querySelector('#add-todo-modal')
const addTodoSave = document.querySelector('#add-todo-modal .save-button')
const addTodoTitleInput = document.querySelector('#add-todo-modal .title-input')
const addTodoDescriptionInput = document.querySelector('#add-todo-modal .description-input')

const editProjectModal = document.querySelector('#edit-project-modal')
const editProjectSave = document.querySelector('#edit-project-modal .save-button')
const editProjectDelete = document.querySelector('#edit-project-modal .delete-button')
const editProjectInput = document.querySelector('#edit-project-modal .title-input')

const editTodoModal = document.querySelector('#edit-todo-modal')
const editTodoSave = document.querySelector('#edit-todo-modal .save-button')
const editTodoDelete = document.querySelector('#edit-todo-modal .delete-button')
const editTodoTitleInput = document.querySelector('#edit-todo-modal .title-input')
const editTodoDescriptionInput = document.querySelector('#edit-todo-modal .description-input')

let idOfProjectSelected = 0;

addProjectButton.addEventListener('click', () => {
    addProjectModal.showModal()
})

addTodoButton.addEventListener('click', () => {
    if (!idOfProjectSelected) {
        logger.message('Create and/or select a project before adding a todo')
        return false
    }
    addTodoModal.showModal()
})

document.addEventListener('click', e => {
    console.log(e.target)
})

addProjectSave.addEventListener('click', () => {
    if (projects.addProject(addProjectInput.value)) {
        addProjectInput.value = ''
        const projectsArray = projects.getProjects()
        ui.updateProjects(projectsArray);
        ui.updateSelectedProject(idOfProjectSelected)
        addEventListenersToProjects()
        addProjectModal.close()
    }
})

addTodoSave.addEventListener('click', () => {
    if (!idOfProjectSelected) {
        logger.error('Tried to save a todo without a selected project')
        return false
    }
    if (projects.addTodo(idOfProjectSelected, addTodoTitleInput.value, addTodoDescriptionInput.value)) {
        addTodoTitleInput.value = ''
        addTodoDescriptionInput.value = ''
        const projectsArray = projects.getProjects()
        const projectIndex = projects.findProjectIndex(idOfProjectSelected)
        ui.loadTodos(projectsArray, projectIndex);
        addEventListenersToTodos()
        addTodoModal.close()
    }
})

const saveProject = (id) => {
    if (projects.editProjectName(id, editProjectInput.value)) {
        editProjectInput.value = ''
        const projectsArray = projects.getProjects()
        ui.updateProjects(projectsArray);
        ui.updateSelectedProject(idOfProjectSelected)
        addEventListenersToProjects()
        editProjectModal.close()
    }
}

const saveTodo = (id) => {
    if (!idOfProjectSelected) {
        logger.error('Tried to save a todo without a selected project')
        return false
    }
    if (projects.addTodo(idOfProjectSelected, id, editTodoTitleInput.value, editTodoDescriptionInput.value)) {
        editTodoTitleInput.value = ''
        editTodoDescriptionInput.value = ''
        const projectsArray = projects.getProjects()
        const projectIndex = projects.findProjectIndex(idOfProjectSelected)
        ui.loadTodos(projectsArray, projectIndex);
        addEventListenersToTodos()
        addTodoModal.close()
    }
}

const addEventListenersToProjects = () => {
    document.querySelectorAll('.projects-list .list-item h3').forEach(elem => {
        elem.addEventListener('click', () => {
            const projectId = parseInt(elem.className.split('-').pop())
            idOfProjectSelected = projectId
            ui.updateSelectedProject(idOfProjectSelected)
            const projectIndex = projects.findProjectIndex(projectId)
            const projectsArray = projects.getProjects()
            ui.loadTodos(projectsArray, projectIndex)
        })
    })

    document.querySelectorAll('.projects-list .list-item .open-button').forEach(elem => {
        elem.addEventListener('click', () => {
            editProjectSave.addEventListener('click', () => {
                const id = parseInt(elem.parentNode.id.split('-').pop());
                saveProject(id)
            })
            editProjectInput.value = elem.parentElement.childNodes[0].textContent
            editProjectModal.showModal()
        })
    })
}

const addEventListenersToTodos = () => {
    document.querySelectorAll('.todos-list .list-item .open-button').forEach(elem => {
        elem.addEventListener('click', () => {
            if (!idOfProjectSelected) {
                logger.error('Tried to edit a todo without having a project selected')
                return false
            }
            editTodoModal.showModal()
        })
    })

    document.querySelectorAll('.todos-list .list-item .open-button').forEach(elem => {
        elem.addEventListener('click', () => {
            editTodoSave.addEventListener('click', () => {
                const id = parseInt(elem.parentNode.id.split('-').pop());
                saveTodo(id)
            })
            editTodoTitleInput.value = elem.parentElement.childNodes[0].textContent
            editTodoDescriptionInput.value = elem.parentElement.childNodes[0].textContent
            editProjectModal.showModal()
        })
    })
}