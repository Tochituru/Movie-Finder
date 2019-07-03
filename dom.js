const apiKey = '8499e5e340f4886fd910c1fc4b904db1';
let pageLoaded = 1;
const resultToInclude = 4;
const resultToRemove = 15;

const background = document.querySelector('.background');

const bodyMain = document.querySelector('main');

const categoryPopular = document.querySelector('.category-popular');
const categoryTopRated = document.querySelector('.category-top-rated');
const categoryUpcoming = document.querySelector('.category-upcoming');
const categoryNowPlaying = document.querySelector('.category-now-playing');
const categorySearch = document.querySelector('.category-search');

const resultsPopular = document.getElementById('popular-list');
const resultsTopRated = document.getElementById('top-rated-list');
const resultsUpcoming = document.getElementById('upcoming-list');
const resultsNowPlaying = document.getElementById('now-playing-list');
const resultsSearch = document.getElementById('search-results-list');

const navBarBtn = document.getElementsByClassName('nav-btn');
const totalResultsElem = document.getElementsByClassName('total-results');
const viewAllBtn = document.getElementsByClassName('view-all-btn');
const loadMoreBtn = document.getElementsByClassName('load-more');

function CreateResultsInCategory(splice, categoryName, resultList, movieArray, currentPage, categoryNumberResults, totalPages) {

    for (let j = 0; j < totalResultsElem.length; j++) {
        if (categoryName === categoryPopular) {
            totalResultsElem[0].innerText = `${categoryNumberResults} Results`;
            if (currentPage === totalPages) {
                loadMoreBtn[0].classList.add('hide');
            }
        } else if (categoryName === categoryTopRated) {
            totalResultsElem[1].innerText = `${categoryNumberResults} Results`;
            if (currentPage === totalPages) {
                loadMoreBtn[2].classList.add('hide');
            }
        } else if (categoryName === categoryUpcoming) {
            totalResultsElem[2].innerText = `${categoryNumberResults} Results`;
            if (currentPage === totalPages) {
                loadMoreBtn[2].classList.add('hide');
            }
        } else if (categoryName === categoryNowPlaying) {
            totalResultsElem[3].innerText = `${categoryNumberResults} Results`;
            if (currentPage === totalPages) {
                loadMoreBtn[3].classList.add('hide');
            }

        } else if (categoryName === categorySearch) {
            totalResultsElem[4].innerText = `${categoryNumberResults} Results`;
            if (currentPage === totalPages) {
                loadMoreBtn[4].classList.add('hide');
            }
        }
    }

    for (let i = 0; i < movieArray.length; i++) {

        const movieCard = document.createElement('li');
        movieCard.classList.add('movie-card');
        if (splice) {
            movieCard.classList.add('home');
        }

        const moviePicture = document.createElement('figure');
        moviePicture.classList.add('movie-img');

        const movieImg = document.createElement('img');
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/original${movieArray[i].poster_path}`);
        if (movieArray[i].poster_path === null) {
            movieImg.setAttribute('src', './assets/no-pic-available.png');
        }

        const movieTitle = document.createElement('figcaption');
        movieTitle.classList.add('movie-title')
        movieTitle.innerText = movieArray[i].title;

        resultList.appendChild(movieCard);
        movieCard.appendChild(moviePicture);
        moviePicture.appendChild(movieImg);
        movieCard.appendChild(movieTitle);

        const movieId = movieArray[i].id;

        //acá arranca el modal
        const modalMovieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&page=${currentPage}`;
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
                if (modalMovie.backdrop_path === null) {
                    modalHeader.style.backgroundImage = `url(./assets/no-img-available.jpg)`;
                }
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
                if (modalMovie.poster_path === null) {
                    modalPosterImg.setAttribute('src', './assets/no-pic-available.png');
                }

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
                modalMovie.overview === 0 ? modalMovieSummary.innerText = 'Who knows what this movie is about?' : modalMovieSummary.innerText = modalMovie.overview;

                const modalMovieGenreTitle = document.createElement('h3');
                modalMovieGenreTitle.classList.add('modal-heading');
                modalMovieGenreTitle.innerText = 'GENRES';

                const modalMovieGenresContent = document.createElement('div');
                modalMovieGenresContent.classList.add('modal-text')
                let movieGenres = modalMovie.genres.map((j) => ` ${j.name}`);
                movieGenres.length > 0 ? modalMovieGenresContent.innerText = movieGenres : modalMovieGenresContent.innerText = `Why do you need to put everything in boxes?`;

                const modalMovieReleaseDateTitle = document.createElement('h3');
                modalMovieReleaseDateTitle.classList.add('modal-heading');
                modalMovieReleaseDateTitle.innerText = 'RELEASE DATE';
                const modalMovieReleaseDateContent = document.createElement('div');
                dataReleaseDate = modalMovie.release_date;
                dataReleaseDate.length > 0 ? modalMovieReleaseDateContent.innerText = modalMovie.release_date : modalMovieReleaseDateContent.innerText = `How did this even got released?`
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

            })
    }
}

