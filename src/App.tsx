import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { About } from './pages/About';
import { History } from './pages/History';
import { Home } from './pages/Home';

function App() {
  return (
     <>
     <Header />
     <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/about' element={<About />} />
       <Route path='/history' element={<History />} />
     </Routes>
     <Footer />
     </>
  );
}

export default App;
