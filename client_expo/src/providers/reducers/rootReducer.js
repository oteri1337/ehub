import pdfsReducer from "./pdfsReducer";
import userReducer from "./userReducer";
import savedReducer from "./savedReducer";
import usersReducer from "./usersReducer";
import chatsReducer from "./chatsReducer";
import topicsReducer from "./topicsReducer";
import eventsReducer from "./eventsReducer";
import searchReducer from "./searchReducer";
import pdfgroupsReducer from "./pdfgroupsReducer";

function rootReducer(state = {}, action) {
  if (action.dispatch == "UPDATE_STATE") {
    if (action.data) {
      return action.data;
    }
  }

  return {
    pdfs: pdfsReducer(state.pdfs, action),
    user: userReducer(state.user, action),
    saved: savedReducer(state.saved, action),
    users: usersReducer(state.users, action),
    chats: chatsReducer(state.chats, action),
    topics: topicsReducer(state.topics, action),
    events: eventsReducer(state.events, action),
    search: searchReducer(state.search, action),
    pdfgroups: pdfgroupsReducer(state.pdfgroups, action),
  };
}

export default rootReducer;
