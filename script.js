const BASE_URL = 'https://api.github.com/search/users'

const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('button')
const perPageInput = document.getElementById('count')
const userList = document.getElementById('users')
const selectUser = document.getElementById('select')
const selectedOrder = document.getElementById('select-order')
const nextButton = document.getElementById('next-button')
const prevButton = document.getElementById('prev-button')
const pagination = document.getElementById('pagination')

let selectedSortValue = 'followers'
let selectedOrderValue = 'desc'
let currentPage = 1
let inputValue = ''
let paginationLimit = 4
let pageCount
let userData = []
let data = JSON.parse(localStorage.getItem('favoriteUsers')) || []

// render users
const renderUsers = (data) => {
	const { avatar_url, login, html_url, id } = data
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
	<button  class="_button star"  onclick="addToFavorities(event)" data-user ='${JSON.stringify(
		data,
	)}' >Star</button>
	<button class="_button" onclick="showRepositories(event)" data-repos ='${JSON.stringify(
		data,
	)}'><a href="./pages/repositories.html">Show repositories</a></button>
	</div>
	</div>
	</div>`
}

const renderUserList = (user) => {
	let users = []
	user.items.map((item) => {
		users.push(renderUsers(item))
	})
	userList.innerHTML = users.join('')
	pagination.className = 'pagination-visible _container'
}
// get input select value
const changeInputValue = (e) => {
	inputValue = e.target.value.split(' ').join('')
}
const changePerPageInputValue = (e) => {
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
const paginationControl = (data) => {
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
		prevButton.className = 'pagination-button'
		getData()
	}
	if (currentPage * paginationLimit >= pageCount) {
		nextButton.className = 'hidden'
	}
}
// loader
const loader = () => {
	let loader = `<div class="showbox">
  <div class="loader">
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterLimit="10" />
    </svg>
  </div>
</div>`
	userList.innerHTML = loader
}
// get Users
const getData = async () => {
	if (inputValue.trim() === '') {
		alert('Type user name to search!')
		return
	}
	loader()
	try {
		const response = await fetch(
			`${BASE_URL}?q=${inputValue}&per_page=${paginationLimit}&sort=${selectedSortValue}&order=${selectedOrderValue}&page=${currentPage}`,
		)
		const data = await response.json()
		renderUserList(data)
		paginationControl(data)
		userData = data.items
		if (data.total_count === 0) {
			userList.innerHTML = `<h3 class="error-message">User not found!</h3>`
			pagination.className = 'hidden'
		}
	} catch (error) {
		userList.innerHTML = `<h3 class="error-message">${error}</h3>`
		pagination.className = 'hidden'
	}
}
// add to favorities
const addToFavorities = (event) => {
	let currentUser = JSON.parse(event.currentTarget.dataset.user)
	let existedUser = data.find((item) => item.id === currentUser.id)
	if (!existedUser) {
		data.push(currentUser)
		localStorage.setItem('favoriteUsers', JSON.stringify(data))
	}
}
// show user repositories
const showRepositories = (event) => {
	let currentUser = JSON.parse(event.currentTarget.dataset.repos)
	localStorage.setItem('userRepositories', JSON.stringify(currentUser))
}

if (selectUser) {
	selectUser.addEventListener('click', sortSelectedValue)
}
if (selectedOrder) {
	selectedOrder.addEventListener('click', orderSelectedValue)
}
if (searchButton) {
	searchButton.addEventListener('click', getData)
}
if (searchInput) {
	searchInput.addEventListener('change', changeInputValue)
}
if (perPageInput) {
	perPageInput.addEventListener('change', changePerPageInputValue)
}
if (nextButton) {
	nextButton.addEventListener('click', nextPage)
}
if (prevButton) {
	prevButton.addEventListener('click', prevPage)
}
