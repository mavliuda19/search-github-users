const favoriteList = document.getElementById('favoriteList')

const renderUsers = (data) => {
	const { avatar_url, login, html_url } = data
	return `
	<div class="user-container">
	<div class="user-data">
	<div class="avatar-wrapper">
	<img class="avatar" src=${avatar_url}/>
	<div class="wrapper-info">
	<p>${login}</p>
	<a href=${html_url}>link to github</a>
	</div>
	</div>
	<div class="wrapper-info btn">
	<button  class="_button starred" id="add-favorites" onclick="deleteFromFavorities(event)" data-user ='${JSON.stringify(
		data,
	)}' >Starred</button>
	<button class="_button" onclick="showRepositories(event)" data-repos ='${JSON.stringify(
		data,
	)}'><a href="./repositories.html">Show repositories</a></button>
	</div>
	</div>
	</div>`
}

const renderFavorities = () => {
	let data = JSON.parse(localStorage.getItem('favoriteUsers')) || []
	let users = []
	data.map((item) => {
		users.push(renderUsers(item))
	})
	favoriteList.innerHTML = users.join('')
	if (data.length === 0) {
		favoriteList.innerHTML = `<h3 class='error-message'>you haven't added any user to favorites</h3>`
	}
}

const deleteFromFavorities = (event) => {
	let data = JSON.parse(localStorage.getItem('favoriteUsers')) || []
	let currentUser = JSON.parse(event.currentTarget.dataset.user)
	let existedUser = data.filter((item) => item.id !== currentUser.id)
	localStorage.setItem('favoriteUsers', JSON.stringify(existedUser))
	renderFavorities()
}
const showRepositories = (event) => {
	let currentUser = JSON.parse(event.currentTarget.dataset.repos)
	localStorage.setItem('userRepositories', JSON.stringify(currentUser))
}

renderFavorities()
