import mongoose from "mongoose"; 
// creating the product model schema
const productShcema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        reuired:true,

    },
    image:{
        type:String,
        required:true
        
    }
},{
    Timestamp:true //Createed at and updated at
}
);

const Product=mongoose.model('Product',productShcema);

export default Product;