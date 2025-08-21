import React, { useState } from "react";
import { EditorContext } from "providers/EditorProvider";
import {
  Editor,
  EditorState,
  convertToRaw,
  RichUtils,
  convertFromRaw,
} from "draft-js";

function EditorComponent() {
  const { editorState, onChange } = React.useContext(EditorContext);

  // const [editorState, onChange] = useState(EditorState.createEmpty());

  React.useEffect(() => {
    if (this.defaultValue) {
      const contentState = convertFromRaw(JSON.parse(this.defaultValue));
      const initialState = EditorState.createWithContent(contentState);
      onChange(initialState);
    } else {
      onChange(EditorState.createEmpty());
    }
  }, []);

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

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    onChange(newState);
  };

  this.getState = () => {
    const raw = convertToRaw(editorState.getCurrentContent());
    return JSON.stringify(raw);
  };

  const toggleStyle = (e) => {
    onChange(RichUtils.toggleInlineStyle(editorState, e.target.id));
  };

  const c = "btn-no-hover waves-effect";

  return (
    <div key={this.id}>
      <a id="BOLD" className={c} onClick={toggleStyle}>
        B
      </a>
      <a id="ITALIC" className={c} onClick={toggleStyle}>
        <i>I</i>
      </a>
      <a id="UNDERLINE" className={c} onClick={toggleStyle}>
        <u>U</u>
      </a>
      <a id="code" className={c} onClick={toggleStyle}>
        M
      </a>
      <a className="btn-no-hover waves-effect modal-trigger" href="#image">
        UPLOAD IMAGE
      </a>
      <a className="btn-no-hover waves-effect modal-trigger" href="#video">
        UPLOAD VIDEO
      </a>
      <div className="app-draft">
        <Editor
          {...{
            onChange,
            editorState,
            blockRendererFn,
            handleKeyCommand,
          }}
        />
      </div>
    </div>
  );
}

export default EditorComponent;
