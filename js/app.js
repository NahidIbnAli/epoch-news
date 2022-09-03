const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayNewsCategories(data.data.news_category))
}

const displayNewsCategories = (newsCategories) => {
    const categoryContainer = document.getElementById('category-container');
    newsCategories.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('nav-item', 'cursor');
        li.setAttribute('onclick', `loadNews(${category.category_id})`)
        li.innerText = `${category.category_name}`
        categoryContainer.appendChild(li);
    })
}

const loadNews = categoryId => {
    fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`)
    .then(res => res.json())
    .then(data => displayAllNewsInACategory(data.data))
}

const displayAllNewsInACategory = allNews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach(news => {
        console.log(news)
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
                          <p class="m-0 fw-semibold">${news.author.name}</p>
                          <small class="text-muted">${news.author.published_date}</small>
                        </div>
                      </div>
                      <div>
                        <p class="d-flex align-items-center gap-2 m-0">
                          <i class="fa-regular fa-eye"></i>
                          <span class="fw-semibold">${news.total_view}</span>
                        </p>
                      </div>
                      <div>
                        <p class="d-flex gap-2 m-0">
                          <i class="fa-solid fa-star-half-stroke"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                        </p>
                      </div>
                      <div>
                        <p class="text-primary cursor m-0">
                          <i class="fa-solid fa-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `
        newsContainer.appendChild(div);
    })
}

loadData();