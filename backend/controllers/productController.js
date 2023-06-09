import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

// @desc fetch all products
// GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
    console.log('this shows up', req.cookies)
    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch one product
// GET /api/products
// @access public

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        return res.json(product)
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }
})

export { getProductById, getProducts }
