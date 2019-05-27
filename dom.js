const apiKey = '8499e5e340f4886fd910c1fc4b904db1';
const currentPage = 1;
const resultToInclude = 4;
const resultToRemove = 15;

const bodyMain = document.querySelector('main');

const categoryPopular = document.querySelector('.category-popular')
const categoryTopRated = document.querySelector('.category-top-rated')
const categoryUpcoming = document.querySelector('.category-upcoming')
const categoryNowPlaying = document.querySelector('.category-now-playing')

const resultsPopular = document.getElementById('popular-list')
const resultsTopRated = document.getElementById('top-rated-list')
const resultsUpcoming = document.getElementById('upcoming-list')
const resultsNowPlaying = document.getElementById('now-playing-list')
const movieList = document.querySelector('.results-list')

function CreateResultsInCategory(categoryApiName, categoryName, resultList, movieArray) {

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

            const movieId = movieArray[i].id;

            //acá arranca el modal
            const modalMovieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
            fetch(modalMovieURL)
                .then(res => res.json())
                .then(modalMovieObject => {
                    let modalMovie = modalMovieObject;

                    //estos son los elementos del modal
                    const modalContainer = document.createElement('div');
                    modalContainer.classList.add('modal-container');
                    const modalContent = document.createElement('aside');
                    modalContent.classList.add('modal-content');
                    categoryName.appendChild(modalContainer);
                    modalContainer.appendChild(modalContent);


                    //el header del modal
                    const modalHeader = document.createElement('section');
                    modalHeader.classList.add('modal-header');
                    modalHeader.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${modalMovie.backdrop_path})`;

                    const modalMovieDetails = document.createElement('section');
                    modalMovieDetails.classList.add('modal-details');

                    const modalCloseBtn = document.createElement('div');
                    modalCloseBtn.innerText = 'X';
                    modalCloseBtn.setAttribute('id', 'closeBtn');
                    modalCloseBtn.classList.add('closeBtn');

                    const modalMovieTitle = document.createElement('h1');
                    modalMovieTitle.classList.add('modal-movie-title');
                    modalMovieTitle.innerText = modalMovie.title;

                    const modalMovieTagline = document.createElement('h2');
                    modalMovieTagline.classList.add('modal-movie-tagline');
                    modalMovieTagline.innerText = modalMovie.tagline;

                    const modalPoster = document.createElement('figure');
                    modalPoster.classList.add('modal-poster');
                    const modalPosterImg = document.createElement('img');
                    modalPosterImg.setAttribute('src', `https://image.tmdb.org/t/p/original${modalMovie.poster_path}`);

                    modalContent.appendChild(modalHeader)
                    modalHeader.appendChild(modalPoster);
                    modalPoster.appendChild(modalPosterImg);
                    modalHeader.appendChild(modalMovieDetails);
                    modalMovieDetails.appendChild(modalCloseBtn);
                    modalMovieDetails.appendChild(modalMovieTitle);
                    modalMovieDetails.appendChild(modalMovieTagline);

                    const modalMovieDescription = document.createElement('section');
                    modalMovieDescription.classList.add('modal-movie-description');

                    const modalMovieSummary = document.createElement('section');
                    modalMovieSummary.classList.add('modal-text');
                    modalMovieSummary.innerText = modalMovie.overview;

                    const modalMovieGenreTitle = document.createElement('h3');
                    modalMovieGenreTitle.classList.add('modal-heading');
                    modalMovieGenreTitle.innerText = 'GENRES';

                    const modalMovieGenresContent = document.createElement('div');
                    modalMovieGenresContent.classList.add('modal-text')
                    let movieGenres = modalMovie.genres.map((j) => {
                        return j.name;
                    });
                    modalMovieGenresContent.innerText = movieGenres;

                    const modalMovieReleaseDateTitle = document.createElement('h3');
                    modalMovieReleaseDateTitle.classList.add('modal-heading');
                    modalMovieReleaseDateTitle.innerText = 'RELEASE DATE';
                    const modalMovieReleaseDateContent = document.createElement('div');
                    modalMovieReleaseDateContent.innerText = modalMovie.release_date;
                    modalMovieReleaseDateContent.classList.add('modal-text')

                    modalContent.appendChild(modalMovieDescription);
                    modalMovieDescription.appendChild(modalMovieSummary);
                    modalMovieDescription.appendChild(modalMovieGenreTitle);
                    modalMovieDescription.appendChild(modalMovieGenresContent);
                    modalMovieDescription.appendChild(modalMovieReleaseDateTitle);
                    modalMovieDescription.appendChild(modalMovieReleaseDateContent);

                    movieCard.onclick = function OpenModal() {
                        modalContainer.style.display = 'block';
                    };

                    modalCloseBtn.addEventListener('click', closeModal)

                    function closeModal() {
                        modalContainer.style.display = 'none';
                    }

                    window.addEventListener('click', clickOutsideModal)

                    function clickOutsideModal(e) {
                        if (e.target === modalContainer) {
                            modalContainer.style.display = 'none';
                        }

                    }
                }
                )


        }
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
            CreateResultsInCategory(categoryApiName, categoryName, resultList, movieObject);
        });
};


