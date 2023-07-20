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

// @desc Create a product
// POST /api/products
// @access Private, Admin

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user_id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

export { getProductById, getProducts, createProduct }
