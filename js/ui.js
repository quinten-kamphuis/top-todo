import projects from "./projects.js"

const projectsList = document.querySelector('.projects-list')
const todoList = document.querySelector('.todos-list')

const loadTodos = (projectsArray, projectId) => {
    todoList.innerHTML = ''
    if (projectId === 0) {
        return false
    }
    if (projectsArray.length === 0) {
        return false
    }
    const projectIndex = projects.findProjectIndex(projectId)
    const todos = projectsArray[projectIndex].todos
    todos.forEach(todo => {
        todoList.innerHTML += `<div class="list-item todo-item" id="id-${todo.id}"><h4>${todo.title}</h4><button class="open-button"><p>:</p></button></div>`
    });
    return true
}

const updateProjects = (projectsArray) => {
    projectsList.innerHTML = ''
    if (projectsArray.length === 0) return false
    projectsArray.forEach(project => {
        projectsList.innerHTML += `<div class="list-item project-item" id="id-${project.id}"><h3 class="project-id-${project.id}">${project.name}</h3><button class="open-button"><p>:</p></button></div>`
    });
    return true
}

const updateSelectedProject = (id) => {
    projectsList.childNodes.forEach(project => {
        project.classList.remove('selected')
        const projectId = parseInt(project.id.split('-').pop())
        if (projectId === id) {
            project.classList.add('selected')
        } 
    })
}

export default {
    loadTodos,
    updateProjects,
    updateSelectedProject,
}