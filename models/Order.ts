import { Schema, model, models } from "mongoose";

const OrderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    volume: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const OrderSchema = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },

    customer: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        required: true,
      },

      note: {
        type: String,
        default: "",
      },
    },

    items: {
      type: [OrderItemSchema],
      default: [],
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    coupon: {
      type: String,
      default: "",
    },

    total: {
      type: Number,
      default: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Bkash", "Nagad", "Rocket"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Packing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    trackingNumber: {
      type: String,
      default: "",
    },

    whatsappSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Order || model("Order", OrderSchema);