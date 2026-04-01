import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicLayout from './components/PublicLayout'
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
import Category from './pages/Category'
import BlogPage from './pages/BlogPage'
import BlogDetail from './pages/BlogDetail'
import LookbookPage from './pages/Lookbook'
import Showroom from './pages/Showroom'
import ShoppingGuide from './pages/ShoppingGuide'
import ReturnPolicy from './pages/ReturnPolicy'
import AccountInfo from './pages/AccountInfo'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductDetail from './pages/ProductDetail'
import AdminLayout from './pages/Admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import Products from './pages/Admin/Products'
import AdminOrders from './pages/Admin/AdminOrders'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminBlogs from './pages/Admin/AdminBlogs'
import AdminLookbook from './pages/Admin/AdminLookbook'
import AdminSettings from './pages/Admin/AdminSettings'
import AdminCategories from './pages/Admin/AdminCategories'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes with Header/Footer */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="gioi-thieu" element={<AboutUs />} />
            <Route path="ve-chung-toi" element={<AboutUs />} />
            <Route path="lien-he" element={<Contact />} />
            <Route path="chinh-sach-bao-mat" element={<PrivacyPolicy />} />
            <Route path="new-collection" element={<NewCollection />} />
            <Route path="category/:slug" element={<Category />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="lookbook" element={<LookbookPage />} />
            <Route path="showroom" element={<Showroom />} />
            <Route path="huong-dan-mua-hang" element={<ShoppingGuide />} />
            <Route path="quy-dinh-doi-hang" element={<ReturnPolicy />} />
            <Route path="thong-tin-tai-khoan" element={<AccountInfo />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="don-hang" element={<Orders />} />
            <Route path="cart" element={<Cart />} />
            <Route path="gio-hang" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="thanh-toan" element={<Checkout />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="dang-nhap" element={<Login />} />
            <Route path="dang-ky" element={<Register />} />
          </Route>
          
          {/* Admin Routes without Header/Footer */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="lookbook" element={<AdminLookbook />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  )
}

export default App
