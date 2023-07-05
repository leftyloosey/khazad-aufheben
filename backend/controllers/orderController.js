import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'

// @desc create new order
// POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

// @desc get logged in user orders
// GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json(orders)
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc update order to paid
// GET /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid')
})

// @desc update order to delivered
// GET /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered')
})

// @desc get all orders
// GET /api/orders/
// @access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
    res.send('get all orders')
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
}

// import asyncHandler from '../middleware/asyncHandler.js'
// import Order from '../models/orderModel.js'

// // @desc    Create new order
// // @route   POST /api/orders
// // @access  Private
// const addOrderItems = asyncHandler(async (req, res) => {
//     const {
//         orderItems,
//         shippingAddress,
//         paymentMethod,
//         itemsPrice,
//         taxPrice,
//         shippingPrice,
//         totalPrice,
//     } = req.body
//     console.log('REQ BODY', req.body)
//     console.log('REQ USER', req.user)
//     // console.log('ORDER ITEMS', orderItems)
//     console.log('COOKIE', req.cookies)
//     // const donkey = orderItems.map((x) => ({
//     //     ...x,
//     //     product: x._id,
//     //     _id: x._id,
//     // }))
//     // console.log(donkey)
//     // if (orderItems && orderItems.length === 0) {
//     //     res.status(400)
//     //     throw new Error('No order items')
//     // } else {
//     const order = new Order({
//         user: req.user._id,
//         orderItems: orderItems.map((x) => ({
//             ...x,
//             product: x._id,
//             _id: undefined,
//         })),
//         shippingAddress,
//         paymentMethod,
//         itemsPrice,
//         taxPrice,
//         shippingPrice,
//         totalPrice,
//     })
//     console.log('ORDER', order)
//     const createdOrder = await order.save()
//     console.log('CREATED ORDER', createdOrder)

//     // res.status(201).json(createdOrder)
// })
// // })

// // @desc    Get logged in user orders
// // @route   GET /api/orders/myorders
// // @access  Private
// const getMyOrders = asyncHandler(async (req, res) => {
//     const orders = await Order.find({ user: req.user._id })
//     res.json(orders)
// })

// // @desc    Get order by ID
// // @route   GET /api/orders/:id
// // @access  Private
// const getOrderById = asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id).populate(
//         'user',
//         'name email'
//     )

//     if (order) {
//         res.json(order)
//     } else {
//         res.status(404)
//         throw new Error('Order not found')
//     }
// })

// // @desc    Update order to paid
// // @route   GET /api/orders/:id/pay
// // @access  Private
// const updateOrderToPaid = asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id)

//     if (order) {
//         order.isPaid = true
//         order.paidAt = Date.now()
//         order.paymentResult = {
//             id: req.body.id,
//             status: req.body.status,
//             update_time: req.body.update_time,
//             email_address: req.body.payer.email_address,
//         }

//         const updatedOrder = await order.save()

//         res.json(updatedOrder)
//     } else {
//         res.status(404)
//         throw new Error('Order not found')
//     }
// })

// // @desc    Update order to delivered
// // @route   GET /api/orders/:id/deliver
// // @access  Private/Admin
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id)

//     if (order) {
//         order.isDelivered = true
//         order.deliveredAt = Date.now()

//         const updatedOrder = await order.save()

//         res.json(updatedOrder)
//     } else {
//         res.status(404)
//         throw new Error('Order not found')
//     }
// })

// // @desc    Get all orders
// // @route   GET /api/orders
// // @access  Private/Admin
// const getOrders = asyncHandler(async (req, res) => {
//     const orders = await Order.find({}).populate('user', 'id name')
//     res.json(orders)
// })

// export {
//     addOrderItems,
//     getMyOrders,
//     getOrderById,
//     updateOrderToPaid,
//     updateOrderToDelivered,
//     getOrders,
// }
