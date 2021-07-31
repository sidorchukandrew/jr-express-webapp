import { useRef, useState } from "react";
import { Button } from "semantic-ui-react";
import DragAndDropImages from "./DragAndDropImages";
import PaperClipIcon from "@heroicons/react/outline/PaperClipIcon";
import Title from "./Title";

export default function InvoiceFormImages({ form, onImagesChanged }) {
	const [images, setImages] = useState(() => {
		if ("images" in form) {
			return form.images.map((image, index) => ({
				id: `item-${index}`,
				content: (
					<div>
						<img src={image.dataUrl} height="200px" className="h-56" alt="Invoice attachment" />
					</div>
				),
				dataUrl: image.dataUrl,
				file: image.file,
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

				setImages((currentImages) => {
					let draggableImage = {
						id: `item-${currentImages.length}`,
						content: (
							<div>
								<img src={dataUrl} height="200px" className="h-56" alt="Invoice attachment" />
							</div>
						),
						dataUrl: dataUrl,
						file: file,
					};
					let newImagesArray = [...currentImages, draggableImage];
					onImagesChanged(
						newImagesArray.map((image) => ({ dataUrl: image.dataUrl, file: image.file }))
					);
					return newImagesArray;
				});
			});

			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = (idToRemove) => {
		let filteredImages = images.filter((image) => image.id !== idToRemove);
		onImagesChanged(filteredImages.map((image) => ({ dataUrl: image.dataUrl, file: image.file })));
		setImages(filteredImages);
	};

	const handleImagesReordered = (reorderedImages) => {
		onImagesChanged(reorderedImages.map((image) => ({ dataUrl: image.dataUrl, file: image.file })));
		setImages(reorderedImages);
	};

	return (
		<div className="mb-5 mt-5">
			<Title>Attachments</Title>
			<input hidden ref={fileInputRef} type="file" multiple onChange={handleFilesSelected} />

			<h3 className="font-semibold text-xl mb-2">
				{images.length} {images.length !== 1 ? "images" : "image"} attached
			</h3>
			<div className="mb-5">
				<DragAndDropImages
					images={images}
					onImagesReordered={handleImagesReordered}
					onRemoveImage={handleRemoveImage}
				/>
			</div>
			<Button fluid color="purple" onClick={handleAttachClick}>
				<div className="flex-center">
					<PaperClipIcon style={{ width: "15px" }} className="mr-5" /> Attach Images
				</div>
			</Button>
		</div>
	);
}