//fetch básico con createCategory

function fetchData(splice, categoryApiName, categoryName, resultList, currentPage) {
    const movieUrl = `https://api.themoviedb.org/3/movie/${categoryApiName}?api_key=${apiKey}&page=${currentPage}`;
    fetch(movieUrl)
        .then(res => res.json())
        .then(movie => {
            let movieObject = movie.results;
            const categoryNumberResults = movie.total_results;
            let totalPages = movie.total_pages;
            if (splice) {
                movieObject.splice(resultToInclude, resultToRemove)
            }
            CreateResultsInCategory(splice, categoryName, resultList, movieObject, pageLoaded, categoryNumberResults, totalPages);
        });
};


//Eventos básicos de onload
document.onload = fetchData(true, 'popular', categoryPopular, resultsPopular, pageLoaded);
document.onload = fetchData(true, 'top_rated', categoryTopRated, resultsTopRated, pageLoaded);
document.onload = fetchData(true, 'upcoming', categoryUpcoming, resultsUpcoming, pageLoaded);
document.onload = fetchData(true, 'now_playing', categoryNowPlaying, resultsNowPlaying, pageLoaded)

function removeChildrenAndNewData(splice, categoryApiName, categoryName, resultList, currentPage) {
    background.classList.add('hide');
    pageLoaded = 1;

    while (resultsSearch.children.length > 0) {
        resultsSearch.children[0].remove();
    }
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
    fetchData(splice, categoryApiName, categoryName, resultList, currentPage);

    if (categoryName === categoryPopular) {
        categoryPopular.classList.add('margin-top');
        resultsPopular.classList.remove('home');
        categoryTopRated.classList.add('hide');
        categoryUpcoming.classList.add('hide');
        categoryNowPlaying.classList.add('hide');
        categorySearch.classList.add('hide');
        totalResultsElem[0].classList.remove('hide');
        viewAllBtn[0].classList.add('hide');
        loadMoreBtn[0].classList.remove('hide');
    } else if (categoryName === categoryTopRated) {
        categoryTopRated.classList.add('margin-top');
        resultsTopRated.classList.remove('home');
        categoryPopular.classList.add('hide');
        categoryUpcoming.classList.add('hide');
        categoryNowPlaying.classList.add('hide');
        categorySearch.classList.add('hide');
        totalResultsElem[1].classList.remove('hide');
        viewAllBtn[1].classList.add('hide');
        loadMoreBtn[1].classList.remove('hide');
    } else if (categoryName === categoryUpcoming) {
        categoryUpcoming.classList.add('margin-top');
        resultsUpcoming.classList.remove('home');
        categoryPopular.classList.add('hide');
        categoryTopRated.classList.add('hide');
        categoryNowPlaying.classList.add('hide');
        categorySearch.classList.add('hide');
        totalResultsElem[2].classList.remove('hide');
        viewAllBtn[2].classList.add('hide');
        loadMoreBtn[2].classList.remove('hide');
    } else if (categoryName === categoryNowPlaying) {
        categoryNowPlaying.classList.add('margin-top');
        resultsNowPlaying.classList.remove('home');
        categoryPopular.classList.add('hide');
        categoryTopRated.classList.add('hide');
        categoryUpcoming.classList.add('hide');
        categorySearch.classList.add('hide');
        totalResultsElem[3].classList.remove('hide');
        viewAllBtn[3].classList.add('hide');
        loadMoreBtn[3].classList.remove('hide');
    }
};


function loadMore(splice, categoryApiName, categoryName, resultList) {
    pageLoaded += 1;
    fetchData(splice, categoryApiName, categoryName, resultList, pageLoaded);
}

viewAllBtn[0].onclick = () => removeChildrenAndNewData(false, 'popular', categoryPopular, resultsPopular, pageLoaded);
loadMoreBtn[0].onclick = () => loadMore(false, 'popular', categoryPopular, resultsPopular);

viewAllBtn[1].onclick = () => removeChildrenAndNewData(false, 'top_rated', categoryTopRated, resultsTopRated, pageLoaded);
loadMoreBtn[1].onclick = () => loadMore(false, 'top_rated', categoryTopRated, resultsTopRated);

