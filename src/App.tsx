import { QueryClient, QueryClientProvider } from 'react-query'

import Footer from './components/Footer'
import Header from './components/Header'
import ShortenUrlForm from './components/ShortenUrlForm'
import UserShortenedURLs from './components/UserShortenedURLs'
import './index.css'

const queryClient = new QueryClient()

function App() {
  return (
    <div id='root'>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className='main-content'>
          <ShortenUrlForm />
          <UserShortenedURLs />
        </div>
        <Footer />
      </QueryClientProvider>
    </div>
  )
}

export default App
