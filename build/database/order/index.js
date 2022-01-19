"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OrderSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "Users"
  },
  orderDetails: [{
    food: {
      type: _mongoose["default"].Types.ObjectId,
      ref: "Foods"
    },
    quantity: {
      type: Number,
      required: true
    },
    paymonde: {
      type: String,
      requird: true
    },
    status: {
      type: String,
      "default": "Placed"
    },
    paymentDetails: {
      itemTotal: {
        type: Number,
        required: true
      },
      promo: {
        type: Number,
        required: true
      },
      tax: {
        type: Number,
        required: true
      },
      razorpayPaymentId: {
        type: String,
        requird: true
      }
    }
  }]
}, {
  timestamps: true
});

var OrderModel = _mongoose["default"].model("Orders", OrderSchema);

exports.OrderModel = OrderModel;