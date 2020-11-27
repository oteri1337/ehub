const defaultState = { data: [], object: {}, search_keys: {} };

function pdfGroupsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_PDFGROUPS":
      if (JSON.stringify(state) === JSON.stringify(action.data)) {
        return state;
      } else {
        return action.data;
      }
    case "UPDATE_PDFGROUP_PAGE":
      const index = state.data.findIndex((g) => g.id == action.data.id);

      state.data[index] = {
        ...action.data,
        pdfs: [...state.data[index].pdfs, ...action.data.pdfs],
      };
      return state;
    case "UPDATE_PDFGROUP":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.slug]: {
            ...action.data,
          },
        },
      };
    case "UPDATE_PDFGROUP_OBJECT":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.slug]: {
            ...action.data,
            pdfs: [...state.object[action.data.slug].pdfs, ...action.data.pdfs],
          },
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
