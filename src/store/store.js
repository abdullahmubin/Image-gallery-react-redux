import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { 
    LOAD_GALLERY_DATA, 
    REMOVE_GALLERY_DATA, 
    UPDATE_GALLERY_DATA, 
    UPDATE_SORT_DATA } from '../constants/constants';

// NOTE:
// it contain single state, so i have made store and reducer in a single page
// Otherwise it will divided into multiple reducer

// TODO:
// Make multiple reducer and seperate store.

const initialState = {
    galleryInformation: [],
};

const updateSortInfo = (info, obj) => {

    let old_index = obj.dragIndex;
    let new_index = obj.hoverIndex;
    
    let doneInfo = info.filter((task, i) => task.status === 'done')

    let oldInfo = doneInfo[old_index];
    let newInfo = doneInfo[new_index];

    // Logic: find real array index, then replace their position. otherwise maybe there will be a problem.

    let old_index_real = info.findIndex(function(obj){return obj.char_id === oldInfo.char_id});
    let new_index_real = info.findIndex(function(obj){return obj.char_id === newInfo.char_id});

    if (new_index_real >= info.length) {
        var k = new_index_real - info.length + 1;
        while (k--) {
            info.push(undefined);
        }
    }
    info.splice(new_index_real, 0, info.splice(old_index_real, 1)[0]);

    return info;

}
const updateInformation = (info, _id) => {

    if (!info) return;

    return info.map((item) => {
        if (item.char_id === _id) {
            return {
                ...item,
                status: 'done',
                

            }
        } else return item;
    })
}

const removeGallerydata = (info, _id) => {
    if (!info) return;

    return info.map((item) => {
        if (item.char_id === _id) {
            return {
                ...item,
                status: 'processing',

            }
        } else return item;
    })
}
const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_GALLERY_DATA:
            return {
                ...state,
                galleryInformation: action.payload
            }
        case UPDATE_GALLERY_DATA:
            return {
                ...state,
                galleryInformation: updateInformation(state.galleryInformation, action.payload)
            }
        case UPDATE_SORT_DATA:
            return {
                ...state,
                galleryInformation: updateSortInfo(state.galleryInformation, action.payload)
            }
        case REMOVE_GALLERY_DATA:
            return {
                ...state,
                galleryInformation: removeGallerydata(state.galleryInformation, action.payload) 
            }
        default:
            return state;
    }
}

export default createStore(rootReducer, applyMiddleware(thunk));