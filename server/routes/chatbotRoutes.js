import express from 'express';
import Groq from 'groq-sdk';
import Product from '../models/Product.js';

const router = express.Router();

// Initialize Groq client
const getGroq = () => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set in environment variables');
  }
  return new Groq({
    apiKey: process.env.GROQ_API_KEY
  });
};

// System prompt for D'Chic Fashion chatbot
const SYSTEM_PROMPT = `Bạn là trợ lý ảo thông minh của D'Chic Fashion - thương hiệu thời trang nữ cao cấp tại Việt Nam.

THÔNG TIN CÔNG TY:
- Tên: Công ty TNHH Thời Trang D'Chic
- Địa chỉ: 41 Tràng Tiền, Hoàn Kiếm, Hà Nội
- Hotline: 024 3562 2626
- Giờ làm việc: 8:00 - 21:00 (Thứ 2 - Chủ nhật)

SẢN PHẨM:
- Áo: Áo sơ mi, áo kiểu, áo thun, áo len
- Váy đầm công sở: Váy công sở, đầm dự tiệc
- Áo khoác: Blazer, cardigan, jacket
- Quần: Quần tây, quần jean, quần culottes
- Chân váy: Chân váy bút chì, chân váy xòe

CHÍNH SÁCH:
1. ĐỔI TRẢ:
   - Thời gian: 7 ngày kể từ ngày nhận hàng
   - Điều kiện: Còn nguyên tem mác, chưa qua sử dụng
   - Miễn phí đổi size trong vòng 7 ngày

2. GIAO HÀNG:
   - Miễn phí giao hàng toàn quốc cho đơn từ 500.000đ
   - Nội thành Hà Nội: 2-3 ngày
   - Các tỉnh thành khác: 3-5 ngày

3. THANH TOÁN:
   - COD: Thanh toán khi nhận hàng
   - Online: Thanh toán qua PayOS (QR Code, Ví điện tử, Thẻ ATM/Visa/Master)

4. SIZE:
   - S: Vai 36cm, Ngực 84cm, Eo 68cm, Dài 60cm
   - M: Vai 37cm, Ngực 88cm, Eo 72cm, Dài 61cm
   - L: Vai 38cm, Ngực 92cm, Eo 76cm, Dài 62cm
   - XL: Vai 39cm, Ngực 96cm, Eo 80cm, Dài 63cm

PHONG CÁCH TRẢ LỜI:
- Thân thiện, chuyên nghiệp, lịch sự
- Sử dụng gạch đầu dòng (-) hoặc số thứ tự (1., 2., 3.) để trình bày thông tin rõ ràng
- Sử dụng **text** để in đậm các thông tin quan trọng (tên sản phẩm, tiêu đề, số liệu)
- Xuống dòng giữa các mục để dễ đọc
- Ngắn gọn, súc tích nhưng đầy đủ thông tin
- Hạn chế sử dụng emoji, chỉ dùng khi thực sự cần thiết
- Luôn đề xuất liên hệ hotline nếu cần tư vấn chi tiết
- Không trả lời về chủ đề ngoài thời trang và dịch vụ của D'Chic

VÍ DỤ FORMAT TRẢ LỜI:
Câu hỏi: "Chính sách đổi trả như thế nào?"
Trả lời: "Chính sách đổi trả của D'Chic Fashion:
- **Thời gian**: 7 ngày kể từ ngày nhận hàng
- **Điều kiện**: Sản phẩm còn nguyên tem mác, chưa qua sử dụng
- **Miễn phí** đổi size trong vòng 7 ngày

Liên hệ hotline **024 3562 2626** để được hỗ trợ!"

HẠN CHẾ:
- KHÔNG bịa đặt thông tin về sản phẩm cụ thể (giá, mã sản phẩm)
- KHÔNG tư vấn về các thương hiệu khác
- KHÔNG thảo luận về chính trị, tôn giáo, hay chủ đề nhạy cảm

QUAN TRỌNG:
- Khi được cung cấp danh sách sản phẩm trong context, BẮT BUỘC phải liệt kê TẤT CẢ các sản phẩm đó
- KHÔNG được bỏ qua hoặc tóm tắt danh sách sản phẩm
- Phải hiển thị đầy đủ: tên, mã, giá của từng sản phẩm`;

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Check if user is asking about products
    const lowerMessage = message.toLowerCase();
    let productContext = '';
    
    if (lowerMessage.includes('sản phẩm mới') || 
        lowerMessage.includes('new collection') || 
        lowerMessage.includes('bộ sưu tập mới') ||
        lowerMessage.includes('có gì mới') ||
        lowerMessage.includes('sản phẩm nào mới') ||
        lowerMessage.includes('hàng mới') ||
        lowerMessage.includes('mới về') ||
        lowerMessage.includes('mới nhất')) {
      
      // Get newest products (featured or recent)
      const newProducts = await Product.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']]
      });

      if (newProducts.length > 0) {
        productContext = '\n\n=== DANH SÁCH SẢN PHẨM MỚI NHẤT ===\n';
        productContext += 'BẮT BUỘC phải hiển thị TẤT CẢ các sản phẩm sau cho khách hàng:\n\n';
        newProducts.forEach((product, index) => {
          const price = new Intl.NumberFormat('vi-VN').format(product.price);
          productContext += `**${index + 1}.** ${product.name}\n`;
          productContext += `   Mã: ${product.code}\n`;
          productContext += `   Giá: ${price}đ\n\n`;
        });
        productContext += 'Sau khi liệt kê, hãy đề xuất khách hàng xem chi tiết trên website hoặc liên hệ hotline 024 3562 2626. Nhớ in đậm số thứ tự, tên sản phẩm và giá.';
      }
    }

    const groq = getGroq();

    // Build messages array for Groq
    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT + productContext
      },
      // Add conversation history (limit to last 10 messages for context)
      ...conversationHistory.slice(-10).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      // Add current message
      {
        role: 'user',
        content: message
      }
    ];

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile', // Fast and capable model
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.9,
      stream: false
    });

    const botResponse = completion.choices[0]?.message?.content || 
      'Xin lỗi, tôi không thể trả lời lúc này. Vui lòng liên hệ hotline 024 3562 2626 để được hỗ trợ.';

    res.json({
      success: true,
      response: botResponse,
      model: completion.model,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Groq API Error:', error);
    
    // Fallback response
    const fallbackResponse = await getFallbackResponse(req.body.message);
    
    res.json({
      success: true,
      response: fallbackResponse,
      fallback: true
    });
  }
});

