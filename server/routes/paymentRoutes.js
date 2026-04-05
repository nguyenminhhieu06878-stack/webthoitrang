import express from 'express';
import { PayOS } from '@payos/node';

const router = express.Router();

// Helper function to get PayOS instance
const getPayOS = () => {
  return new PayOS(
    process.env.PAYOS_CLIENT_ID,
    process.env.PAYOS_API_KEY,
    process.env.PAYOS_CHECKSUM_KEY
  );
};

// Create payment link
router.post('/create-payment-link', async (req, res) => {
  try {
    const payOS = getPayOS();
    const { orderCode, amount, description, items, buyerName, buyerEmail, buyerPhone, returnUrl, cancelUrl } = req.body;

    const paymentData = {
      orderCode: orderCode,
      amount: amount,
      description: description,
      returnUrl: returnUrl || `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment-success`,
      cancelUrl: cancelUrl || `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment-cancel`
    };

    const paymentLinkResponse = await payOS.paymentRequests.create(paymentData);
    
    res.json({
      success: true,
      checkoutUrl: paymentLinkResponse.checkoutUrl,
      paymentLinkId: paymentLinkResponse.paymentLinkId
    });
  } catch (error) {
    console.error('PayOS Error:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể tạo link thanh toán',
      error: error.message
    });
  }
});

// Get payment info
router.get('/payment-info/:orderCode', async (req, res) => {
  try {
    const payOS = getPayOS();
    const { orderCode } = req.params;
    const paymentInfo = await payOS.paymentRequests.get(orderCode);
    
    res.json({
      success: true,
      data: paymentInfo
    });
  } catch (error) {
    console.error('PayOS Error:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể lấy thông tin thanh toán',
      error: error.message
    });
  }
});

// Cancel payment link
router.post('/cancel-payment/:orderCode', async (req, res) => {
  try {
    const payOS = getPayOS();
    const { orderCode } = req.params;
    const { cancellationReason } = req.body;
    
    const result = await payOS.paymentRequests.cancel(orderCode, cancellationReason);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('PayOS Error:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể hủy thanh toán',
      error: error.message
    });
  }
});

// Webhook handler for payment status updates
router.post('/webhook', async (req, res) => {
  try {
    const payOS = getPayOS();
    const webhookData = req.body;
    
    // Verify webhook signature
    const verifiedData = await payOS.webhooks.verify(webhookData);
    
    // Handle payment status
    const { orderCode, amount } = verifiedData.data;
    
    console.log('Payment webhook received:', {
      orderCode,
      amount,
      status: verifiedData.success ? 'PAID' : 'FAILED'
    });

    // TODO: Update order status in database based on payment status
    // if (verifiedData.success) {
    //   // Update order status to paid
    // }

    res.json({
      success: true,
      message: 'Webhook processed successfully'
    });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed',
      error: error.message
    });
  }
});

export default router;
