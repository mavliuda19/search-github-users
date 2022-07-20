const user = document.getElementById('user-info')
const repositoriesList = document.getElementById('repositories')

const renderRepositories = ({ name, html_url }) => {
	return `
    <div class="repositories-container">
    <div class="user-data"> 
    <p>${name}</p>
    <button class="_button"> 
    <a href=${html_url}>Go To Github</a>
    </button>
    </div>
    </div>`
}

const getUserFromLocalStorage = () => {
	let users = []
	let data = JSON.parse(localStorage.getItem('userRepositories'))
	users.push(renderUsers(data))
	if (user) {
		user.innerHTML = users.join('')
	}
}

const renderUserRepositories = (data) => {
	let repositories = []
	data.map((item) => {
		repositories.push(renderRepositories(item))
	})
	repositoriesList.innerHTML = repositories.join('')
}

const getRepositories = async () => {
	let user = JSON.parse(localStorage.getItem('userRepositories'))
	const response = await fetch(
		`https://api.github.com/users/${user.login}/repos`,
	)
	const data = await response.json()
	renderUserRepositories(data)
	if (data.length < 1) {
		repositoriesList.innerHTML = `<h3 class='error-message'>Repositories not found!</h3>`
	}
}
getRepositories()
getUserFromLocalStorage()
