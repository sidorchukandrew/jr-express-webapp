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
						<img src={image} height="200px" className="h-56" alt="Invoice attachment" />
					</div>
				),
				dataUrl: image,
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
					};
					let newImagesArray = [...currentImages, draggableImage];
					onImagesChanged(newImagesArray.map((image) => image.dataUrl));
					return newImagesArray;
				});
			});

			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = (idToRemove) => {
		let filteredImages = images.filter((image) => image.id !== idToRemove);
		onImagesChanged(filteredImages.map((image) => image.dataUrl));
		setImages(filteredImages);
	};

	const handleImagesReordered = (reorderedImages) => {
		onImagesChanged(reorderedImages.map((image) => image.dataUrl));
		setImages(reorderedImages);
	};

	return (
		<div className="mb-5 mt-5">
			<Title>Images</Title>
			<input hidden ref={fileInputRef} type="file" multiple onChange={handleFilesSelected} />

			<h3>
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
