export function createGalleryMarkup(arr) {
  return arr.reduce(
    (
      acc,
      { largeImageURL, likes, webformatURL, tags, views, comments, downloads }
    ) =>
      acc +
      `<li class= "gallery__item">
 <a  href=${largeImageURL}>
  <img class= "gallery__item-img" width= "350" height="240" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <ul class="info__list">
    <li class="info__list-item">
      <b>Likes  ${likes} </b>
    </li>
    <li class="info__list-item">
      <b>Views ${views} </b>
    </li>
    <li class="info__list-item">
      <b>Comments ${comments} </b> 
    </li>
    <li class="info__list-item">
      <b>Downloads ${downloads}</b> 
    </li>
  </ul>
 </a> </div>`,
    ''
  );
}
