const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the hospital name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    }
}, {
    timestamps: true  // This will automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Hospital', hospitalSchema);
