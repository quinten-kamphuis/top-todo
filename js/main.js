import projects from "./projects.js"
import ui from "./ui.js"
import logger from "./logger.js"

let idOfProjectSelected = 0;
let idOfProjectEditing = 0;
let idOfTodoEditing = 0;

const addProjectModal = document.querySelector('#add-project-modal')
const addTodoModal = document.querySelector('#add-todo-modal')
const editProjectModal = document.querySelector('#edit-project-modal')
const editTodoModal = document.querySelector('#edit-todo-modal')
const sureModal = document.querySelector('#sure-modal')

const addProjectInput = document.querySelector('#add-project-modal .title-input')
const addTodoTitleInput = document.querySelector('#add-todo-modal .title-input')
const addTodoDescriptionInput = document.querySelector('#add-todo-modal .description-input')
const editProjectInput = document.querySelector('#edit-project-modal .title-input')
const editTodoTitleInput = document.querySelector('#edit-todo-modal .title-input')
const editTodoDescriptionInput = document.querySelector('#edit-todo-modal .description-input')

const cancelAll = () => {
    addProjectInput.value = ''
    addTodoTitleInput.value = ''
    addTodoDescriptionInput.value = ''
    editProjectInput.value = ''
    editTodoTitleInput.value = ''
    editTodoDescriptionInput.value = ''

    addProjectModal.close()
    addTodoModal.close()
    editProjectModal.close()
    editTodoModal.close()
}

const confirmAction = (message, callback) => {
    sureModal.querySelector('p').textContent = message || "Think about it..."
    sureModal.showModal()

    const actionConfirmed = () => {
        sureModal.removeEventListener('close', actionConfirmed);
        const result = sureModal.returnValue === 'confirm'
        callback(result)
    }

    sureModal.addEventListener('close', actionConfirmed);
}
  


document.addEventListener('click', e => {

    //Add project
    if (e.target.matches('#add-project')){
        addProjectModal.showModal()
    }

    //Add todo
    if (e.target.matches('#add-todo')){
        if (!idOfProjectSelected) {
            logger.message('Create and/or select a project before adding a todo')
            return false
        }
        addTodoModal.showModal()
    }

    //Save add project
    if (e.target.matches('.save-add-project-button')){
        if (projects.addProject(addProjectInput.value)) {
            addProjectInput.value = ''
            const projectsArray = projects.getProjects()
            ui.updateProjects(projectsArray);
            ui.updateSelectedProject(idOfProjectSelected)
            addProjectModal.close()
        }    
    }

    //Save add todo
    if (e.target.matches('.save-add-todo-button')){
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
            addTodoModal.close()
        }
    }

    //Open project
    if (e.target.matches('.list-item.project-item h3')) {
        const projectId = parseInt(e.target.className.split('-').pop())
        idOfProjectSelected = projectId
        ui.updateSelectedProject(idOfProjectSelected)
        const projectIndex = projects.findProjectIndex(projectId)
        const projectsArray = projects.getProjects()
        ui.loadTodos(projectsArray, projectIndex)
    }

    //Edit project
    if (e.target.matches('.list-item.project-item .open-button')) {
        const projectId = parseInt(e.target.parentNode.id.split('-').pop());
        idOfProjectEditing = projectId
        editProjectInput.value = e.target.parentElement.childNodes[0].textContent
        editProjectModal.showModal()
    }

    //Edit Todo
    if (e.target.matches('.list-item.todo-item .open-button')) {
        const id = parseInt(e.target.parentNode.id.split('-').pop());
        idOfTodoEditing = id
        if (!idOfProjectSelected) {
            logger.error('Tried to edit a todo without having a project selected')
            return false
        }
        editTodoTitleInput.value = e.target.parentElement.childNodes[0].textContent
        editTodoDescriptionInput.value = e.target.parentElement.childNodes[0].textContent
        editTodoModal.showModal()
    }

    //Save edit project
    if (e.target.matches('.save-edit-project-button')) {
        if (projects.editProjectName(idOfProjectEditing, editProjectInput.value)) {
            editProjectInput.value = ''
            const projectsArray = projects.getProjects()
            ui.updateProjects(projectsArray);
            ui.updateSelectedProject(idOfProjectSelected)
            editProjectModal.close()
        }
    }

    //Save edit todo
    if (e.target.matches('.save-edit-todo-button')) {
        if (!idOfProjectSelected) {
            logger.error('Tried to save a todo without a selected project')
            return false
        }
        if (projects.editTodo(idOfProjectSelected, idOfTodoEditing, editTodoTitleInput.value, editTodoDescriptionInput.value)) {
            editTodoTitleInput.value = ''
            editTodoDescriptionInput.value = ''
            const projectsArray = projects.getProjects()
            const projectIndex = projects.findProjectIndex(idOfProjectSelected)
            ui.loadTodos(projectsArray, projectIndex);
            editTodoModal.close()
        }
    }

    //Delete project
    if (e.target.matches('.delete-project-button')) {
        confirmAction("Deletion of a project will also delete it's todo's", (confirmed) => {
            if (confirmed) {
                if (projects.deleteProject(idOfProjectEditing)) {
                    const projectsArray = projects.getProjects()
                    ui.updateProjects(projectsArray);
                    ui.updateSelectedProject(idOfProjectSelected)
                    logger.message("Project and it's todo's where successfully deleted")
                    cancelAll();
                }
            }
        })
    }

    //Delete todo
    if (e.target.matches('.delete-todo-button')) {
        confirmAction("Deleting a todo is irreversible", (confirmed) => {
            if (confirmed) {
                if (projects.deleteTodo(idOfProjectSelected, idOfTodoEditing)) {
                    const projectsArray = projects.getProjects()
                    const projectIndex = projects.findProjectIndex(idOfProjectSelected)
                    ui.loadTodos(projectsArray, projectIndex);
                    editTodoModal.close()
                    cancelAll();
                }
            }
        })
    }

    //Cancel all
    if (e.target.matches('.cancel-button')) {
        cancelAll();
    }
})