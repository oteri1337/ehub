function userReducer(state = false, action) {
  switch (action.dispatch) {
    case "UPDATE_USER":
      return action.data;
    case "UPDATE_USER_DATA_PAGE":
      return {
        ...state,
        contracts: {
          ...action.data.contracts,
          data: [...state.contracts.data, ...action.data.contracts.data],
        },
      };
    default:
      return state;
  }
}

export default userReducer;
