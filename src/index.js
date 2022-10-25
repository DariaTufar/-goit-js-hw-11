import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

import { SearchQuery } from './js/search';
import { createGalleryMarkup } from '/src/js/createGalleryMarkup';

import 'animate.css';

const refs = {
  form: document.querySelector(`.js-search-form`),
  searchBtn: document.querySelector(`.js-submit__search_btn`),
  loadMoreBtn: document.querySelector(`.js-loadMore`),
  galleryEl: document.querySelector(`.js-gallery`),
};

refs.loadMoreBtn.setAttribute(`hidden`, true); //  hide a button in case of change from infinite scroll to a Loadmore

refs.form.addEventListener(`submit`, onSubmitSearchInfo);
refs.loadMoreBtn.addEventListener(`click`, onBtnClick);

async function onSubmitSearchInfo(evt) {
  evt.preventDefault();

  SearchQuery.page = 1;

  const query = evt.target.elements.searchQuery.value.trim();

  try {
    refs.galleryEl.innerHTML = ``;
    const response = await SearchQuery.searchPic(query);
    const galleryItem = response.hits;
    if (galleryItem.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else if (!query) {
      Notiflix.Notify.info(`Please, enter key word for search!`);
      return;
    } else {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      renderMarkup(response.hits);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function onBtnClick() {
  SearchQuery.page += 1;

  const response = await SearchQuery.searchPic();
  if (SearchQuery.page > response.totalHits / SearchQuery.per_page) {
    Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
    // refs.loadMoreBtn.setAttribute(`hidden`, true);   // for LoadMore button
  }

  renderMarkup(response.hits);
  // refs.loadMoreBtn.removeAttribute(`hidden`);  // for LoadMore button

  const {
    height: cardHeight,
  } = refs.galleryEl.firstChild.getBoundingClientRect(); //   for infinite scroll //  for infinite scroll

  window.scrollBy({
    //for infinite scroll
    top: cardHeight * 2, //for infinite scroll
    behavior: `smooth,`, //for infinite scroll
  }); //for infinite scroll
}

const lightbox = new SimpleLightbox('.gallery a', {
  CaptionDelay: 300,
  captions: true,
  captionsData: 'alt',
});

function renderMarkup(arr) {
  refs.galleryEl.insertAdjacentHTML(`beforeend`, createGalleryMarkup(arr));
  lightbox.refresh();
  // refs.loadMoreBtn.removeAttribute(`hidden`); // for LoadMore button
}
