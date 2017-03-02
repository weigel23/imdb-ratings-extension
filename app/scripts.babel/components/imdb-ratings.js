import $ from 'jquery';

export default class IMDB {
  constructor() {
    this.init();
  }

  getIdFromLink(href) {
    const matches = href.match(/title\/([a-z0-9]+)/i);

    return matches ? matches[1] : null;
  }

  getOmdbObjectFromId(id) {
    return $.get(`http://www.omdbapi.com/?i=${id}`);
  }

  init() {
    $('.filmo-row').each((index, el) => {
      const url = $('a', el)[0].href;
      const id = this.getIdFromLink(url);

      this.getOmdbObjectFromId(id).done(data => {
        if (!isNaN(data.imdbRating)) {
          $(el).closest('.filmo-row').prepend(`<span style='float: right; font-weight: bold;'>&nbsp;(${data.imdbRating})</span>`);
        }
      })
    });
  }
}
