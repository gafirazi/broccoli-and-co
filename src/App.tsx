import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#7043fe'
      },
    }}>
      <header>
        <Header />
      </header>
      <Home />
      <footer>
        <Footer />
      </footer>
    </ConfigProvider>
  )
}

export default App
