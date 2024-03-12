import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import ShortenUrlForm from './components/ShortenUrlForm'
import UserShortenedURLs from './components/UserShortenedURLs'
function App() {
  return (
    <>
      <Header />
      <ShortenUrlForm />
      <UserShortenedURLs />
      <Footer />
    </>
  )
}

export default App
