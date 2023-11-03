import mongoose from 'mongoose'

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
            required: false,
        },
        percentage: {
            type: Number,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        cartQuantity: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

// export the schema as a model to node file
const Product = mongoose.model('Product', ProductSchema)
export default Product