viewAllBtn[2].onclick = () => removeChildrenAndNewData(false, 'upcoming', categoryUpcoming, resultsUpcoming, pageLoaded);
loadMoreBtn[2].onclick = () => loadMore(false, 'upcoming', categoryUpcoming, resultsUpcoming);

viewAllBtn[3].onclick = () => removeChildrenAndNewData(false, 'now_playing', categoryNowPlaying, resultsNowPlaying, pageLoaded)
loadMoreBtn[3].onclick = () => loadMore(false, 'now_playing', categoryNowPlaying, resultsNowPlaying);

const logoBtn = document.querySelector('.logo');

logoBtn.onclick = () => {

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
    for (let i = 0; i < viewAllBtn.length; i++) {
        totalResultsElem[i].classList.add('hide');
        viewAllBtn[i].classList.remove('hide');
        loadMoreBtn[i].classList.add('hide');
    }

    categoryTopRated.classList.remove('hide');
    categoryUpcoming.classList.remove('margin-top');
    categoryUpcoming.classList.remove('hide');
    categoryTopRated.classList.remove('margin-top');
    categoryNowPlaying.classList.remove('hide');
    categoryNowPlaying.classList.remove('margin-top');
    categorySearch.classList.add('hide');

    navBarBtn[0].classList.remove('category-selected');
    navBarBtn[1].classList.remove('category-selected');
    navBarBtn[2].classList.remove('category-selected');
    navBarBtn[3].classList.remove('category-selected');

    fetchData(true, 'popular', categoryPopular, resultsPopular, pageLoaded);
    fetchData(true, 'top_rated', categoryTopRated, resultsTopRated, pageLoaded);
    fetchData(true, 'upcoming', categoryUpcoming, resultsUpcoming, pageLoaded);
    fetchData(true, 'now_playing', categoryNowPlaying, resultsNowPlaying, pageLoaded);
}


navBarBtn[0].onclick = () => {
    removeChildrenAndNewData(false, 'popular', categoryPopular, resultsPopular, pageLoaded);
    if (!navBarBtn[0].classList.contains('category-selected')) {
        navBarBtn[0].classList.add('category-selected');
    };
    if (!categoryPopular.classList.contains('margin-top')) {
        categoryPopular.classList.add('margin-top')
    };
    if (categoryPopular.classList.contains('hide')) {
        categoryPopular.classList.remove('hide')
    };
    if (!categoryTopRated.classList.contains('hide')) { categoryTopRated.classList.add('hide') };
    if (!categoryUpcoming.classList.contains('hide')) { categoryUpcoming.classList.add('hide') };
    if (!categoryNowPlaying.classList.contains('hide')) { categoryNowPlaying.classList.add('hide') };
    navBarBtn[1].classList.remove('category-selected');
    navBarBtn[2].classList.remove('category-selected');
    navBarBtn[3].classList.remove('category-selected');

};
navBarBtn[1].onclick = () => {
    removeChildrenAndNewData(false, 'top_rated', categoryTopRated, resultsTopRated, pageLoaded);
    if (!navBarBtn[1].classList.contains('category-selected')) {
        navBarBtn[1].classList.add('category-selected');
    };
    if (!categoryTopRated.classList.contains('margin-top')) { categoryTopRated.classList.add('margin-top') };
    if (categoryTopRated.classList.contains('hide')) {
        categoryTopRated.classList.remove('hide')
    };
    if (!categoryPopular.classList.contains('hide')) { categoryPopular.classList.add('hide') };
    if (!categoryUpcoming.classList.contains('hide')) { categoryUpcoming.classList.add('hide') };
    if (!categoryNowPlaying.classList.contains('hide')) { categoryNowPlaying.classList.add('hide') };
    navBarBtn[0].classList.remove('category-selected');
    navBarBtn[2].classList.remove('category-selected');
    navBarBtn[3].classList.remove('category-selected');

};
navBarBtn[2].onclick = () => {
    removeChildrenAndNewData(false, 'upcoming', categoryUpcoming, resultsUpcoming, pageLoaded);
    if (!navBarBtn[2].classList.contains('category-selected')) {
        navBarBtn[2].classList.add('category-selected');
    };
    if (!categoryUpcoming.classList.contains('margin-top')) { categoryUpcoming.classList.add('margin-top') };
    if (categoryUpcoming.classList.contains('hide')) {
        categoryUpcoming.classList.remove('hide')
    };
    if (!categoryPopular.classList.contains('hide')) { categoryPopular.classList.add('hide') };
    if (!categoryTopRated.classList.contains('hide')) { categoryTopRated.classList.add('hide') };
    if (!categoryNowPlaying.classList.contains('hide')) { categoryNowPlaying.classList.add('hide') };
    navBarBtn[0].classList.remove('category-selected');
    navBarBtn[1].classList.remove('category-selected');
    navBarBtn[3].classList.remove('category-selected');

};
navBarBtn[3].onclick = () => {
    removeChildrenAndNewData(false, 'now_playing', categoryNowPlaying, resultsNowPlaying, pageLoaded);
    categoryUpcoming.classList.add('hide');
    if (!navBarBtn[3].classList.contains('category-selected')) {
        navBarBtn[3].classList.add('category-selected');
    };
    if (!categoryNowPlaying.classList.contains('margin-top')) { categoryNowPlaying.classList.add('margin-top') };
    if (categoryNowPlaying.classList.contains('hide')) {
        categoryNowPlaying.classList.remove('hide')
    };
    if (!categoryPopular.classList.contains('hide')) { categoryPopular.classList.add('hide') };
    if (!categoryTopRated.classList.contains('hide')) { categoryTopRated.classList.add('hide') };
    if (!categoryUpcoming.classList.contains('hide')) { categoryUpcoming.classList.add('hide'); };
    navBarBtn[0].classList.remove('category-selected');
    navBarBtn[1].classList.remove('category-selected');
    navBarBtn[2].classList.remove('category-selected');

};


