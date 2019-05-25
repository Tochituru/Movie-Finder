const apiKey = '8499e5e340f4886fd910c1fc4b904db1';
const currentPage = 1;
const resultToInclude = 4;
const resultToRemove = 15;
const categoryPopular = document.querySelector('.category-popular')
const categoryTopRated = document.querySelector('.category-top-rated')
const categoryUpcoming = document.querySelector('.category-upcoming')
const categoryNowPlaying = document.querySelector('.category-now-playing')

const resultsPopular = document.getElementById('popular-list')
const resultsTopRated = document.getElementById('top-rated-list')
const resultsUpcoming = document.getElementById('upcoming-list')
const resultsNowPlaying = document.getElementById('now-playing-list')
const movieList = document.querySelector('.results-list')

function createCategoryTitle(categoryApiName, categoryName, resultList, movieArray) {

    for (let i = 0; i < movieArray.length; i++) {
        if (categoryApiName) {

            const movieCard = document.createElement('li');
            movieCard.classList.add('movie-card');

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

        }
        //Agregar modal
    }
    console.log('Se ejecutó CreateCategory');
    
}

//fetch básico con createCategory

function fetchData(splice, categoryApiName, categoryName, resultList) {
    const movieUrl = `https://api.themoviedb.org/3/movie/${categoryApiName}?api_key=${apiKey}&page=${currentPage}`;
    fetch(movieUrl)
        .then(res => res.json())
        .then(movie => {
            let movieObject = movie.results;
            if (splice) {
                movieObject.splice(resultToInclude, resultToRemove)
            }
            console.log('objeto JSON', movieObject)
            createCategoryTitle(categoryApiName, categoryName, resultList, movieObject);

        });
    console.log(movieUrl)
    console.log('Se ejecutó Fetch');

};

function removeChildrenAndNewData(splice, categoryApiName, categoryName, resultList) {
    const background = document.querySelector('.background');
    background.classList.add('hide');
    while (resultsPopular.children.length > 0) {
        resultsPopular.children[0].remove();
    }
    while (resultsTopRated.children.length > 0) {
        resultsTopRated.children[0].remove();
    }
    while (resultsUpcoming.children.length > 0) {
        resultsUpcoming.children[0].remove();
    }
    while (resultsNowPlaying.children.length > 0) {
        resultsNowPlaying.children[0].remove();
    }
    categoryPopular.children[0].classList.add('hide');
    categoryTopRated.children[0].classList.add('hide');
    categoryUpcoming.children[0].classList.add('hide');
    categoryNowPlaying.children[0].classList.add('hide');

    fetchData(splice, categoryApiName, categoryName, resultList);
    console.log('Se ejecutó RemoveChild')
};

//Eventos básicos de onload
document.onload = fetchData(true, 'popular', categoryPopular, resultsPopular);
document.onload = fetchData(true, 'top_rated', categoryTopRated, resultsTopRated);
document.onload = fetchData(true, 'upcoming', categoryUpcoming, resultsUpcoming);
document.onload = fetchData(true, 'now_playing', categoryNowPlaying, resultsNowPlaying)


const viewAllBtn = document.getElementById('view-btn-popular')
console.log(viewAllBtn);


//viewAllBtn.onclick = removeChildrenAndNewData(false, 'popular', categoryPopular, resultsPopular);

//document.search = fetchData(false) - me deja no hacer el splice (para la búsqueda)
