import $ from 'jquery';

export default class IMDB {
  constructor() {
    this.init();
  }

  getIdFromLink(href) {
    const matches = href.match(/title\/([a-z0-9]+)/i);
    return matches ? matches[1] : null;
  }

  getRatingFromId(id) {
    const returnPromise = new Promise((resolve, reject) => {
      $.get(`http://www.omdbapi.com/?i=${id}`, (response, xhr) => {
        // Bail out if response is invalid or imdbRating is missing
        if (!response || !response.imdbRating) {
          reject('no response');
        }
        resolve(parseFloat(response.imdbRating, 10));
      });
    });

    return returnPromise;
  }

  init() {
    $('.filmo-row').each((index, el) => {
      const url = $('a', el)[0].href;

      const id = this.getIdFromLink(url);

      this.getRatingFromId(id).then(rating => {
        if (!isNaN(rating)) {
          $(el).closest('.filmo-row').prepend(`<span style='float: right; font-weight: bold;'>&nbsp;(${rating})</span>`);
        }
      })
    });
  }
}
