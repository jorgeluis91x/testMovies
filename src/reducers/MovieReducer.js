const INITIAL_STATE = {
  popularMovies: [],
  topRatedMovies: [],
  movieSelected: {},
  movieCast: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PUPULAR':
      return {...state, popularMovies: action.payload};
    case 'GET_TOP_RATED':
      return {...state, topRatedMovies: action.payload};
    case 'GET_CAST':
      return {...state, movieCast: action.payload};
    case 'SELECT_MOVIE':
      return {...state, movieSelected: action.payload};
    default:
      return state;
  }
};
