import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ErrorPage from "../../tour/ErrorPage";
import { getRequestThenDispatch } from "providers/AppProvider";
import ContainerComponent from "components/container/AdminContainerComponent";

function PdfsReadPage({ match }) {
  const { slug } = match.params;

  const url = `/api/pdfs/${slug}`;

  const { state, fetching } = getRequestThenDispatch(url, "UPDATE_PDF");

  const data = state.pdfs.object[slug];

  if (!data) {
    if (fetching) {
      return (
        <ContainerComponent bread={[]}>
          <div className="card-panel">Fetching data...</div>
        </ContainerComponent>
      );
    }
    return <ErrorPage />;
  }

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Pdfs",
      link: "/control/pdfs/index.html",
    },
    {
      label: "List",
      link: "/control/pdfs/list.html",
    },
    {
      label: `${data.title}`,
    },
  ];

  const renderRow = Object.keys(data).map((key) => {
    if (
      typeof data[key] == "object" ||
      key == "description" ||
      key == "short_description"
    )
      return false;
    return (
      <tr key={key}>
        <td style={{ textTransform: "uppercase" }}>{key.replace(/_/g, " ")}</td>
        <td>{data[key]}</td>
      </tr>
    );
  });

  const renderCategories = () => {
    if (data.groups?.length === 0) return <Fragment />;

    return (
      <div>
        <p>
          <br />
          <b>GROUPS</b>
        </p>
        {data.groups?.map((group) => (
          <p key={group.id}>{group.title}</p>
        ))}
      </div>
    );
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l4 s12">
            <center>
              <img
                src={`/uploads/images/${data.image_name}`}
                className="circle"
                width="140px"
                height="140px"
              />

              <div>
                <br />
                <Link to={`/control/pdfs/${data.slug}/update`} className="btn">
                  Update Data
                </Link>
                <br />
                <br />
                <Link
                  to={{
                    pathname: `/control/pdfs/${data.slug}/update-groups`,
                    data,
                    nav,
                  }}
                  className="btn"
                >
                  Update Groups
                </Link>
                {/* <Link
                  to={{
                    pathname: `/control/pdfs/${data.slug}/updateimg`,
                    nav,
                    data,
                  }}
                  className="btn"
                >
                  Update Image
                </Link>
                <br />
                <br />

 */}

                <br />
                {renderCategories()}
              </div>
            </center>
          </div>
          <div className="col l8 s12">
            <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
            <table className="striped">
              <tbody>{renderRow}</tbody>
            </table>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default PdfsReadPage;