//Eventos básicos de onload
document.onload = fetchData(true, 'popular', categoryPopular, resultsPopular);
document.onload = fetchData(true, 'top_rated', categoryTopRated, resultsTopRated);
document.onload = fetchData(true, 'upcoming', categoryUpcoming, resultsUpcoming);
document.onload = fetchData(true, 'now_playing', categoryNowPlaying, resultsNowPlaying)

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

    if (categoryName === categoryPopular) {
        categoryPopular.classList.add('margin-top');
        categoryTopRated.classList.add('hide');
        categoryUpcoming.classList.add('hide');
        categoryNowPlaying.classList.add('hide');
    } else if (categoryName === categoryTopRated) {
        categoryTopRated.classList.add('margin-top');
        categoryPopular.classList.add('hide');
        categoryUpcoming.classList.add('hide');
        categoryNowPlaying.classList.add('hide');
    } else if (categoryName === categoryUpcoming) {
        categoryUpcoming.classList.add('margin-top');
        categoryPopular.classList.add('hide');
        categoryTopRated.classList.add('hide');
        categoryNowPlaying.classList.add('hide');
    } else if (categoryName === categoryNowPlaying) {
        categoryNowPlaying.classList.add('margin-top');
        categoryPopular.classList.add('hide');
        categoryTopRated.classList.add('hide');
        categoryUpcoming.classList.add('hide');
    }
    fetchData(splice, categoryApiName, categoryName, resultList);
};

const viewAllBtn = document.getElementsByClassName('view-all-btn');


viewAllBtn[0].onclick = () => removeChildrenAndNewData(false, 'popular', categoryPopular, resultsPopular);
viewAllBtn[1].onclick = () => removeChildrenAndNewData(false, 'top_rated', categoryTopRated, resultsTopRated);
viewAllBtn[2].onclick = () => removeChildrenAndNewData(false, 'upcoming', categoryUpcoming, resultsUpcoming);
viewAllBtn[3].onclick = () => removeChildrenAndNewData(false, 'now_playing', categoryNowPlaying, resultsNowPlaying)

const logoBtn = document.querySelector('.logo');

logoBtn.onclick = () => {

    const background = document.querySelector('.background');
    background.classList.remove('hide');


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

    categoryPopular.classList.remove('hide');
    categoryPopular.classList.remove('margin-top');
    categoryTopRated.classList.remove('hide');
    categoryUpcoming.classList.remove('margin-top');
    categoryUpcoming.classList.remove('hide');
    categoryTopRated.classList.remove('margin-top');
    categoryNowPlaying.classList.remove('hide');
    categoryNowPlaying.classList.remove('margin-top');

    fetchData(true, 'popular', categoryPopular, resultsPopular);
    console.log(categoryPopular);
    fetchData(true, 'top_rated', categoryTopRated, resultsTopRated);
    console.log(categoryTopRated);
    fetchData(true, 'upcoming', categoryUpcoming, resultsUpcoming);
    console.log(categoryUpcoming);
    fetchData(true, 'now_playing', categoryNowPlaying, resultsNowPlaying);
    console.log(categoryNowPlaying);

}

const popularBtn = document.querySelector('.popular');
const topRatedBtn = document.querySelector('.top-rated');
const upcomingBtn = document.querySelector('.upcoming');
console.log(upcomingBtn);

const nowPlayingBtn = document.querySelector('.now-playing');

popularBtn.onclick = () => {
    removeChildrenAndNewData(false, 'popular', categoryPopular, resultsPopular);
    if (!categoryPopular.classList.contains('margin-top')) { categoryPopular.classList.add('margin-top') };
    if (categoryPopular.classList.contains('hide')) {
        categoryPopular.classList.remove('hide')
    };
    if (!categoryTopRated.classList.contains('hide')) { categoryTopRated.classList.add('hide') };
    if (!categoryUpcoming.classList.contains('hide')) { categoryUpcoming.classList.add('hide') };
    if (!categoryNowPlaying.classList.contains('hide')) { categoryNowPlaying.classList.add('hide') };
};
topRatedBtn.onclick = () => {
    removeChildrenAndNewData(false, 'top_rated', categoryTopRated, resultsTopRated);
    if (!categoryTopRated.classList.contains('margin-top')) { categoryTopRated.classList.add('margin-top') };
    if (categoryTopRated.classList.contains('hide')) {
        categoryTopRated.classList.remove('hide')
    };
    if (!categoryPopular.classList.contains('hide')) { categoryPopular.classList.add('hide') };
    if (!categoryUpcoming.classList.contains('hide')) { categoryUpcoming.classList.add('hide') };
    if (!categoryNowPlaying.classList.contains('hide')) { categoryNowPlaying.classList.add('hide') };
};
upcomingBtn.onclick = () => {
    removeChildrenAndNewData(false, 'upcoming', categoryUpcoming, resultsUpcoming);
    if (!categoryUpcoming.classList.contains('margin-top')) { categoryUpcoming.classList.add('margin-top') };
    if (categoryUpcoming.classList.contains('hide')) {
        categoryUpcoming.classList.remove('hide')
    };
    if (!categoryPopular.classList.contains('hide')) { categoryPopular.classList.add('hide') };
    if (!categoryTopRated.classList.contains('hide')) { categoryTopRated.classList.add('hide') };
    if (!categoryNowPlaying.classList.contains('hide')) { categoryNowPlaying.classList.add('hide') };
};
nowPlayingBtn.onclick = () => {
    removeChildrenAndNewData(false, 'now_playing', categoryNowPlaying, resultsNowPlaying);
    categoryUpcoming.classList.add('hide');

    if (!categoryNowPlaying.classList.contains('margin-top')) { categoryNowPlaying.classList.add('margin-top') };
    if (categoryNowPlaying.classList.contains('hide')) {
        categoryNowPlaying.classList.remove('hide')
    };
    if (!categoryPopular.classList.contains('hide')) { categoryPopular.classList.add('hide') };
    if (!categoryTopRated.classList.contains('hide')) { categoryTopRated.classList.add('hide') };
    if (!categoryUpcoming.classList.contains('hide')) { categoryUpcoming.classList.add('hide'); };

}
