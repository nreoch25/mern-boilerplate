import { FETCH_GISTS_SUCCEEDED } from "../actions";

export default (initialState = [], action) => {
  switch (action.type) {
    case FETCH_GISTS_SUCCEEDED:
      return action.gists;
    default:
      return initialState;
  }
};
