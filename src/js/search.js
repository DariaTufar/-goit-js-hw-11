const BASE_URL = `https://pixabay.com/api/`;

import axios from 'axios';

export class SearchQuery {
  static page = 1;
  static image_type = `photo`;
  static key = `30719979-fba7f190acc5efa0a19e58b2e`;
  static query = ``;
  static orientation = `horizontal`;
  static safeSearch = `true`;
  static per_page = 40;
  
  static async searchPic(query = ``) {
    if (query.trim()) SearchQuery.query = query;

    const config = {
      params: {
        key: SearchQuery.key,
        q: SearchQuery.query,
        orientation : SearchQuery.orientation,
        safesearch: SearchQuery.safeSearch,
        per_page: SearchQuery.per_page,
        page: SearchQuery.page,
      },
      };
      
    const response = await axios.get(`${BASE_URL}`, config);
      return response.data;
  }
}
