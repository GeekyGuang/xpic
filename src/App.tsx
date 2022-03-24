import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import Loading from './components/Loading'
import './App.css'
import { useStore } from './store'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const History = lazy(() => import('./pages/History'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

const PrivateRoute = ({ children }: { children: any }) => {
  const { UserStore } = useStore()
  const { currentUser } = UserStore
  return currentUser ? children : <Navigate to="/login" />
}

function App() {
  return (
    <>
      <Header />
      <main>
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
      </main>
      <Footer />
    </>
  )
}

export default App
