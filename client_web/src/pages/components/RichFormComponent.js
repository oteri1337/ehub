import React from "react";
import InputTextTemplate from "./formtemplates/InputTextTemplate";
import DraftEditorTemplate from "./formtemplates/DraftjsEditorTemplate";
import SubmitComponent from "./SubmitComponent";
import MessageComponent from "./MessageComponent";

function RichFormComponent({ formObjects = [], submitCallback, request = {} }) {
	const { fetching = false, errors = [], message = "" } = request;

	const onSubmit = event => {
		event.preventDefault();
		let data = {};
		formObjects.forEach(formObject => {
			data[formObject.id] = formObject.getState();
		});
		submitCallback(data);
	};

	const renderComponents = () => {
		return formObjects.map(formObject => {
			const { type } = formObject;

			if (type == "hidden") {
				formObject.getComponent = function() {
					return <input key={formObject.id} type="hidden" />;
				};
			}

			if (type == "text" || type == undefined) {
				formObject.getComponent = InputTextTemplate.bind(formObject);
			}

			if (type == "richeditor") {
				formObject.getComponent = DraftEditorTemplate.bind(formObject);
			}

			return formObject.getComponent();
		});
	};

	return (
		<form onSubmit={onSubmit} encType="multipart/form-data">
			{renderComponents()}
			<SubmitComponent {...{ fetching }} />
			<MessageComponent {...{ errors, message }} />
		</form>
	);
}

export default RichFormComponent;
