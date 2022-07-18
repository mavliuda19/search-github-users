const BASE_URL = 'https://api.github.com/search/users'

const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('button')
const perPage = document.getElementById('count')
const userList = document.getElementById('users')
const selectUser = document.getElementById('select')
const selectedOrder = document.getElementById('select-order')
const nextButton = document.getElementById('next-button')
const prevButton = document.getElementById('prev-button')
const addToFavorities = document.getElementById('add-favorites')

let selectedSortValue = 'favorities'
let selectedOrderValue = 'desc'
let currentPage = 1
let inputValue = ''
let paginationLimit = 4
let pageCount

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
	<div class="wrapper-info">
	<i class="bi bi-star-fill"><img src="./assets/icons/star.svg" class="star-icon" id="add-favorites" onclick="onClickCard(event)" data-user ='${JSON.stringify(
		data,
	)}' /></i>
	<button class="_button" class="header-button" onclick="showRepositories(event)" data-repos ='${JSON.stringify(
		data,
	)}'><a href="./pages/repositories.html" >Show repositories</a></button>
	</div>
	</div>
	</div>`
}

const renderUserList = (data) => {
	let users = []
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

let userData = []
const getData = async () => {
	loader()
	const response = await fetch(
		`${BASE_URL}?q=${inputValue}&per_page=${paginationLimit}&sort=${selectedSortValue}&order=${selectedOrderValue}&page=${currentPage}`,
	)
	const data = await response.json()
	renderUserList(data)
	pagination(data)
	userData = data.items
}
let data = []
function onClickCard(event) {
	let card = JSON.parse(event.currentTarget.dataset.user)
	let currentIndex = userData.find((el) => el.id === card.id)
	data.push(currentIndex)
	localStorage.setItem('favoriteUsers', JSON.stringify(data))
}

function showRepositories(event) {
	let card = JSON.parse(event.currentTarget.dataset.repos)
	console.log(card)
	let currentIndex = userData.find((el) => el.id === card.id)
	localStorage.setItem('userRepositories', JSON.stringify(currentIndex))
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
if (perPage) {
	perPage.addEventListener('change', perPageInput)
}
if (nextButton) {
	nextButton.addEventListener('click', nextPage)
}
if (prevButton) {
	prevButton.addEventListener('click', prevPage)
}
