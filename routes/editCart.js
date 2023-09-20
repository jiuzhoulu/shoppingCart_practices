const cartDB = require("../shoppingCartDB.js");
const allModels = cartDB.getModel();

module.exports = async (req , res , next) => {

    let productId = req.params.pid;
    let cart = req.session.cart;
    var docs = await allModels.Product.findOne({_id:productId});
    for(let i = 0; i <req.session.cart.length; i++){
        if(cart[i].pid == productId){
            res.render('editCartView',
                {data:{
                    pname:cart[i].pname,
                    quantity:cart[i].cq,
                    id:cart[i].pid,
                    maxq:docs.stockQuantity
                }
                });
            break;
        }
    }  
    
};