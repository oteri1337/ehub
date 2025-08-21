import React from "react";
import { stateToHTML } from "draft-js-export-html";
import { Editor as EditorContext } from "../../../reducers/providers/EditorProvider";
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
		return <img src={props.src} className="responsive-img" />;
	}
	return null;
};

const Video = props => {
	if (!!props.src) {
		return (
			<video className="responsive-video" controls>
				<source src={props.src} />
			</video>
		);
	}
	return null;
};

const Media = props => {
	console.log("props", props);
	// console.log(props.contentState);
	// return <div>media</div>;
	const entity = props.contentState.getEntity(props.block.getEntityAt(0));

	console.log("entity", entity.getData());

	const { src } = entity.getData();
	const type = entity.getType().toLowerCase();

	console.log("type", type);

	let media;

	if (type == "image") {
		media = <Image src={src} />;
	}

	if (type == "video") {
		media = <Video src={src} />;
	}

	return media;
};

function DraftEditorTemplate() {
	const { editorState, setEditorState } = React.useContext(EditorContext);

	React.useEffect(() => {
		if (this.defaultValue) {
			const blocksFromHTML = convertFromHTML(this.defaultValue);
			const state = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap
			);
			const initialState = EditorState.createWithContent(state);
			console.log("is", initialState);
			setEditorState(initialState);
		} else {
			const initialState = EditorState.createEmpty();
			console.log("is", initialState);
			setEditorState(initialState);
		}
	}, []);

	const mediaBlockRenderer = block => {
		if (block.getType() === "atomic") {
			return {
				component: Media,
				editable: false
			};
		}
		return null;
	};

	this.getState = () => {
		console.log(editorState);
		return stateToHTML(editorState.getCurrentContent());
	};

	const handleKeyCommand = (command, editorState) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			setEditorState(newState);
			return "handled";
		}
		return "not-handled";
	};

	const addMedia = (src, type) => {
		const contentState = editorState.getCurrentContent();
		const contentStateWithEntity = contentState.createEntity(
			type,
			"IMMUTABLE",
			{ src }
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
		addMedia(urlValue, "image");
	};

	const showVideoLinkPrompt = e => {
		e.preventDefault();
		const urlValue = window.prompt("Paste Video Link");
		addMedia(urlValue, "video");
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
				IMAGE / VIDEO UPLOAD
			</a>

			<a className="btn-no-hover waves-effect" onClick={showImageLinkPrompt}>
				IMAGE LINK
			</a>

			<a className="btn-no-hover waves-effect" onClick={showVideoLinkPrompt}>
				VIDEO LINK
			</a>
			<Editor
				{...{ editorState, handleKeyCommand }}
				onChange={setEditorState}
				blockRendererFn={mediaBlockRenderer}
			/>
		</div>
	);
}

export default DraftEditorTemplate;
