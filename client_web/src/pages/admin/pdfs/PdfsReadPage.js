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

  const rootPath = `/control/pdfs/${data.slug}/`;

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l3 s12">
            <center>
              <img
                src={`/uploads/images/${data.image_name}`}
                className="circle"
                width="140px"
                height="140px"
              />

              <div>{renderCategories()}</div>
            </center>
          </div>
          <div className="col l9 s12">
            <a
              target="_blank"
              href={`/uploads/pdfs/${data.file_name}`}
              className="btn"
            >
              View Pdf
            </a>
            <Link to={`${rootPath}update-file`} className="btn">
              Update Pdf
            </Link>
            <Link to={`${rootPath}update`} className="btn">
              Update Data
            </Link>
            <Link to={`${rootPath}update-image`} className="btn">
              Update Image
            </Link>
            <Link
              to={{
                pathname: `${rootPath}update-groups`,
                data,
              }}
              className="btn"
            >
              Update Groups
            </Link>

            <pre>{data.description}</pre>
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
