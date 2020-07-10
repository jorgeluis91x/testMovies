import movies_api from '../api/movies';

export const getPopularMovies = () => {
  return async (dispatch) => {
    try {
      const response = await movies_api.get('popular');
      dispatch({
        type: 'GET_PUPULAR',
        payload: response.data.results,
      });
    } catch {
      console.log('error popular');
    }
  };
};

export const getTopRatedMovies = () => {
  return async (dispatch) => {
    try {
      const response = await movies_api.get('top_rated');
      dispatch({
        type: 'GET_TOP_RATED',
        payload: response.data.results,
      });
    } catch {
      console.log('error toprated');
    }
  };
};

export const getCast = (movieId) => {
  return async (dispatch) => {
    try {
      const response = await movies_api.get(movieId + '/credits');
      dispatch({
        type: 'GET_CAST',
        payload: response.data.cast,
      });
    } catch {
      console.log('error getCast');
    }
  };
};

export const selectMovie = (movieId) => {
  return async (dispatch) => {
    try {
      let response = await movies_api.get(movieId+'');
      response.data.formatedGenres = '';

      await response.data.genres.map((item, index) => {
        if (index == 0) return (response.data.formatedGenres += item.name);
        else return (response.data.formatedGenres += ', ' + item.name);
      });
      dispatch({
        type: 'SELECT_MOVIE',
        payload: response.data,
      });
    } catch {
      console.log('error select movie');
    }
  };
};

export const cleanMovieSelected = (movieId) => {
  return {
    type: 'SELECT_MOVIE',
    payload: {},
  };
};
