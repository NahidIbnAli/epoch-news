const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayNewsCategories(data.data.news_category))
    .catch(error => console.log(error));
}

const displayNewsCategories = (newsCategories) => {
    const categoryContainer = document.getElementById('category-container');
    newsCategories.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('nav-item', 'cursor');
        li.setAttribute('onclick', `loadNews(${category.category_id})`);
        li.innerText = `${category.category_name}`
        categoryContainer.appendChild(li);
    })
}

const loadNews = categoryId => {
    // Start loader
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`)
    .then(res => res.json())
    .then(data => displayAllNewsInACategory(data.data))
    .catch(error => console.log(error));
}

const displayAllNewsInACategory = allNews => {
    const noDataFoundField = document.getElementById('no-data-found-field');
    if(allNews.length === 0) {
        noDataFoundField.classList.remove('d-none')
    }
    else {
        noDataFoundField.classList.add('d-none')
    }
    document.getElementById('found-item').innerText = `${allNews.length} items found for this category`
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach(news => {
        const div = document.createElement('div');
        div.classList.add('col-12');
        div.innerHTML = `
            <div class="card p-4 rounded-lg border-0 shadow-sm">
              <div class="row g-0">
                <div class="col-md-3">
                  <img src="${news.thumbnail_url}" class="img-fluid w-100 rounded-start" alt="..." />
                </div>
                <div class="col-md-9">
                  <div class="card-body ps-md-5">
                    <h5 class="card-title fw-bold">${news.title}</h5>
                    <p class="card-text text-muted text-truncate">${news.details}</p>
                    <div
                      class="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center gap-3">
                        <div>
                          <img src="${news.author.img}" width="50px" class="rounded-circle" alt="" />
                        </div>
                        <div>
                          <p class="m-0 fw-semibold">${news.author.name ? news.author.name : 'No data found'}</p>
                          <small class="text-muted">${news.author.published_date ? news.author.published_date : 'No data found'}</small>
                        </div>
                      </div>
                      <div>
                        <p class="d-flex align-items-center gap-2 m-0">
                          <i class="fa-regular fa-eye"></i>
                          <span class="fw-semibold">${news.total_view ? news.total_view : 'No data found'}</span>
                        </p>
                      </div>
                      <div>
                        <button onclick="loadDetail('${news._id}')" data-bs-toggle="modal"
                        data-bs-target="#modal" class="btn text-primary border-0">
                          <i class="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `
        newsContainer.appendChild(div);
    })
    // Stop loader
    toggleSpinner(false);
}

const loadDetail = async newsId => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await res.json();
    displayNewsDetail(data.data[0])
}

const displayNewsDetail = details => {
    console.log(details);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${details.image_url}" class="img-fluid w-100 rounded-start" alt="..." />
    <h4 class="my-2">${details.title}</h4>
    <div class="d-flex align-items-center gap-3 my-3">
          <div>
            <img src="${details.author.img}" width="50px" class="rounded-circle" alt="" />
          </div>
          <div>
            <p class="m-0 fw-semibold">${details.author.name ? details.author.name : 'No data found'}</p>
            <small class="text-muted">${details.author.published_date ? details.author.published_date : 'No data found'}</small>
          </div>
    </div>
    <div class="my-4">
        <p>${details.details}</p>
    </div>
    <div>
        <p class="text-center">
            <i class="fa-regular fa-eye"></i>
            <span class="fw-semibold">${details.total_view ? details.total_view : 'No data found'}</span>
        </p>
    </div>
    `
    modalContainer.appendChild(div);
}

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader-section');
  if(isLoading) {
      loaderSection.classList.remove('d-none');
  }
  else {
      loaderSection.classList.add('d-none');
  }
}

loadData();