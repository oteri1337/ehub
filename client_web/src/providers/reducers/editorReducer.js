import { EditorState, AtomicBlockUtils } from "draft-js";

function editorReducer(editorState, action) {
  if (action.dispatch == "UPDATE_EDITOR") {
    return action.data;
  }
  if (action.dispatch == "ADD_EDITOR_IMAGE") {
    const getEntityData = (type, src) => {
      const content = editorState.getCurrentContent();
      const currentContent = content.createEntity(type, "IMMUTABLE", { src });
      const key = currentContent.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, { currentContent });
      return { key, newEditorState };
    };

    const { type, src } = action.data;
    const { newEditorState, key } = getEntityData(type, src);
    const atomic = AtomicBlockUtils.insertAtomicBlock(newEditorState, key, "m");
    return atomic;
  }
  return editorState;
}

export default editorReducer;
