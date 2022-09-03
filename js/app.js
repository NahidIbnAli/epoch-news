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
        li.innerText = `${category.category_name}`
        categoryContainer.appendChild(li);
    })
}

loadData();