import { ItemTypes } from './Items';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DoneCard = props => {
    let { id, index, moveCard, removePhotoFromGallery } = props;

    const ref = useRef(null);
    const [ { isDraggingDrop }, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            // Logic: get position, then find real position from main state(array), then replace element position

            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            
            if(dragIndex === undefined) return;

            moveCard(dragIndex, hoverIndex);
            
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    // const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const removeFromGallery = (id) => {
        removePhotoFromGallery(id);
    }

    return (
        <div
            className="done-task-card-container"
            className="task-card">
            <div className="done-img-container">
                <img ref={ref} src={props.img} width={200} height={200} className="img-details" style={{ margin: 'auto' }} />

                <i onClick={(e) => removeFromGallery(props.id)} className="fas fa-trash-alt icon-holder remove-icon"></i>
                <i className="fas fa-cog icon-holder show-image-window"></i>

                <div className="toolbar-holder">
                    <div style={{ float: 'left', width: '150px'}}>
                        <h5>Filter / image tab</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoneCard;
