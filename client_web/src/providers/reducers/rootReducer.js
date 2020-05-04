import themeReducer from "./themeReducer";
import adminReducer from "./adminReducer";
import usersReducer from "./usersReducer";

import newsReducer from "./newsReducer";
import pdfsReducer from "./pdfsReducer";
import pdfgropusReducer from "./pdfgroupsReducer";

function rootReducer(state = {}, action) {
  if (action.dispatch == "UPDATE_STATE") {
    if (action.data) {
      return action.data;
    }
  }

  return {
    news: newsReducer(state.news, action),
    pdfs: pdfsReducer(state.pdfs, action),
    theme: themeReducer(state.theme, action),
    admin: adminReducer(state.admin, action),
    users: usersReducer(state.users, action),
    pdfgroups: pdfgropusReducer(state.pdfgroups, action),
  };
}

export default rootReducer;
