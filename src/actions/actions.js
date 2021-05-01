import { galleryImages } from '../services/gallaryService';
import { 
    LOAD_GALLERY_DATA, 
    REMOVE_GALLERY_DATA, 
    UPDATE_GALLERY_DATA, 
    UPDATE_SORT_DATA } from '../constants/constants';

export const loadGalleryImage = () => async (dispatch) => {
    const newCount = await galleryImages();
    
    dispatch({
        type: LOAD_GALLERY_DATA, 
        payload: newCount
    })
}

export const updateGalleryImage = (data) => async (dispatch) => {

    dispatch({
        type: UPDATE_GALLERY_DATA, 
        payload: data
    })

}

export const removeGalleryImage = (data) => async (dispatch) => {
    dispatch({
        type: REMOVE_GALLERY_DATA, 
        payload: data
    })
}

export const sortingGalleryImage = (data) => async (dispatch) => {
    dispatch({
        type: UPDATE_SORT_DATA, 
        payload: data
    })
}