function adminsReducer(state = "LIGHT", action) {
  switch (action.dispatch) {
    case "UPDATE_THEME":
      const root = document.querySelector(":root");
      if (action.data == "LIGHT") {
        root.style.setProperty("--background-colour", "#f2f2f2");
        root.style.setProperty("--background-font-colour", "#2E5067");
        root.style.setProperty("--primary-backgroud", "#0e2e45");
        root.style.setProperty("--primary-font-colour", "#ffffff");
        root.style.setProperty("--secondary-background", "#ffffff");
        root.style.setProperty("--secondary-font-colour", "#113a56");
        root.style.setProperty("--secondary-heading-colour", "#252525");
        root.style.setProperty("--border-colour", "#e0e3eb");
      } else {
        root.style.setProperty("--background-colour", "#000000");
        root.style.setProperty("--background-font-colour", "#ffffff");
        root.style.setProperty("--primary-backgroud", "#000000");
        root.style.setProperty("--primary-font-colour", "#e3e3e3");
        root.style.setProperty("--secondary-background", "#1e222d");
        root.style.setProperty("--secondary-font-colour", "#f4f4f4");
        root.style.setProperty("--secondary-heading-colour", "#f2f2f2");
        root.style.setProperty("--border-colour", "#434651");
      }
      return action.data;
    default:
      return state;
  }
}

export default adminsReducer;