//Search 
const searchElement = document.querySelector('input');

function SearchElements(categoryName, resultList, currentPage) {

    background.classList.add('hide');

    categorySearch.classList.add('margin-top');
    categorySearch.classList.remove('hide');

    categoryPopular.classList.add('hide');
    categoryTopRated.classList.add('hide');
    categoryUpcoming.classList.add('hide');
    categoryNowPlaying.classList.add('hide');

    totalResultsElem[4].classList.remove('hide');
    loadMoreBtn[4].classList.remove('hide');


    while (resultsSearch.children.length > 0) {
        resultsSearch.children[0].remove();
    };


    fetchSearchData(categoryName, resultList, currentPage)
};

function fetchSearchData(categoryName, resultList, currentPage) {
    const searchText = searchElement.value;

    const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}&page=${currentPage}`;

    fetch(searchMovieUrl)
        .then(res => res.json())
        .then(searchMovie => {
            let searchMovieObject = searchMovie.results;
            let resultsFromCategory = searchMovie.total_results;
            let totalPages = searchMovie.total_pages;

            CreateResultsInCategory(false, categoryName, resultList, searchMovieObject, pageLoaded, resultsFromCategory, totalPages);
        });
}

function searchLoadMore(categoryName, resultList) {
    pageLoaded += 1;
    fetchSearchData(categoryName, resultList, pageLoaded)
}

searchElement.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        SearchElements(categorySearch, resultsSearch, pageLoaded);
        loadMoreBtn[4].onclick = () => searchLoadMore(categorySearch, resultsSearch);
    }
})

//responsive
const hamburgerMenu = document.getElementById('hamburger');
const navBar = document.getElementById('nav-bar');
hamburgerMenu.onclick = () => {
    if (navBar.style.display === 'none') {
        navBar.style.display = 'block';
        background.classList.add('hide');
        navBarBtn[0].onclick = () => {
            navBar.style.display = 'none';
            background.classList.remove('hide');
            removeChildrenAndNewData(false, 'popular', categoryPopular, resultsPopular, pageLoaded);
            if (!navBarBtn[0].classList.contains('category-selected')) {
                navBarBtn[0].classList.add('category-selected');
            };
            if (!categoryPopular.classList.contains('margin-top')) {
                categoryPopular.classList.add('margin-top')
            };
            if (categoryPopular.classList.contains('hide')) {
                categoryPopular.classList.remove('hide')
            };
            if (!categoryTopRated.classList.contains('hide')) { categoryTopRated.classList.add('hide') };
            if (!categoryUpcoming.classList.contains('hide')) { categoryUpcoming.classList.add('hide') };
            if (!categoryNowPlaying.classList.contains('hide')) { categoryNowPlaying.classList.add('hide') };
            navBarBtn[1].classList.remove('category-selected');
            navBarBtn[2].classList.remove('category-selected');
            navBarBtn[3].classList.remove('category-selected');

        };
        navBarBtn[1].onclick = () => {
            navBar.style.display = 'none';
            background.classList.remove('hide');

            removeChildrenAndNewData(false, 'top_rated', categoryTopRated, resultsTopRated, pageLoaded);
            if (!navBarBtn[1].classList.contains('category-selected')) {
                navBarBtn[1].classList.add('category-selected');
            };
            if (!categoryTopRated.classList.contains('margin-top')) { categoryTopRated.classList.add('margin-top') };
            if (categoryTopRated.classList.contains('hide')) {
                categoryTopRated.classList.remove('hide')
            };
            if (!categoryPopular.classList.contains('hide')) { categoryPopular.classList.add('hide') };
            if (!categoryUpcoming.classList.contains('hide')) { categoryUpcoming.classList.add('hide') };
            if (!categoryNowPlaying.classList.contains('hide')) { categoryNowPlaying.classList.add('hide') };
            navBarBtn[0].classList.remove('category-selected');
            navBarBtn[2].classList.remove('category-selected');
            navBarBtn[3].classList.remove('category-selected');

        };
        navBarBtn[2].onclick = () => {
            navBar.style.display = 'none';
            background.classList.remove('hide');

            removeChildrenAndNewData(false, 'upcoming', categoryUpcoming, resultsUpcoming, pageLoaded);
            if (!navBarBtn[2].classList.contains('category-selected')) {
                navBarBtn[2].classList.add('category-selected');
            };
            if (!categoryUpcoming.classList.contains('margin-top')) { categoryUpcoming.classList.add('margin-top') };
            if (categoryUpcoming.classList.contains('hide')) {
                categoryUpcoming.classList.remove('hide')
            };
            if (!categoryPopular.classList.contains('hide')) { categoryPopular.classList.add('hide') };
            if (!categoryTopRated.classList.contains('hide')) { categoryTopRated.classList.add('hide') };
            if (!categoryNowPlaying.classList.contains('hide')) { categoryNowPlaying.classList.add('hide') };
            navBarBtn[0].classList.remove('category-selected');
            navBarBtn[1].classList.remove('category-selected');
            navBarBtn[3].classList.remove('category-selected');

        };
        navBarBtn[3].onclick = () => {
            navBar.style.display = 'none';
            background.classList.remove('hide');

            removeChildrenAndNewData(false, 'now_playing', categoryNowPlaying, resultsNowPlaying, pageLoaded);
            categoryUpcoming.classList.add('hide');
            if (!navBarBtn[3].classList.contains('category-selected')) {
                navBarBtn[3].classList.add('category-selected');
            };
            if (!categoryNowPlaying.classList.contains('margin-top')) { categoryNowPlaying.classList.add('margin-top') };
            if (categoryNowPlaying.classList.contains('hide')) {
                categoryNowPlaying.classList.remove('hide')
            };
            if (!categoryPopular.classList.contains('hide')) { categoryPopular.classList.add('hide') };
            if (!categoryTopRated.classList.contains('hide')) { categoryTopRated.classList.add('hide') };
            if (!categoryUpcoming.classList.contains('hide')) { categoryUpcoming.classList.add('hide'); };
            navBarBtn[0].classList.remove('category-selected');
            navBarBtn[1].classList.remove('category-selected');
            navBarBtn[2].classList.remove('category-selected');

        };
        logoBtn.onclick = () => {
            navBar.style.display = 'none';
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
            for (let i = 0; i < viewAllBtn.length; i++) {
                totalResultsElem[i].classList.add('hide');
                viewAllBtn[i].classList.remove('hide');
                loadMoreBtn[i].classList.add('hide');
            }

            categoryTopRated.classList.remove('hide');
            categoryUpcoming.classList.remove('margin-top');
            categoryUpcoming.classList.remove('hide');
            categoryTopRated.classList.remove('margin-top');
            categoryNowPlaying.classList.remove('hide');
            categoryNowPlaying.classList.remove('margin-top');
            categorySearch.classList.add('hide');

            navBarBtn[0].classList.remove('category-selected');
            navBarBtn[1].classList.remove('category-selected');
            navBarBtn[2].classList.remove('category-selected');
            navBarBtn[3].classList.remove('category-selected');

            fetchData(true, 'popular', categoryPopular, resultsPopular, pageLoaded);
            fetchData(true, 'top_rated', categoryTopRated, resultsTopRated, pageLoaded);
            fetchData(true, 'upcoming', categoryUpcoming, resultsUpcoming, pageLoaded);
            fetchData(true, 'now_playing', categoryNowPlaying, resultsNowPlaying, pageLoaded);
        }
    } else {
        navBar.style.display = 'none';
        background.classList.remove('hide');
    }
}
