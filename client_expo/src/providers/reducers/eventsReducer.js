const defaultState = { data: [], object: {}, search_keys: {} };

function eventsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_EVENTS":
      return action.data;
    case "UPDATE_EVENTS_IN_EVENTS":
      return {
        ...state,
        object: {
          [action.data.slug]: action.data,
        },
      };
    case "UPDATE_EVENTS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    default:
      return state;
  }
}

export default eventsReducer;
