(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.getElementById('data-panel')

  // const for display mode
  const displayMode = document.getElementById('display-mode')
  const DISPLAY_MODE_CARD = 'card-mode'
  const DISPLAY_MODE_LIST = 'list-mode'
  let currentMode = 'card-mode'

  let currentPage = 1

  const searchBtn = document.getElementById('submit-search')
  const searchInput = document.getElementById('search')

  const pagination = document.getElementById('pagination')
  const ITEM_PER_PAGE = 12

  let paginationData = []

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    getTotalPages(data)
    getPageData(1, data)
  }).catch((err) => console.log(err))

  // listen to data panel
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    } else if (event.target.matches('.btn-add-favorite')) {
      addFavoriteItem(event.target.dataset.id)
    }
  })

  // listen displayMode to switch display mode(function displayDataList())


  displayMode.addEventListener('click', event => {
    currentMode = event.target.id
    getPageData(currentPage)
  })

  // display mode
  function displayDataList(data) {
    let htmlContent = ''
    if (currentMode === DISPLAY_MODE_CARD) {
      data.forEach(function (item, index) {
        htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h5>
            </div>

            <div class="card-footer">
              <!-- "More" button -->
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>

              <!-- favorite button -->
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      `
      })
    } else if (currentMode === DISPLAY_MODE_LIST) {
      data.forEach(function (item, index) {
        htmlContent += `
        <div class="col-12">
          <div class="mb-2 border-top">
            <div class="movie-item-body row p-3">
              <h6 class="card-title col">${item.title}</h5>
              <div class="col text-center">
              <!-- "More" button -->
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>

              <!-- favorite button -->
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
            </div>

            
          </div>
        </div>
      `
      })
    }
    dataPanel.innerHTML = htmlContent
  }

  function showMovie(id) {
    // get elements
    const modalTitle = document.getElementById('show-movie-title')
    const modalImage = document.getElementById('show-movie-image')
    const modalDate = document.getElementById('show-movie-date')
    const modalDescription = document.getElementById('show-movie-description')

    // set request url
    const url = INDEX_URL + id

    // send request to show api
    axios.get(url).then(response => {
      const data = response.data.results

      // insert data into modal ui
      modalTitle.textContent = data.title
      modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
      modalDate.textContent = `release at : ${data.release_date}`
      modalDescription.textContent = `${data.description}`
    })
  }


  // listen to search btn click event
  searchBtn.addEventListener('click', event => {
    event.preventDefault()

    let results = []
    const regex = new RegExp(searchInput.value, 'i')

    results = data.filter(movie => movie.title.match(regex))
    console.log(results)

    getTotalPages(results)
    getPageData(1, results)

  })

  // add favorite movie
  function addFavoriteItem(id) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movie = data.find(item => item.id === Number(id))

    if (list.some(item => item.id === Number(id))) {
      alert(`${movie.title} is already in your favorite list.`)
    } else {
      list.push(movie)
      alert(`Added ${movie.title} to your favorite list!`)
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(list))
  }

  // get total page from data


  function getTotalPages(data) {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
    let pageItemContent = ''
    for (let i = 0; i < totalPages; i++) {
      pageItemContent += `
        <li class="page-item">
          <a class="page-link" herf="javascript:;" data-page="${i + 1}">${i + 1}</a> 
        </li>
      `
    }
    pagination.innerHTML = pageItemContent
  }
  // listen to pagination
  pagination.addEventListener('click', event => {
    currentPage = event.target.dataset.page
    if (event.target.tagName === 'A') {
      getPageData(currentPage)
    }
  })

  // display pages data

  function getPageData(pageNum, data) {
    currentPage = pageNum || currentPage
    paginationData = data || paginationData
    let offset = (currentPage - 1) * ITEM_PER_PAGE
    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
    displayDataList(pageData)
  }
})()