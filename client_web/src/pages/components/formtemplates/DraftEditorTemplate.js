import React from "react";
import { stateToHTML } from "draft-js-export-html";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertFromHTML,
  ContentState
} from "draft-js";

const Image = props => {
  if (!!props.src) {
    return <img src={props.src} />;
  }
  return null;
};

const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === "image") {
    media = <Image src={src} />;
  }

  return media;
};

const mediaBlockRenderer = block => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false
    };
  }
  return null;
};

function DraftEditorTemplate() {
  let initialState = undefined;

  if (this.defaultValue) {
    const blocksFromHTML = convertFromHTML(this.defaultValue);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    initialState = EditorState.createWithContent(state);
  } else {
    initialState = EditorState.createEmpty();
  }

  // const {state, callReducer} = React.useContext(EditorContext);
  // callReducer({dispacth: "UPDATE_EDITOR", data: initialState});
  const [editorState, setEditorState] = React.useState(initialState);

  this.getState = () => {
    // return stateToHTML(state.editor);
    return stateToHTML(editorState.getCurrentContent());
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      // callReducer({dispacth: "UPDATE_EDITOR", data: newState});
      return "handled";
    }
    return "not-handled";
  };

  const addImage = urlValue => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    const newState = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      " "
    );

    setEditorState(newState);
    // callReducer({dispacth: "UPDATE_EDITOR", data: newState});
  };

  const showImageLinkPrompt = e => {
    e.preventDefault();
    const urlValue = window.prompt("Paste Image Link");
    addImage(urlValue);
  };

  const buttonClicked = e => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, e.target.id));
  };

  const c = "btn-no-hover waves-effect";

  return (
    <div key={this.id}>
      <a id="BOLD" className={c} onClick={buttonClicked}>
        B
      </a>
      <a id="ITALIC" className={c} onClick={buttonClicked}>
        <i>I</i>
      </a>
      <a id="UNDERLINE" className={c} onClick={buttonClicked}>
        <u>U</u>
      </a>
      <a id="code" className={c} onClick={buttonClicked}>
        M
      </a>

      <a className="btn-no-hover waves-effect modal-trigger" href="#modal1">
        IMAGE UPLOAD
      </a>

      <a className="btn-no-hover waves-effect" onClick={showImageLinkPrompt}>
        IMAGE LINK
      </a>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockRendererFn={mediaBlockRenderer}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
}

export default DraftEditorTemplate;
