const defaultState = { data: [], object: {}, search_keys: {} };

function pdfGroupsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_PDFGROUPS":
      if (JSON.stringify(state) === JSON.stringify(action.data)) {
        return state;
      } else {
        return action.data;
      }
    default:
      return state;
  }
}

export default pdfGroupsReducer;
