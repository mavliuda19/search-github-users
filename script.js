const BASE_URL = 'https://api.github.com/search/users'

const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('button')
const perPage = document.getElementById('count')
const userList = document.getElementById('users')
const selectUser = document.getElementById('select')
const selectedOrder = document.getElementById('select-order')

let selectedSortValue = 'favorities'
let selectedOrderValue = 'desc'

const renderUsers = ({ avatar_url, login, html_url }) => {
	return `
	<div class="user-container">
	<div class="user-data">
	<div class="avatar-wrapper">
	<img class="avatar" src=${avatar_url}/>
	<div>
	<p>${login}</p>
	<a href=${html_url}>link to github</a>
	</div>
	</div>
	<div class="button-wrapper">
	<button>star</button>
	<button class="header-button">Show repositories</button>
	</div>
	</div>
	</div>`
}

const renderUserList = (data) => {
	let users = []
	data.items.map((item) => {
		users.push(renderUsers(item))
	})
	userList.innerHTML = users
}

const sortSelectedValue = (event) => {
	selectedSortValue = event.target.value
}
const orderSelectedValue = (event) => {
	selectedOrderValue = event.target.value
}

const searchUser = async () => {
	const inputValue = searchInput.value.split(' ').join('')
	const countValue = count.value.split(' ').join('')
	const response = await fetch(
		`${BASE_URL}?q=${inputValue}&per_page=${countValue}&sort=${selectedSortValue}&order=${selectedOrderValue}`,
	)
	const data = await response.json()
	renderUserList(data)
}

selectUser.addEventListener('click', sortSelectedValue)
selectedOrder.addEventListener('click', orderSelectedValue)
selectUser.addEventListener('click', searchUser)
selectedOrder.addEventListener('click', searchUser)
searchButton.addEventListener('click', searchUser)
