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
    $('.filmo-row, .findResult').each((index, el) => {
      const $a = $('a', el);
      let a = null;

      if ($(el).hasClass('filmo-row')) {
        a = $a[0];
      } else if ($(el).hasClass('findResult')) {
        a = $a[1];
      }
      const url = a.href;
      const id = this.getIdFromLink(url);

      this.getOmdbObjectFromId(id).done(data => {
        if (!isNaN(data.imdbRating)) {
          $(a).append(`<span style='float: right; font-weight: bold;'>&nbsp;(${data.imdbRating})</span>`);
        }
      })
    });
  }
}
