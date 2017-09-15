import callApi from "../utils/apiCaller";

// Export Constants
export const ADD_POSTS = "ADD_POSTS";
export const ADD_PHOTOS = "ADD_PHOTOS";

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts
  };
}

export function addPhotos(photos) {
  return {
    type: ADD_PHOTOS,
    photos
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi("posts", "get").then(res => {
      dispatch(addPosts(res));
    });
  };
}

export function fetchPhotos() {
  return (dispatch) => {
    return callApi("photos", "get").then(res => {
      dispatch(addPhotos(res));
    });
  };
}
