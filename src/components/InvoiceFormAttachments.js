import { useRef, useState } from "react";
import { Button } from "semantic-ui-react";
import DragAndDropAttachments from "./DragAndDropAttachments";
import PaperClipIcon from "@heroicons/react/outline/PaperClipIcon";
import Title from "./Title";

export default function InvoiceFormAttachments({ form, onAttachmentsChanged }) {
	const [attachments, setAttachments] = useState(() => {
		if ("attachments" in form) {
			return form.attachments.map((attachment, index) => ({
				id: `item-${index}`,
				content: (
					<div>
						<embed src={attachment.dataUrl} height="400px" alt="Invoice attachment" />
						<div className="text-center py-2 font-semibold text-gray-600">Grab here</div>
					</div>
				),
				dataUrl: attachment.dataUrl,
				file: attachment.file,
			}));
		}

		return [];
	});

	const fileInputRef = useRef();

	const handleAttachClick = () => {
		fileInputRef.current.click();
	};

	const handleFilesSelected = (e) => {
		let files = e.target.files;
		for (let file of files) {
			let reader = new FileReader();

			reader.addEventListener("load", function () {
				let dataUrl = this.result;

				setAttachments((currentAttachments) => {
					let draggableAttachment = {
						id: `item-${currentAttachments.length}`,
						content: (
							<div>
								<embed src={dataUrl} height="400px" alt="Invoice attachment" />
								<div>Grab here</div>
							</div>
						),
						dataUrl: dataUrl,
						file: file,
					};
					let newAttachmentsArray = [...currentAttachments, draggableAttachment];
					onAttachmentsChanged(
						newAttachmentsArray.map((attachment) => ({
							dataUrl: attachment.dataUrl,
							file: attachment.file,
						}))
					);
					return newAttachmentsArray;
				});
			});

			reader.readAsDataURL(file);
		}
	};

	const handleRemoveAttachment = (idToRemove) => {
		let filteredAttachments = attachments.filter((attachment) => attachment.id !== idToRemove);
		onAttachmentsChanged(
			filteredAttachments.map((attachment) => ({
				dataUrl: attachment.dataUrl,
				file: attachment.file,
			}))
		);
		setAttachments(filteredAttachments);
	};

	const handleAttachmentsReordered = (reorderedAttachments) => {
		onAttachmentsChanged(
			reorderedAttachments.map((attachment) => ({
				dataUrl: attachment.dataUrl,
				file: attachment.file,
			}))
		);
		setAttachments(reorderedAttachments);
	};

	return (
		<div className="mb-5 mt-5">
			<Title>Attachments</Title>
			<input hidden ref={fileInputRef} type="file" multiple onChange={handleFilesSelected} />

			<h3 className="font-semibold text-xl mb-2">
				{attachments.length} {attachments.length !== 1 ? "attachments" : "attachment"}
			</h3>
			<div className="mb-5">
				<DragAndDropAttachments
					attachments={attachments}
					onAttachmentsReordered={handleAttachmentsReordered}
					onRemoveAttachment={handleRemoveAttachment}
				/>
			</div>
			<Button fluid color="purple" onClick={handleAttachClick}>
				<div className="flex-center">
					<PaperClipIcon style={{ width: "15px" }} className="mr-5" /> Attach
				</div>
			</Button>
		</div>
	);
}
