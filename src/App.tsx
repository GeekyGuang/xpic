import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import Loading from './components/Loading'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const History = lazy(() => import('./pages/History'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
