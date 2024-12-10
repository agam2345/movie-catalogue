class FavoriteMovieSearchPresenter {
  constructor({ favoriteMovies, view }) {
    this._favoriteMovies = favoriteMovies;
    this._view = view;

    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searcMovies(latestQuery);
    });
  }

  async _searcMovies(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundMovies;
    if (this.latestQuery.length > 0) {
      foundMovies = await this._favoriteMovies.searchMovies(this.latestQuery);
      console.log(`hai ${foundMovies}`);
    } else {
      foundMovies = await this._favoriteMovies.getAllMovies();
    }
    this._showFoundMovies(foundMovies);
  }

  get latestQuery() {
    return this._latestQuery;
  }

  // eslint-disable-next-line class-methods-use-this
  _showFoundMovies(movies) {
    this._view.showFavoriteMovies(movies);
  }
}

export default FavoriteMovieSearchPresenter;
