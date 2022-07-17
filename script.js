const BASE_URL = 'https://api.github.com/search/users'

const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('button')
const perPage = document.getElementById('count')
const userList = document.getElementById('users')
const selectUser = document.getElementById('select')
const selectedOrder = document.getElementById('select-order')
const nextButton = document.getElementById('next-button')
const prevButton = document.getElementById('prev-button')

let selectedSortValue = 'favorities'
let selectedOrderValue = 'desc'
let currentPage = 1
let inputValue = ''
let paginationLimit = 4
let pageCount

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

let users = []
const renderUserList = (data) => {
	users = []
	data.items.map((item) => {
		users.push(renderUsers(item))
	})
	userList.innerHTML = users.join('')
}

const changeInputValue = (e) => {
	inputValue = e.target.value.split(' ').join('')
}
const perPageInput = (e) => {
	paginationLimit = e.target.value.split(' ').join('')
}
const sortSelectedValue = (event) => {
	selectedSortValue = event.target.value
	getData()
}
const orderSelectedValue = (event) => {
	selectedOrderValue = event.target.value
	getData()
}
// pagination
const pagination = (data) => {
	pageCount = Math.ceil(data.total_count / paginationLimit)
}
const prevPage = () => {
	if (currentPage > 1) {
		currentPage--
		getData()
	}
}
const nextPage = () => {
	if (currentPage * paginationLimit < pageCount) {
		currentPage++
		getData()
	}
}
// getdata
const getData = async () => {
	const response = await fetch(
		`${BASE_URL}?q=${inputValue}&per_page=${paginationLimit}&sort=${selectedSortValue}&order=${selectedOrderValue}&page=${currentPage}`,
	)
	const data = await response.json()
	renderUserList(data)
	pagination(data)
}

selectUser.addEventListener('click', sortSelectedValue)
selectedOrder.addEventListener('click', orderSelectedValue)
searchButton.addEventListener('click', getData)
searchInput.addEventListener('change', changeInputValue)
perPage.addEventListener('change', perPageInput)
nextButton.addEventListener('click', nextPage)
prevButton.addEventListener('click', prevPage)
