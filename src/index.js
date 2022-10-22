import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { SearchQuery } from './js/search';
import axios from 'axios';

import { createGalleryMarkup } from '/src/js/createGalleryMarkup';

const DEBOUNCE_DELAY = 500;

const refs = {
  form: document.querySelector(`.search-form`),
  searchBtn: document.querySelector(`.searchBtn`),
  loadMore: document.querySelector(`.loadMore`),
  galleryEl: document.querySelector(`.gallery`),
};

console.log(refs.galleryEl);
refs.loadMore.setAttribute(`hidden`, true);

refs.form.addEventListener(`submit`, onSubmitSearchInfo);
refs.loadMore.addEventListener(`click`, onBtnClick);

async function onSubmitSearchInfo(evt) {
  evt.preventDefault();

  SearchQuery.page = 1;

  const query = evt.target.elements.searchQuery.value.trim();

  const response = await SearchQuery.searchPic(query);
  console.log(response);
  const galleryItem = response.hits;

  try {
    refs.galleryEl.innerHTML = ``;
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
      // createGalleryMarkup(response.hits);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function onBtnClick() {
  searchQuery.page += 1;
}

const lightbox = new SimpleLightbox('.gallery a', {
  CaptionDelay: 300,
  captions: true,
  captionsData: 'alt',
});

function renderMarkup(arr) {
  refs.galleryEl.insertAdjacentHTML(`beforeend`, createGalleryMarkup(arr));
  lightbox.refresh();
}
// -------------------------------------------------------evt listeners
// form.addEventListener(`input`, onInput);
// searchBtn.addEventListener(`click`, onSearch)
// -----------------------------------------------------------
// function onSearch(evt) {
//     evt.preventDefault()
// }

// function onInput(evt) {
//     evt.preventDefault();
//     const searchTerm = evt.target.value.trim();
//     console.log(searchTerm);

//
