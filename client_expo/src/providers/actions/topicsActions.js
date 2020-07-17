import { getRequest } from "../functions";

export const fetchTopics = () => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_TOPICS_FETCHING", data: true });

    let response = await getRequest("/api/topics");
    if (response.errors.length === 0) {
      dispatch({ type: "UPDATE_TOPICS", data: response.data });
    }

    dispatch({ type: "UPDATE_TOPICS_FETCHING", data: false });
  };
};

export const fetchTopicsPage = () => {
  return async (dispatch, state) => {
    const { next_page_url } = state.topics;

    if (!state.fetching.topics && next_page_url) {
      dispatch({ type: "UPDATE_TOPICS_FETCHING", data: true });

      let response = await getRequest(next_page_url);
      if (response.errors.length === 0) {
        dispatch({ type: "UPDATE_TOPICS_PAGE", data: response.data });
      }

      dispatch({ type: "UPDATE_TOPICS_FETCHING", data: false });
    }
  };
};
