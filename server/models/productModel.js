const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, `Please enter product name`]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        oldprice: {
            type: Number,
            required: true,
        },
        percentage: {
            type: Number,
            required: false,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

// export the schema as a model to node file
const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
