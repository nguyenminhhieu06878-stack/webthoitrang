import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    size: String,
    color: String,
    price: {
      type: Number,
      required: true
    },
    image: String
  }],
  shippingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    district: String,
    ward: String,
    zipCode: String
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['COD', 'Banking', 'Momo', 'ZaloPay']
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  note: String,
  deliveredAt: Date
}, {
  timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order
