import { useDrop } from 'react-dnd';
import { ItemTypes } from './Items';
import { useContext } from 'react';
import { CardContext } from './galleryInfo';

const BoxTarget = props => {
	const { markAsDone } = useContext(CardContext);

	const [, drop] = useDrop({
		accept: ItemTypes.CARD,
		drop: (item, monitor) => markAsDone(item.id),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	});
	
	return (
		<div
			ref={drop}
			className="drop-item-container">
			{props.children}
		</div>
	);
};

export default BoxTarget;
