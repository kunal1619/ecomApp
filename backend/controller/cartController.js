const {Cart} = require('../model/Cart');

const addItemToCart = async(req, res)=>{

    const cartData = new Cart(req.body);

    try{
        const doc = await cartData.save();
        return res.status(201).json(doc);

    }catch(error){
        res.status(400).json(error);
    }
}


const fetchCart = async(req, res)=>{
    const userid = req.params.userid;

    try{
        const cartData = await Cart.find({user_id : userid});
        return res.status(200).json(cartData);
    }catch(error){
        res.status(400)
        console.log('error while fetching cart items', error);
    }
}


const updateQuantity = async(req, res)=>{
    const newQuantity = req.body.quantity;
    const productId = req.body.productId;
    try{
        const cartData = await Cart.findOneAndUpdate(
            {_id : productId},
            {$set : {quantity : newQuantity}},
            { new: true } // This option returns the updated document
        );

        if (!cartData) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        return res.status(200).json(cartData);
    }catch(error){
        res.status(400)
        console.log('error while fetching cart items', error);
    }
}
const removeProduct = async(req, res)=>{
    const removeStatus = req.body.deleted;
    const productId = req.body.productId;

    try{
        const cartData = await Cart.findOneAndUpdate(
            {_id : productId},
            {$set : {deleted : removeStatus}},
            { new: true } // This option returns the updated document
        );

        if (!cartData) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        return res.status(200).json(cartData);
    }catch(error){
        res.status(400)
        console.log('error while removing cart items', error);
    }
}

module.exports = {addItemToCart, fetchCart, updateQuantity, removeProduct};