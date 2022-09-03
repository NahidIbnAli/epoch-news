// Function for calling api to load category info 
const loadData = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    displayNewsCategories(data.data.news_category);
  }
  catch(error) {
    console.log(error);
  }    
}

// Function for display category name on ui
const displayNewsCategories = newsCategories => {
    const categoryContainer = document.getElementById('category-container');
    newsCategories.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('nav-item', 'cursor');
        li.setAttribute('onclick', `loadNews(${category.category_id}, '${category.category_name}')`);
        li.innerText = `${category.category_name}`
        categoryContainer.appendChild(li);
    })
}

// Function for calling api using category id dynamically
const loadNews = async (categoryId, categoryName) => {
    // Start loader
    toggleSpinner(true);
    try {
      const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`);
      const data = await res.json();
      const arrayOfObject = data.data;
      arrayOfObject.sort((a, b) => b.total_view - a.total_view);
      displayNews(arrayOfObject, categoryName);
    }
    catch(error) {
      console.log(error);
    }
    
}

// Function for display all news of a category on a section dynamically
const displayNews = (news, name='Breaking News') => {
    const noDataFoundField = document.getElementById('no-data-found-field');
    if(news.length === 0) {
        noDataFoundField.classList.remove('d-none')
    }
    else {
        noDataFoundField.classList.add('d-none')
    }
    document.getElementById('found-item').innerText = `${news.length} items found for this category ${name}`
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    news.forEach(news => {
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
                    <h4 class="card-title fw-bold">${news.title}</h4>
                    <p class="card-text text-muted">${news.details.slice(0, 500) + '...'}</p>
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

// Function for calling api by using news id dynamically
const loadDetail = async newsId => {
    try {
      const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
      const data = await res.json();
      displayNewsDetail(data.data[0]);
    }
    catch(error) {
      console.log(error);
    }
    
}

// Function for display news detail info on the modal dynamically
const displayNewsDetail = newsDetails => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${newsDetails.image_url}" class="img-fluid w-100 rounded-start" alt="..." />
    <h4 class="my-2">${newsDetails.title}</h4>
    <div class="d-flex align-items-center gap-3 my-3">
          <div>
            <img src="${newsDetails.author.img}" width="50px" class="rounded-circle" alt="" />
          </div>
          <div>
            <p class="m-0 fw-semibold">${newsDetails.author.name ? newsDetails.author.name : 'No data found'}</p>
            <small class="text-muted">${newsDetails.author.published_date ? newsDetails.author.published_date : 'No data found'}</small>
          </div>
    </div>
    <div class="my-4">
        <p>${newsDetails.details}</p>
    </div>
    <div>
        <p class="text-center">
            <i class="fa-regular fa-eye"></i>
            <span class="fw-semibold">${newsDetails.total_view ? newsDetails.total_view : 'No data found'}</span>
        </p>
    </div>
    `
    modalContainer.appendChild(div);
}

// Function for loading spinner
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader-section');
  if(isLoading) {
      loaderSection.classList.remove('d-none');
  }
  else {
      loaderSection.classList.add('d-none');
  }
}

loadNews(1);

loadData();