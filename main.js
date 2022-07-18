const favoriteList = document.getElementById('favoriteList')
const repositories = document.getElementById('repositories-list')
const repos = document.getElementById('repositories')
const OAUTHTOKEN = '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'

const renderRepos = (data) => {
	console.log(data)
	return `
    <div class="repos-container">
    <div class="user-data"> 
    <p>${data.name}</p>
    <button class="_button"> 
    <a href=${data.html_url}>Go To Github</a>
    </button>
    </div>
    </div>`
}

const renderFavorities = () => {
	let users = []
	let data = JSON.parse(localStorage.getItem('favoriteUsers'))
	console.log('a', data)
	data.map((item) => {
		users.push(renderUsers(item))
	})
	if (favoriteList) {
		favoriteList.innerHTML = users.join('')
	}
}
renderFavorities()

const getUser = () => {
	let users = []
	let data = JSON.parse(localStorage.getItem('userRepositories'))
	console.log('a', data)
	users.push(renderUsers(data))
	if (repositories) {
		repositories.innerHTML = users.join('')
	}
}
getUser()

const renderUserRepositories = (data) => {
	let repositories = []
	data.map((item) => {
		repositories.push(renderRepos(item))
	})
	if (repos) {
		repos.innerHTML = repositories.join('')
	}
}

const getRepositories = async () => {
	let user = JSON.parse(localStorage.getItem('userRepositories'))
	const response = await fetch(
		`https://api.github.com/users/${user.login}/repos`,
		{
			headers: {
				Authorization: `token ${OAUTHTOKEN}`,
			},
		},
	)
	const data = await response.json()
	console.log(data)
	renderUserRepositories(data)
}
getRepositories()
