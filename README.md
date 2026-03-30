# D'Chic Fashion - Website Thời Trang

Website thương mại điện tử thời trang cao cấp với React, Node.js và MongoDB.

## 🚀 Cấu trúc Project

```
dchic-fashion/
├── client/                 # Frontend React + Vite
│   ├── public/
│   │   └── images/        # Thêm ảnh hero vào đây (hero-1.jpg, hero-2.jpg, hero-3.jpg, hero-4.jpg)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── server/                 # Backend Node.js + Express
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── package.json
```

## 📦 Cài đặt

### 1. Cài đặt tất cả dependencies

```bash
npm run install-all
```

Hoặc cài đặt từng phần:

```bash
# Root
npm install

# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 2. Cấu hình Database

Cài đặt MongoDB:
- **macOS**: `brew install mongodb-community`
- **Windows**: Tải từ [mongodb.com](https://www.mongodb.com/try/download/community)

Khởi động MongoDB:
```bash
# macOS/Linux
brew services start mongodb-community

# Windows
net start MongoDB
```

### 3. Cấu hình Environment Variables

Tạo file `.env` trong thư mục `server/`:

```bash
cd server
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin của bạn.

### 4. Thêm hình ảnh

Thêm 4 ảnh hero vào thư mục `client/public/images/`:
- hero-1.jpg
- hero-2.jpg
- hero-3.jpg
- hero-4.jpg

## 🎯 Chạy ứng dụng

### Chạy cả Frontend và Backend cùng lúc:

```bash
npm run dev
```

### Hoặc chạy riêng:

```bash
# Frontend (port 3000)
npm run client

# Backend (port 5000)
npm run server
```

## 🌐 Truy cập

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 📝 API Endpoints

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

### Users
- `POST /api/users/register` - Đăng ký
- `POST /api/users/login` - Đăng nhập

### Orders
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `PATCH /api/orders/:id/status` - Cập nhật trạng thái đơn hàng

## 🎨 Features

- ✅ Header với navigation menu đẹp
- ✅ Hero slider với 4 ảnh (pagination bên phải)
- ✅ Responsive design
- ✅ Backend API với Express
- ✅ MongoDB database với Mongoose
- ✅ User authentication (JWT)
- ✅ Product management
- ✅ Order management

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- CSS3

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## 📱 Responsive

Website được thiết kế responsive cho:
- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (<768px)
