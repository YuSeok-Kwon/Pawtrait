import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UploadPage from './pages/UploadPage';
import ResultPage from './pages/ResultPage';
import GNB from './components/GNB';
import Footer from './components/Footer';

function App() {
  return (
    <div className='app'>
      <Router>
        <GNB />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/upload' element={<UploadPage />} />
          <Route path='/result' element={<ResultPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
