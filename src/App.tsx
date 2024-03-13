import { QueryClient, QueryClientProvider } from 'react-query'

import Footer from './components/Footer'
import Header from './components/Header'
import ShortenUrlForm from './components/ShortenUrlForm'
import UserShortenedURLs from './components/UserShortenedURLs'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Header />
        <ShortenUrlForm />
        <UserShortenedURLs />
        <Footer />
    </QueryClientProvider>
  )
}

export default App
