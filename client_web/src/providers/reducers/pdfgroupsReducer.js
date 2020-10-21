const defaultState = { data: [], object: {}, search_keys: {} };

function pdfGroupsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_PDFGROUPS":
      return action.data;
    case "UPDATE_PDFGROUP":
      return {
        ...state,
        object: {
          [action.data.slug]: action.data,
        },
      };
    case "UPDATE_PDFGROUPS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    default:
      return state;
  }
}

export default pdfGroupsReducer;
