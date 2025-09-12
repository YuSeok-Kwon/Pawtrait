import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainPage from './pages/MainPage';
import UploadPage from './pages/UploadPage';
import ResultPage from './pages/ResultPage';
import TransformPage from './pages/TransformPage';
import SharePage from './pages/SharePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import GNB from './components/GNB';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <div className='app'>
        <Router>
          <GNB />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='/result' element={<ResultPage />} />
            <Route path='/transform' element={<TransformPage />} />
            <Route path='/share' element={<SharePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/email-verification' element={<EmailVerificationPage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
