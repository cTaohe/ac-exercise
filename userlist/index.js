(function () {
  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
  const INDEX_URL = BASE_URL + '/api/v1/users/'
  const dataPanel = document.querySelector('#data-panel')
  const data = []

  const navBar = document.querySelector('.navbar')

  const pagination = document.getElementById('pagination')
  const ITEM_PER_PAGE = 12

  const searchInput = document.getElementById('search')
  const searchBtn = document.getElementById('search-submit')

  let currentPage = 1

  let pagingationData = []
  axios.get(INDEX_URL).then(response => {
    response.data.results.forEach(newResponse => {
      data.push({ ...newResponse, favorite: false })
    })
    display(data)
  }).catch((error) => console.log(error))


  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
      <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mt-5 text-center" style="">
        <img class="card-img-top" src="${item.avatar}" alt="Card image cap">
        <div class="card-body row">
          <p class="card-text col-8">${item.name}</p>
          <!-- favorite button -->
          <div class="col-4 favorite-icon" data-id="${item.id}"><i class="fas fa-heart fa-2x" data-id="${item.id}"></i></div>
          <!-- "More" button -->
          <button type="button" class="btn btn-primary btn-user-info" style="width: 100%;" data-toggle="modal" data-target="#user-modal" data-id="${item.id}">More Info</button>

        </div>
      </div>
    `
    })
    dataPanel.innerHTML = htmlContent
  }

  // 顯示more資訊  
  function showMore(id) {
    const modalTitle = document.getElementById('user-name')
    const modalImage = document.getElementById('user-image')
    const modalDescription = document.getElementById('user-description')

    const url = INDEX_URL + id
    axios.get(url).then(response => {
      const data = response.data

      modalTitle.innerHTML = `${data.name} ${data.surname}`
      modalImage.innerHTML = `<img src="${data.avatar}">`
      modalDescription.innerHTML = `<p>Email: <em>${data.email}</em></p>
<p>Birthday: ${data.birthday}</p>
<p>Age: ${data.age}</p>
<p>Region: ${data.region}</p>`
    })
  }

  // listen more info
  dataPanel.addEventListener('click', (event) => {
    console.log(event.target)
    if (event.target.matches('.btn-user-info')) {
      showMore(event.target.dataset.id)
    } else if (event.target.matches('.fa-heart')) {
      event.target.classList.toggle('favorited')
      favorited(event.target.dataset.id)
    }
  })

  // search bar


  searchBtn.addEventListener('click', event => {
    event.preventDefault()
    let results = []
    const regex = new RegExp(searchInput.value, 'i')

    results = data.filter(user => user.name.match(regex))
    getTotalPage(results)
    getPageData(1, results)
  })

  // get total page


  function getTotalPage(data) {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
    let pageItemContent = ''

    for (let i = 0; i < totalPages; i++) {
      pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="#" data-page="${i + 1}">${i + 1}</a>
        </li>
      `
    }
    pagination.innerHTML = pageItemContent
  }


  function getPageData(pageNum, data) {
    pagingationData = data || pagingationData
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = pagingationData.slice(offset, offset + ITEM_PER_PAGE)
    displayDataList(pageData)
  }

  function display(data) {
    displayDataList(data)
    getTotalPage(data)
    getPageData(1, data)
  }

  pagination.addEventListener('click', event => {
    currentPage = event.target.dataset.page
    console.log(event.target)
    if (event.target.tagName === 'A') {
      getPageData(currentPage)
    }
  })
  // 轉換favotire的boolean
  function favorited(id) {
    data[id - 1].favorite = data[id - 1].favorite ? false : true
    console.log(data[id - 1])
  }

  // 監聽導覽列
  navBar.addEventListener('click', (event) => {
    console.log(event.target)
    if (event.target.matches('#home')) {
      display(data)

    } else if (event.target.matches('#favorite')) {
      const favoriteUser = data.filter(person => person.favorite === true)
      display(favoriteUser)
    }
  })
})()
