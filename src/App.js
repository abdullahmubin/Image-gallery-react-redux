import './assets/css/App.css';
import GalleryInfo from './component/galleryInfo';
import { Provider } from 'react-redux';
import store from './store/store';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <GalleryInfo />
        </div>
      </DndProvider>
    </Provider>

  );
}


export default App;