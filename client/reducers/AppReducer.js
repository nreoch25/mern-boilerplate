import { ADD_POSTS, ADD_PHOTOS } from "../actions/AppActions";
const initialState = { posts: [], photos: [] };

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS:
      return { ...state, posts: action.posts };
    case ADD_PHOTOS:
      return { ...state, photos: action.photos };
    default:
      return state;
  }
}

export default AppReducer;
