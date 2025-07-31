import './index.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NewsList from './pages/NewsList'
import NewsDetail from './pages/NewsDetail'
import Contact from './pages/Contact'
import About from './pages/About'
import MainLayout from './components/MainLayout';



function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route path='home' element={<Home/>}/>
          <Route path='news-list' element={<NewsList/>}/>
          <Route path='news-detail/:id' element={<NewsDetail/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='about' element={<About/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
