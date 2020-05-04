import React from "react";
import { Link } from "react-router-dom";
import ErrorPage from "../../tour/ErrorPage";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { getRequestThenDispatch } from "providers/AppProvider";
import ContainerComponent from "components/container/AdminContainerComponent";

function NewsReadPage({ match }) {
  const { slug } = match.params;
  const { state, request } = getRequestThenDispatch(
    `/api/news/${slug}`,
    "UPDATE_NEW"
  );
  const data = state.news.object[slug];

  if (!data) {
    if (request.fetching) {
      return (
        <ContainerComponent bread={[]}>
          <div className="card-panel">Fetching data...</div>
        </ContainerComponent>
      );
    }
    return <ErrorPage />;
  }

  const contentState = convertFromRaw(JSON.parse(data.content));

  const editorState = EditorState.createWithContent(contentState);

  const component = ({ contentState, block }) => {
    const firstEnityInBlock = block.getEntityAt(0);
    const entity = contentState.getEntity(firstEnityInBlock);
    const { src } = entity.getData();

    if (entity.type == "video") {
      return (
        <video className="responsive-video" controls>
          <source src={src} />
        </video>
      );
    }

    if (entity.type == "image") {
      return <img src={src} className="responsive-img" />;
    }
  };

  const blockRendererFn = (block) => {
    const type = block.getType();
    if (type == "atomic") {
      return {
        component,
        editable: false,
      };
    }
  };

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "News",
      link: "/control/news/list.html",
    },
    {
      label: "List",
      link: "/control/news/list.html",
    },
    {
      label: `${data.title}`,
    },
  ];

  const renderRow = Object.keys(data).map((key) => {
    if (
      typeof data[key] == "object" ||
      key == "content" ||
      key == "short_content"
    )
      return false;
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

              <div>
                <br />
                <Link
                  to={{
                    pathname: `/control/news/${data.slug}/updateimage`,
                    nav,
                    data,
                  }}
                  className="btn"
                >
                  Update Image
                </Link>
                <br />
                <br />
                <Link to={`/control/news/${data.slug}/update`} className="btn">
                  Update News
                </Link>
                <br />
                <br />
                <table className="striped">
                  <tbody>{renderRow}</tbody>
                </table>
              </div>
            </center>
          </div>
          <div className="col l7 s12">
            <Editor {...{ editorState, blockRendererFn, readOnly: true }} />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default NewsReadPage;
