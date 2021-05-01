import { ItemTypes } from './Items';
import { useDrag } from 'react-dnd';

const ItemCard = props => {
	const [ {isDragging}, drag] = useDrag({
		item: {
			type: ItemTypes.CARD,
			id: props._id,
		},
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	
	return (
		<div
			ref={drag}
			className="task-card"
			>
			<div>
				<img src={props.img} width={200} height={200} style={{margin: 'auto'}} />
			</div>
		</div>
	);
};

export default ItemCard;
