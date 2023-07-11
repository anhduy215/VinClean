const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    serviceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    optionName: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
});

module.exports = mongoose.model("Option", optionSchema);
