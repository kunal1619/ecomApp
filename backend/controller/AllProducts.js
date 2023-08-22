const mongooseDB = require('../db/db');
const {Product} = require('../model/Product');

const allProducts = async (req, res)=>{
    // const sortby = req.params.sortby;
    // console.log(sortby)
    try{
          await mongooseDB();
          const allProducts = await Product.find({});
          return res.status(200).json(allProducts);
          
    }catch(error){
        console.log('Error while fetching products:', error);
        return res.status(500).json({error : 'Internal server error'})
    }
}


//category wise
const categoryWiseProducts = async (req, res)=>{

    try{
        if(req.params.categories){
            const data = req.params.categories.split('&');
            const categories = data[1].split('=').splice(1, 1)[0].split(',')
            const sorting = data[0].split('=').splice(1,1).join('')

            await mongooseDB();   
            const Products = await Product.find({ category: { $in: categories } }).sort({ price: +sorting}).exec();
            return res.json(Products);    
        }
      
    }catch(error){
        console.log('Error while fetching products:', error);
        res.status(500).json({error : 'Internal server error'})
    }
}


//selected single product
const selectedSingleProduct = async (req, res)=>{
    
    const id = req.params.id;
    try{
          await mongooseDB();
          const singleProduct = await Product.findOne({ _id : id });
          return res.status(200).json(singleProduct);
          
    }catch(error){
        console.log('Error while fetching products:', error);
        return res.status(500).json({error : 'Internal server error'})
    }
}

module.exports = {allProducts, categoryWiseProducts, selectedSingleProduct};
