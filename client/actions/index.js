export const FETCH_GISTS_REQUESTED = "FETCH_GISTS_REQUESTED";
export const FETCH_GISTS_SUCCEEDED = "FETCH_GISTS_SUCCEEDED";

export const fetchGists = () => {
  return {
    type: FETCH_GISTS_REQUESTED,
    payload: {}
  };
};

export const receiveGists = payload => {
  return {
    type: FETCH_GISTS_SUCCEEDED,
    payload
  };
};
