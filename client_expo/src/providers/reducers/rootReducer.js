import userReducer from "./userReducer";
import newsReducer from "./newsReducer";
import savedReducer from "./savedReducer";
import usersReducer from "./usersReducer";
import topicsReducer from "./topicsReducer";
import pdfgroupsReducer from "./pdfgroupsReducer";

function rootReducer(state = {}, action) {
  console.log(action);

  if (action.dispatch == "UPDATE_STATE") {
    if (action.data) {
      return action.data;
    }
  }

  return {
    user: userReducer(state.user, action),
    news: newsReducer(state.news, action),
    saved: savedReducer(state.saved, action),
    users: usersReducer(state.users, action),
    topics: topicsReducer(state.topics, action),
    pdfgroups: pdfgroupsReducer(state.pdfgroups, action),
  };
}

export default rootReducer;
