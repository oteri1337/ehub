import userReducer from "./userReducer";
import newsReducer from "./newsReducer";
import pdfgroupsReducer from "./pdfgroupsReducer";

function rootReducer(state = {}, action) {
  if (action.dispatch == "UPDATE_STATE") {
    if (action.data) {
      return action.data;
    }
  }

  return {
    user: userReducer(state.user, action),
    news: newsReducer(state.news, action),
    pdfgroups: pdfgroupsReducer(state.pdfgroups, action),
  };
}

export default rootReducer;
