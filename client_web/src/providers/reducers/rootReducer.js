import themeReducer from "./themeReducer";
import adminReducer from "./adminReducer";
import usersReducer from "./usersReducer";

import pdfsReducer from "./pdfsReducer";
import eventsReducer from "./eventsReducer";
import topicsReducer from "./topicsReducer";
import pdfgroupsReducer from "./pdfgroupsReducer";
import pdfparentgroupsReducer from "./pdfparentgroupsReducer";

function rootReducer(state = {}, action) {
  if (action.dispatch == "UPDATE_STATE") {
    if (action.data) {
      return action.data;
    }
  }

  return {
    pdfs: pdfsReducer(state.pdfs, action),
    theme: themeReducer(state.theme, action),
    admin: adminReducer(state.admin, action),
    users: usersReducer(state.users, action),
    events: eventsReducer(state.events, action),
    topics: topicsReducer(state.topics, action),
    pdfgroups: pdfgroupsReducer(state.pdfgroups, action),
    pdfparentgroups: pdfparentgroupsReducer(state.pdfparentgroups, action),
  };
}

export default rootReducer;
