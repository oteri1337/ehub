import React from "react";
import AdminContainerComponent from "../admin_components/AdminContainerComponent";
import FileUploadComponent from "../../page_components/FileUploadComponent";
import RichFormComponent from "../../page_components/RichFormComponent";
import {
	sendRequestThenDispatch,
	getRequestThenDispatch
} from "../../../hooks";

function ProgramsUpdatePage(props) {
	const { slug } = props.match.params;
	const get = getRequestThenDispatch(`/api/programs/${slug}`, "UPDATE_program");
	const { request, callBack, state } = sendRequestThenDispatch();

	const data = state.programs.object[slug];

	if (data === undefined && get.request.fetching) {
		return (
			<AdminContainerComponent bread={[]}>
				<div className="card-panel">Fetching Data ...</div>
			</AdminContainerComponent>
		);
	}

	if (data === undefined && !get.request.fetching) {
		return (
			<AdminContainerComponent bread={[]}>
				<div className="card-panel">Data Not Found</div>
			</AdminContainerComponent>
		);
	}

	const nav = [
		{
			label: "Control Panel",
			link: "/control/index.html"
		},
		{
			label: "Programs",
			link: "/control/programs/list.html"
		},
		{
			label: "List",
			link: "/control/programs/list.html"
		},
		{
			label: `${data.title}`,
			link: `/control/programs/${data.slug}`
		},
		{
			label: "Update"
		}
	];

	const formObjects = [
		{
			id: "title",
			defaultValue: data.title
		},
		{
			id: "content",
			type: "richeditor",
			defaultValue: data.content
		},
		{
			id: "id",
			type: "hidden",
			getState: () => {
				return data.id;
			}
		}
	];

	const onSuccess = ({ slug }) => {
		props.history.push(`/control/programs/${slug}`);
	};

	const submitCallback = body => {
		callBack("/api/programs", "UPDATE_PROGRAM", body, onSuccess, "PATCH");
	};

	return (
		<AdminContainerComponent bread={nav}>
			<div className="card-panel">
				<FileUploadComponent type="image" />
				<FileUploadComponent type="video" />
				<RichFormComponent {...{ formObjects, submitCallback, request }} />
			</div>
		</AdminContainerComponent>
	);
}

export default ProgramsUpdatePage;
