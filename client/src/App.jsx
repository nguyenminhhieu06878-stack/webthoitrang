import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NewCollection from './pages/NewCollection'
import Ao from './pages/Ao'
import VayDamCongSo from './pages/VayDamCongSo'
import AoKhoac from './pages/AoKhoac'
import Quan from './pages/Quan'
import ChanVay from './pages/ChanVay'
import BlogPage from './pages/BlogPage'
import LookbookPage from './pages/Lookbook'
import Showroom from './pages/Showroom'
import ShoppingGuide from './pages/ShoppingGuide'
import ReturnPolicy from './pages/ReturnPolicy'
import AccountInfo from './pages/AccountInfo'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gioi-thieu" element={<AboutUs />} />
          <Route path="/ve-chung-toi" element={<AboutUs />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicy />} />
          <Route path="/new-collection" element={<NewCollection />} />
          <Route path="/ao" element={<Ao />} />
          <Route path="/vay-dam-cong-so" element={<VayDamCongSo />} />
          <Route path="/ao-khoac" element={<AoKhoac />} />
          <Route path="/quan" element={<Quan />} />
          <Route path="/chan-vay" element={<ChanVay />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/huong-dan-mua-hang" element={<ShoppingGuide />} />
          <Route path="/quy-dinh-doi-hang" element={<ReturnPolicy />} />
          <Route path="/thong-tin-tai-khoan" element={<AccountInfo />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
