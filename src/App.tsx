import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const History = lazy(() => import('./pages/History'))

function App() {
  return (
     <>
     <Header />
     <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/history' element={<History />} />
      </Routes>
     </Suspense>

     <Footer />
     </>
  );
}

export default App;
