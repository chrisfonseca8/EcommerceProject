const express = require('express');
const router = express.Router();
const Orders = require('../database/Schemas/OrderSchema')
const Items = require('../database/Schemas/ItemsSchema');
const { veryfingJWTToken } = require('../Auth/JwtFunctions');
const { generalMiddleware } = require('../middleware/middleware');

// getting all orders placed
router.get('/', veryfingJWTToken, generalMiddleware(['Admin']), async (req, res) => {
    const AllOrders = await Orders.find({})
    res.status(200).json(AllOrders);
})


// getting a perticular order 
router.get('/:id', veryfingJWTToken, generalMiddleware(['Admin']), async (req, res) => {
    const { id } = req.params;
    const order = await Orders.findById(id);
    res.status(200).json(order);
})

// creating a route to see all orders of a customers
const verifyCustomerAccess = (req, res, next) => {

    const { CusId } = req.params;
    const user = req.user;

    // Admin can access any order
    if (user.role === "Admin") {
        return next();
    }

    // Customer can access only their own orders
    if (user.role === "Customer" && user.id === CusId) {
        return next();
    }

    return res.status(403).json({
        message: "You are not authorized to view these orders"
    });
};



router.get("/:CusId/Cusorders",
        veryfingJWTToken,
    verifyCustomerAccess,
    async (req, res) => {

    const { CusId } = req.params;

    const orders = await Orders.find({ customer: CusId })
        .populate("order.product")
        .populate("order.seller");

    res.status(200).json(orders);
});

//3. route to see all oders of a seller - seller and admin,
const verifySellerAccess = (req, res, next) => {
    const {sellerId} = req.params;
    const user = req.user

    if (user.role === 'Admin') {
        next();
    }

    if (user.role === 'Seller'&&user.id===sellerId) {
        return next();
    }

     return res.status(403).json({
        message: "You are not authorized to view these orders"
            });
}


router.get('/:sellerId/Selorders',
    veryfingJWTToken,
    verifySellerAccess,
    async (req, res) => {
        const { sellerId } = req.params;

        try {

            const orders = await Orders.find({ "order.seller": sellerId });

            const filteredOrders = orders.map(order => {
                const sellerProducts = order.order.filter(
                    item => item.seller.toString() === sellerId
                );

                return {
                    _id: order._id,
                    address: order.address,
                    customer: order.customer,
                    orderStatus: order.orderStatus,
                    paymentStatus: order.paymentStatus,
                    order: sellerProducts
                };
            });

            res.status(200).json(filteredOrders);

        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    });

// POST /checkout - customer places an order from their cart
router.post('/checkout', veryfingJWTToken, generalMiddleware(['Customer']), async (req, res) => {
    try {
        const { cartItems, address } = req.body;
        const customerId = req.user.id;

        const orderItems = await Promise.all(
            cartItems.map(async (item) => {
                const product = await Items.findById(item.productId);
                return {
                    product: item.productId,
                    qunatity: item.quantity,
                    priceAtPurchase: item.price,
                    seller: product ? product.seller : null
                };
            })
        );

        const newOrder = new Orders({
            customer: customerId,
            address: [address],
            order: orderItems,
            orderStatus: 'placed',
            paymentStatus: 'pending'
        });

        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

/*


4. updating order status includes playment and orderstatus - seller and admin 
5. updating address of an order can be done - customer 
6.some info about the order - all
*/

module.exports = router