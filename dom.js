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
};

//Eventos
document.onload = fetchData(true, 'popular', categoryPopular, resultsPopular);
document.onload = fetchData(true, 'top_rated', categoryTopRated, resultsTopRated);
document.onload = fetchData(true, 'upcoming', categoryUpcoming, resultsUpcoming);
document.onload = fetchData(true, 'now_playing', categoryNowPlaying, resultsNowPlaying)


const viewAllBtn = document.querySelectorAll('.view-all-btn')

viewAllBtn[0].onclick = fetchData(false, 'popular', categoryPopular, resultsPopular)


//viewAllBtn.onclick = alert("Hello! I am an alert box!!");

//View All Buton Button, fetch false 

//document.search = fetchData(false) - me deja no hacer el splice (para la búsqueda)


//crear evento para crear categoría sin splice y que se muestren en la página