import { useState, useEffect, useRef } from 'react'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Xin chào! Tôi là trợ lý ảo của D\'Chic Fashion. Tôi có thể giúp gì cho bạn?',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  // Function to render markdown bold
  const renderMessageText = (text) => {
    // Convert **text** to <strong>text</strong>
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  const quickReplies = [
    'Chính sách đổi trả',
    'Thông tin giao hàng',
    'Hướng dẫn chọn size',
    'Liên hệ'
  ]

  // Auto scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    const userMessage = {
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Add typing indicator
    const typingMessage = {
      type: 'bot',
      text: '...',
      time: '',
      isTyping: true
    }
    setMessages(prev => [...prev, typingMessage])

    try {
      // Call backend API with Groq
      const response = await fetch('http://localhost:5001/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.filter(m => !m.isTyping)
        })
      })

      const data = await response.json()

      // Remove typing indicator and add real response
      setMessages(prev => {
        const withoutTyping = prev.filter(m => !m.isTyping)
        return [...withoutTyping, {
          type: 'bot',
          text: data.response,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }]
      })

    } catch (error) {
      console.error('Chat error:', error)
      // Remove typing indicator and show error
      setMessages(prev => {
        const withoutTyping = prev.filter(m => !m.isTyping)
        return [...withoutTyping, {
          type: 'bot',
          text: 'Xin lỗi, tôi gặp sự cố kết nối. Vui lòng thử lại hoặc liên hệ hotline 024 3562 2626.',
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }]
      })
    }
  }

  const handleQuickReply = (reply) => {
    handleSendMessage(reply)
  }

  return (
    <>
      {/* Chat Button */}
      <div 
        className={`chatbot-button ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
          </svg>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="chatbot-title">D'Chic Fashion</div>
                <div className="chatbot-status">
                  <span className="status-dot"></span>
                  Đang hoạt động
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  <div className={`message-text ${message.isTyping ? 'typing' : ''}`}>
                    {message.isTyping ? '' : renderMessageText(message.text)}
                  </div>
                  {!message.isTyping && <div className="message-time">{message.time}</div>}
                </div>
              </div>
            ))}

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="quick-replies">
                <div className="quick-replies-title">Câu hỏi thường gặp:</div>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
            />
            <button 
              className="send-button"
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
