# Hướng dẫn cấu hình Groq AI cho Chatbot

## Bước 1: Lấy API Key từ Groq

1. Truy cập: https://console.groq.com/
2. Đăng ký/Đăng nhập tài khoản
3. Vào mục "API Keys"
4. Click "Create API Key"
5. Copy API key (chỉ hiển thị 1 lần)

## Bước 2: Cấu hình Backend

Mở file `webthoitrang/server/.env` và thay thế:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Thành:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Bước 3: Khởi động lại Backend

```bash
cd webthoitrang/server
npm run dev
```

## Bước 4: Test Chatbot

1. Mở website: http://localhost:3000
2. Click vào nút chat ở góc dưới bên phải
3. Thử hỏi:
   - "Chính sách đổi trả như thế nào?"
   - "Giao hàng mất bao lâu?"
   - "Tôi muốn mua áo sơ mi size M"
   - "Có khuyến mãi gì không?"

## Tính năng Chatbot với Groq AI

✅ Trả lời thông minh bằng AI (Llama 3.3 70B)
✅ Nhớ ngữ cảnh cuộc hội thoại (10 tin nhắn gần nhất)
✅ Typing indicator khi đang xử lý
✅ Fallback responses khi API lỗi
✅ Tối ưu cho thời trang D'Chic Fashion

## Model sử dụng

- **llama-3.3-70b-versatile**: Nhanh, thông minh, phù hợp chatbot
- Temperature: 0.7 (cân bằng giữa sáng tạo và chính xác)
- Max tokens: 500 (đủ cho câu trả lời ngắn gọn)

## Lưu ý

- API key miễn phí có giới hạn requests/phút
- Nếu vượt quota, chatbot sẽ dùng fallback responses
- Không commit API key lên Git!
