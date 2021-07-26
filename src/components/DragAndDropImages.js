import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import XCircleIcon from "@heroicons/react/solid/XCircleIcon";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	position: "relative",
	padding: 4,
	// styles we need to apply on draggables
	...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? "#c7c7c7" : "#e0e0e0",
	display: "flex",
	padding: 4,
	overflow: "auto",
	transition: "background 0.4s ease-in-out",
	height: 220,
});

export default function DragAndDropImages({ images, onImagesReordered, onRemoveImage }) {
	const [items, setItems] = useState(images);

	useEffect(() => {
		setItems(images);
	}, [images]);

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const reorderedItems = reorder(items, result.source.index, result.destination.index);

		setItems(reorderedItems);
		onImagesReordered(reorderedItems);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
						{...provided.droppableProps}
					>
						{items.map((item, index) => (
							<Draggable key={item.id} draggableId={item.id} index={index}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
									>
										<button
											className="absolute top-right flex-center appearance-none"
											onClick={() => onRemoveImage(item.id)}
										>
											<XCircleIcon style={{ width: "20px", color: "black", cursor: "pointer" }} />
										</button>
										{item.content}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
