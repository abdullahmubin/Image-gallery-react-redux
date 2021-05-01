import { createContext, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import ItemCard from './ItemCard';
import DoneCard from './DoneCard';
import BoxTarget from './BoxTarget';

import { 
	loadGalleryImage, 
	updateGalleryImage, 
	removeGalleryImage, 
	sortingGalleryImage 
} from '../actions/actions';

export const CardContext = createContext({
	markAsDone: null,
});

const GalleryInfo = ({ sortingGalleryImage, removeGalleryImage, updateGalleryImage, galleryImagesList, loadGalleryImageTask }) => {

	useEffect(() => {
		loadGalleryImageTask();
	}, []);

	//TODO: is it right place to put something in LocalStorage!!!.

	useEffect(() => {
		localStorage.setItem('gallaryData', JSON.stringify(galleryImagesList));
		
	}, [galleryImagesList])

	const markAsDone = _id => {
		updateGalleryImage(_id);
	};

	//TODO: should i use callback or plain function, some source said that,
	// while drag and drop useCallback is better!!!.
	
	const moveCard = useCallback((dragIndex, hoverIndex) => {
		sortingGalleryImage({ dragIndex, hoverIndex })
	},[galleryImagesList]); 

	const removePhotoFromGallery = (id) => {
		removeGalleryImage(id);
	}
	return (
		<CardContext.Provider value={{ markAsDone }}>
			<div className="main-container">
				<div className="media-panel-container">
					<div>
						<p>Media Panel</p>
						{galleryImagesList && galleryImagesList
							.filter((item, i) => item.status === 'processing')
							.map((item, i) => (
								<ItemCard
									key={item.char_id.toString()}
									_id={item.char_id}
									img={item.img}
									name={item.name}
								/>
							))}
					</div>
				</div>
				<div className="canvas-container">
					<div>
						<BoxTarget>
							{galleryImagesList && galleryImagesList
								.filter((item, i) => item.status === 'done')
								.map((item, i) => (
									<DoneCard
										key={item.char_id.toString()}
										img={item.img}
										name={item.name}
										index={i}
										id={item.char_id}
										text={item.title}
										moveCard={moveCard}
										removePhotoFromGallery={removePhotoFromGallery}
									/>
								))}
						</BoxTarget>
					</div>
				</div>
			</div>
		</CardContext.Provider>
	);
};

const mapStateToProps = state => ({
	galleryImagesList: state.galleryInformation
});

const mapDispatchToProps = {
	loadGalleryImageTask: loadGalleryImage,
	updateGalleryImage: updateGalleryImage,
	sortingGalleryImage: sortingGalleryImage,
	removeGalleryImage: removeGalleryImage,
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryInfo);