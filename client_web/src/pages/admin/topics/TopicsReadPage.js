import React from "react";
import ErrorPage from "../../tour/ErrorPage";
import { getRequestThenDispatch } from "providers/AppProvider";
import ContainerComponent from "components/container/AdminContainerComponent";

function TopicsReadPage({ match }) {
  const { id } = match.params;
  const { state, request } = getRequestThenDispatch(
    `/api/topics/${id}`,
    "UPDATE_TOPIC"
  );
  const data = state.topics.object[id];

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
      label: "Topics",
      link: "/control/topics/list.html",
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
        <p> {data.data}</p>
        <table className="striped">
          <tbody>{renderRow}</tbody>
        </table>
      </div>
    </ContainerComponent>
  );
}

export default TopicsReadPage;
