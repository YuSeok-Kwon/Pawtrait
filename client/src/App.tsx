import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UploadPage } from './pages/UploadPage';
import { MakeImgPage } from './pages/MakeImgPage';
import { ResultPage } from './pages/ResultPage';
import { SharePage } from './pages/SharePage';

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/upload' element={<UploadPage />} />
          <Route path='/makeImg' element={<MakeImgPage />} />
          <Route path='/result' element={<ResultPage />} />
          <Route path='/share' element={<SharePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
