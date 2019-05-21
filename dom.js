const apiKey = '8499e5e340f4886fd910c1fc4b904db1';
const currentPage = 1;
const categoryName = 'popular';
const resultToInclude = 4;
const resultToRemove = 15;

function createCategoryTitle(categoryName, movieArray) {

    //titulo de categoría
    let categoryList = document.querySelector('.category-list')
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');
    categoryContainer.classList.add(categoryName);
    const categoryHeader = document.createElement('div');
    categoryHeader.classList.add('category-header');

    const categoryTitle = document.createElement('h2');
    const UpperCaseTitle = categoryName.toUpperCase();
    categoryTitle.classList.add('category-title');
    categoryTitle.innerText = `${UpperCaseTitle} MOVIES`;

    const viewAllBtn = document.createElement('h2');
    viewAllBtn.classList.add('view-all-btn');
    viewAllBtn.textContent = 'View All';

    categoryList.appendChild(categoryContainer);
    categoryContainer.appendChild(categoryHeader);
    categoryHeader.appendChild(categoryTitle);
    categoryHeader.appendChild(viewAllBtn);

    //resultados-películas
    const resultPage = document.querySelector('article');
    const resultSection = document.createElement('section');
    const resultList = document.createElement('ul');
    resultList.classList.add('results-list');
    resultSection.classList.add('result-section')

    categoryContainer.appendChild(resultSection);
    resultSection.appendChild(resultList);

    for (let i = 0; i < movieArray.length; i++) {
        if (categoryName) {
            const movieCard = document.createElement('li');
            movieCard.classList.add('movie');

            const moviePicture = document.createElement('figure');
            moviePicture.classList.add('movie-img');

            const movieImg = document.createElement('img');
            movieImg.setAttribute('src', `https://image.tmdb.org/t/p/original${movieArray[i].poster_path}`);

            const movieTitle = document.createElement('figcaption');
            movieTitle.classList.add('movie-title')
            movieTitle.innerText = movieArray[i].title;

            resultList.appendChild(movieCard);
            movieCard.appendChild(moviePicture);
            moviePicture.appendChild(movieImg);
            movieCard.appendChild(movieTitle);

        } else {
            article.innerHTML = 'No results found';
        }
    }
    console.log(resultPage)


}




function fetchData(splice, categoryName) {

    const movieUrl = `https://api.themoviedb.org/3/movie/${categoryName}?api_key=${apiKey}&page=${currentPage}`;
    fetch(movieUrl)
        .then(res => res.json())
        .then(movie => {
            let movieObject = movie.results;
            if (splice) {
                movieObject.splice(resultToInclude, resultToRemove)
            }
            createCategoryTitle(categoryName, movieObject);
        });
        console.log(movieUrl)
};


document.onload = fetchData(true, 'popular');
document.onload = fetchData(true, 'top_rated');
document.onload = fetchData(true, 'upcoming');
document.onload = fetchData(true, 'now_playing');



//document.search = fetchData(false) - me deja no hacer el splice (para la búsqueda)


//Crear categoría popular


