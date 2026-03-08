const express = require('express');
const router = express.Router();
const Items = require('../database/Schemas/ItemsSchema');
const { veryfingJWTToken } = require('../Auth/JwtFunctions');
const { generalMiddleware } = require('../middleware/middleware');


const {storage} = require('../cloudinary/cloudinary');
const multer = require('multer');
const upload = multer({storage});


//getting all items 
router.get('/', async (req, res) => {
    try {
        const { gender, category } = req.query;
        console.log(gender, category);
        if (gender && category) {
            const AllItems = await Items.find({ gender, category });
            res.status(200).json(AllItems);
        }
        else if (!gender && category) {
            const AllItems = await Items.find({ category });
            res.status(200).json(AllItems);
        }
        else if (gender && !category) {
            const AllItems = await Items.find({ gender });
            res.status(200).json(AllItems);
        }
        else {
            const AllItems = await Items.find({});
            res.status(200).json(AllItems);
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

// getting items with specific id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const Item = await Items.findById(id);
    res.status(200).json(Item);
})

// getting  all items of a seller
router.get('/:selId/items', async (req, res) => {
    const { selId } = req.params;
    const sellerItems = await Items.find({ seller: selId });
    res.status(200).json(sellerItems);
})



//crating new items with a seller id
//only seller must be able to do this

// router.post('/createItem', async (req, res) => {
//   console.log('route was hit')
//   res.send("working")
// })

router.post('/createItem',veryfingJWTToken, generalMiddleware(['Seller']),
upload.array('images',5), async (req, res) => {
    const data = req.body;
    //console.log('route was hit')
    // console.log(data);
    // console.log(req.files);
    const { ItemName, description, price, gender, category } = req.body;
    const sizes = [];
    for (let size in data) {
        if (size === 'small') {
            const newObject = {
                'size': 'S',
                'stock': data[size]
            }
            sizes.push(newObject)
        }
        else if (size === 'medium') {
            const newObject = {
                'size': 'M',
                'stock': data[size]
            }
            sizes.push(newObject)
        }
        else if (size === 'large') {
            const newObject = {
                'size': 'L',
                'stock': data[size]
            }
            sizes.push(newObject)
        }
        else if (size === 'xLarge') {
            const newObject = {
                'size': 'XL',
                'stock': data[size]
            }
            sizes.push(newObject)
        }
        else if (size === 'XXLarge') {
            const newObject = {
                'size': 'XXL',
                'stock': data[size]
            }
            sizes.push(newObject)
        }

    }

    const images = req.files.map((img)=>img.path);
    console.log(data,sizes,images);
    const seller  = req.user.id
    try {
        const adddedItem = await new Items({ ItemName, description, price, images, gender, category, sizes,seller }).save();

        console.log(adddedItem);
        res.status(200).json(adddedItem);
    } catch (error) {
        res.status(500).json(error)
    }
})

//route to delete a perticular item 
// seller and admin should have auth
const delete_UpdateItemMiddleWare =async (req, res, next) => {
    const { itemId } = req.params;
    const user = req.user
    if (user.role === "Admin") {
      return  next();
    }
    const item = await Items.findById(itemId);
    if (user.role === 'Seller' && user.id === item.seller.toString()) {
     return   next();
    }

    return res.status(403).json({
        message: "You are not authorized to view these orders"
    });
}
router.delete('/:itemId/delete',veryfingJWTToken,delete_UpdateItemMiddleWare, async (req, res) => {
    const { itemId } = req.params;
    try {
        const deletedItem = await Items.findByIdAndDelete(itemId);
        console.log(deletedItem);
        res.status(200).json(deletedItem)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

})


// update a given item;
// seller should have auth
router.patch('/:itemId/update', veryfingJWTToken,delete_UpdateItemMiddleWare,async (req, res) => {
    console.log('patch route was hit ')
    const { itemId } = req.params;
    const data = req.body;
    const { itemName, description, price, imageUrl, gender, category } = req.body;
    const sizes = [];
    for (let size in data) {
        if (size === 'small') {
            const newObject = {
                'size': 'S',
                'stock': data[size]
            }
            sizes.push(newObject)
        }
        else if (size === 'medium') {
            const newObject = {
                'size': 'M',
                'stock': data[size]
            }
            sizes.push(newObject)
        }
        else if (size === 'large') {
            const newObject = {
                'size': 'L',
                'stock': data[size]
            }
            sizes.push(newObject)
        }
        else if (size === 'xLarge') {
            const newObject = {
                'size': 'XL',
                'stock': data[size]
            }
            sizes.push(newObject)
        }
        else if (size === 'XXLarge') {
            const newObject = {
                'size': 'XXL',
                'stock': data[size]
            }
            sizes.push(newObject)
        }

    }
    try {
        const updateitem = await Items.findByIdAndUpdate(itemId, { itemName, description, price, imageUrl, gender, category, sizes }, { new: true })
        console.log(updateitem);
        res.status(200).json(updateitem);
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router