const defaultState = { data: [], object: {}, search_keys: {} };

function pdfParentGroupsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_PDFPARENTGROUPS":
      return action.data;
    case "UPDATE_PDFPARENTGROUP":
      return {
        ...state,
        object: {
          [action.data.slug]: action.data,
        },
      };
    case "UPDATE_PDFPARENTGROUPS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    default:
      return state;
  }
}

export default pdfParentGroupsReducer;
