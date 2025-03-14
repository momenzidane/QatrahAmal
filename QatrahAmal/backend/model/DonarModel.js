const mongoose = require("mongoose");

const donarSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    age: {
      type: Number,
      required: [true, "Please add an age"],
    },
    bloodType: {
      type: String,
      required: [true, "Please add a blood type"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    isAvailable: {
      type: Boolean,
      default: true, // بشكل افتراضي المتبرع متاح
    }
  },
  {
    timestamps: true, // يتم إضافة تاريخ الإنشاء والتعديل
  }
);

module.exports = mongoose.model("Donar", donarSchema);