// Fallback responses when Groq API fails
async function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('sản phẩm mới') || 
      lowerMessage.includes('new collection') || 
      lowerMessage.includes('bộ sưu tập mới') ||
      lowerMessage.includes('có gì mới') ||
      lowerMessage.includes('sản phẩm nào mới') ||
      lowerMessage.includes('hàng mới') ||
      lowerMessage.includes('mới về') ||
      lowerMessage.includes('mới nhất')) {
    try {
      const newProducts = await Product.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']]
      });

      if (newProducts.length > 0) {
        let response = 'Sản phẩm mới của D\'Chic Fashion:\n\n';
        newProducts.forEach((product, index) => {
          const price = new Intl.NumberFormat('vi-VN').format(product.price);
          response += `**${index + 1}.** **${product.name}**\n   - Mã: ${product.code}\n   - Giá: **${price}đ**\n\n`;
        });
        response += 'Xem chi tiết tại trang New Collection trên website hoặc liên hệ hotline **024 3562 2626**!';
        return response;
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    return 'Chúng tôi có nhiều sản phẩm mới trong bộ sưu tập New Collection. Vui lòng truy cập website hoặc liên hệ hotline 024 3562 2626 để được tư vấn chi tiết!';
  }

  if (lowerMessage.includes('đổi trả') || lowerMessage.includes('chính sách')) {
    return 'Chính sách đổi trả của D\'Chic Fashion:\n- **Thời gian**: 7 ngày kể từ ngày nhận hàng\n- **Điều kiện**: Còn nguyên tem mác, chưa qua sử dụng\n- **Miễn phí** đổi size trong vòng 7 ngày\n\nLiên hệ hotline **024 3562 2626** để được hỗ trợ!';
  }
  
  if (lowerMessage.includes('giao hàng') || lowerMessage.includes('ship')) {
    return 'Thông tin giao hàng:\n- **Miễn phí** giao hàng toàn quốc cho đơn từ **500.000đ**\n- Nội thành Hà Nội: **2-3 ngày**\n- Các tỉnh thành khác: **3-5 ngày**';
  }
  
  if (lowerMessage.includes('size') || lowerMessage.includes('cỡ')) {
    return 'Hướng dẫn chọn size:\n- Bạn có thể tham khảo **bảng size chi tiết** tại mỗi sản phẩm\n- Liên hệ hotline **024 3562 2626** để được tư vấn size phù hợp';
  }
  
  if (lowerMessage.includes('liên hệ') || lowerMessage.includes('hotline')) {
    return 'Thông tin liên hệ D\'Chic Fashion:\n- **Hotline**: 024 3562 2626\n- **Địa chỉ**: 41 Tràng Tiền, Hoàn Kiếm, Hà Nội\n- **Giờ làm việc**: 8:00 - 21:00 (Thứ 2 - Chủ nhật)';
  }
  
  if (lowerMessage.includes('thanh toán')) {
    return 'Hình thức thanh toán:\n- **COD**: Thanh toán khi nhận hàng\n- **Online qua PayOS**: QR Code, Ví điện tử, Thẻ ATM/Visa/Master';
  }

  return 'Cảm ơn bạn đã liên hệ! Để được hỗ trợ tốt nhất, vui lòng:\n- Gọi hotline: **024 3562 2626**\n- Hoặc chọn câu hỏi thường gặp bên dưới';
}

export default router;
