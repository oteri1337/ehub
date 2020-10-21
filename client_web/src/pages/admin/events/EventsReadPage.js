import React from "react";
import { Link } from "react-router-dom";
import ErrorPage from "../../tour/ErrorPage";
import { getRequestThenDispatch } from "providers/AppProvider";
import ContainerComponent from "components/container/AdminContainerComponent";

function TopicsReadPage({ match }) {
  const { id } = match.params;
  const { state, request } = getRequestThenDispatch(
    `/api/events/${id}`,
    "UPDATE_EVENT"
  );
  const data = state.events.object[id];

  if (!data) {
    // if (request.fetching) {
    //   return (
    //     <ContainerComponent bread={[]}>
    //       <div className="card-panel">Fetching data...</div>
    //     </ContainerComponent>
    //   );
    // }
    return <ErrorPage />;
  }

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Events",
      link: "/control/events/list.html",
    },
    {
      label: `${data.title}`,
    },
  ];

  const renderRow = Object.keys(data).map((key) => {
    if (typeof data[key] == "object" || key == "data") return false;
    return (
      <tr key={key}>
        <td style={{ textTransform: "uppercase" }}>{key.replace(/_/g, " ")}</td>
        <td>{data[key]}</td>
      </tr>
    );
  });

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l5 s12">
            <center>
              <img
                src={`/uploads/images/${data.image}`}
                className="responsive-img"
              />

              <p>{data.date}</p>
              <pre> {data.data}</pre>
            </center>
          </div>
          <div className="col l7 s12">
            <br />
            <Link
              to={{
                pathname: `/control/events/${data.id}/updateimage`,
                data,
              }}
              className="btn"
            >
              Update Image
            </Link>
            <Link to={`/control/events/${data.id}/update`} className="btn">
              Update Data
            </Link>
            <br />
            <br />
            <table className="striped">
              <tbody>{renderRow}</tbody>
            </table>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default TopicsReadPage;
