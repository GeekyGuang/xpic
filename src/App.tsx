import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import Loading from './components/Loading'
import './App.css'
import { useStore } from './store'
import styled from 'styled-components'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const History = lazy(() => import('./pages/History'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

const PrivateRoute = ({ children }) => {
  const { UserStore } = useStore()
  const { currentUser } = UserStore
  return currentUser ? children : <Navigate to="/login" />
}

const MainWrapper = styled.div`
  width: 100%;
  margin: 20px auto;

  @media (min-width: 980px) {
    max-width: 92%;
  }

  @media (min-width: 1200px) {
    max-width: 78%;
  }

  @media (min-width: 1470px) {
    max-width: 72%;
  }
`

function App() {
  return (
    <>
      <Header />
      <main>
        <MainWrapper>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/history"
                element={
                  <PrivateRoute>
                    <History />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Suspense>
        </MainWrapper>
      </main>
      <Footer />
    </>
  )
}

export default App
