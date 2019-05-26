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

            //modal
            const modalContainer = document.createElement('aside');
            modalContainer.classList.add('modal-container');
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            modalContent.innerText = 'This is a nice modal';

            categoryName.appendChild(modalContainer);
            //should be attached to bodyMain?
            modalContainer.appendChild(modalContent);

            const modalBackground = document.createElement('figure');
            modalBackground.innerText = 'This is the modal Background';
            const modalMovieTitle = document.createElement('h1');
            modalMovieTitle.innerText = 'This is the movie title';
            const modalMovieTagline = document.createElement('h2');
            modalMovieTagline.innerText = 'This is the tagline';
            const modalBackgroundImg = document.createElement('div');
            modalBackgroundImg.innerText = 'This is the modal Background img';
            //hacer el div en img

            modalContent.appendChild(modalBackground);
            modalBackground.appendChild(modalMovieTitle);
            modalBackground.appendChild(modalMovieTagline);
            modalBackground.appendChild(modalBackgroundImg);


            const modalPoster = document.createElement('figure');
            modalPoster.innerText = 'This is the poster';
            const modalPosterImg = document.createElement('div');
            modalPosterImg.innerText = 'This is the poster img';
            //hacer el div en img

            modalContent.appendChild(modalPoster);
            modalPoster.appendChild(modalPosterImg);

            const modalMovieDescription = document.createElement('article');
            modalMovieDescription.innerText = 'This is the movie description';
            const modalMovieSummary = document.createElement('section');
            modalMovieSummary.innerText = 'This is the movie description';
            const modalMovieGenreTitle = document.createElement('h3');
            modalMovieGenreTitle.innerText = 'This is the Genre Title';
            const modalMovieGenresContent = document.createElement('div');
            modalMovieGenresContent.innerText = 'This is the Genre Content';
            const modalMovieReleaseDateTitle = document.createElement('h3');
            modalMovieReleaseDateTitle.innerText = 'This is the Release Title';
            const modalMovieReleaseDateContent = document.createElement('div');
            modalMovieReleaseDateContent.innerText = 'This is the Release content';

            modalContent.appendChild(modalMovieDescription);
            modalMovieDescription.appendChild(modalMovieSummary);
            modalMovieDescription.appendChild(modalMovieGenreTitle);
            modalMovieDescription.appendChild(modalMovieGenresContent);
            modalMovieDescription.appendChild(modalMovieReleaseDateTitle);
            modalMovieDescription.appendChild(modalMovieReleaseDateContent);



            movieCard.onclick = function OpenModal() {
                modalContainer.style.display = 'block';
            };

            // closeModalBtn.addEventListener('click', closeModal)

            // function closeModal() {
            //     modalContainer.style.display = 'none';
            //     console.log('the modal is closed with click');
            // }

            // window.addEventListener('click', clickOutsideModal)

            // function clickOutsideModal(e) {
            //     if (e.target === modalContainer) {
            //         modalContainer.style.display = 'none';
            //         console.log('the modal is closed outside the windo');
            //     }

            // }



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
    console.log(categoryName)
};

const viewAllBtn = document.getElementsByClassName('view-all-btn')
console.log(viewAllBtn);


viewAllBtn[0].onclick = () => removeChildrenAndNewData(false, 'popular', categoryPopular, resultsPopular);
viewAllBtn[1].onclick = () => removeChildrenAndNewData(false, 'top_rated', categoryTopRated, resultsTopRated);
viewAllBtn[2].onclick = () => removeChildrenAndNewData(false, 'upcoming', categoryUpcoming, resultsUpcoming);
viewAllBtn[3].onclick = () => removeChildrenAndNewData(false, 'now_playing', categoryNowPlaying, resultsNowPlaying)


