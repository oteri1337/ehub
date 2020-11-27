import pdfsReducer from "./pdfsReducer";
import userReducer from "./userReducer";
import savedReducer from "./savedReducer";
import usersReducer from "./usersReducer";
import chatsReducer from "./chatsReducer";
import topicsReducer from "./topicsReducer";
import eventsReducer from "./eventsReducer";
import searchReducer from "./searchReducer";
import fetchingReducer from "./fetchingReducer";
import pdfgroupsReducer from "./pdfgroupsReducer";
import pdfParentGroupsReducer from "./pdfparentgroupsReducer";

function rootReducer(state = {}, action) {
  console.log(" ");
  console.log(action);

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
    fetching: fetchingReducer(state.fetching, action),
    pdfgroups: pdfgroupsReducer(state.pdfgroups, action),
    pdfparentgroups: pdfParentGroupsReducer(state.pdfparentgroups, action),
  };
}

export default rootReducer;
