import React from "react";
import { sendRequestThenDispatch } from "../../hooks";

const SearchComponent = (props) => {
  const searchRef = React.createRef();
  const { request, callBack, callReducer } = sendRequestThenDispatch();

  const { url, dispatch } = props;
  const data = props.search_keys || {};

  const onSubmit = async (body) => {
    callReducer({ dispatch: "UPDATE_FETCHING", data: true });
    await callBack(url + "/search", dispatch, body);
    callReducer({ dispatch: "UPDATE_FETCHING", data: false });
  };

  React.useLayoutEffect(() => {
    let elems = document.querySelectorAll(".autocomplete");

    let options = { data };

    options.onAutocomplete = function (search) {
      onSubmit({ search });
    };

    if (window.M) {
      M.Autocomplete.init(elems, options);
    }
  });

  return (
    <React.Fragment>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ search: searchRef.current.value });
        }}
      >
        <div className="input-field">
          <input
            type="text"
            id="autocomplete-input"
            className="autocomplete"
            ref={searchRef}
            placeholder={props.label || "Search"}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default SearchComponent;
