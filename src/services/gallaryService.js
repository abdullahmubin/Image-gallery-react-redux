import axios from 'axios';

export const galleryImages = () => {
	let storageData = localStorage.getItem('gallaryData');

	// NOTE: check, should i call data or load from local storage.

	if (!storageData) {
		return new Promise((resolve) => {
			axios.get(`https://www.breakingbadapi.com/api/characters?limit=20`)
			.then(res => {
				const result = res.data;
				// NOTE: Process data.
				result.forEach(element => {
					element.status = 'processing'
				});
				resolve(result);
			})
		} )
	
	}
	else {
		return JSON.parse(storageData)
	}

}