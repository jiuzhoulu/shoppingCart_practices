const cartDB = require("../shoppingCartDB.js");
const allModels = cartDB.getModel();

module.exports = async (req , res , next) => {

    //pid,chosedQuantity,pname
    var pid = req.body.pid;
    var chosedQuantity = req.body.chosedQuantity;
    var pname = req.body.pname;
    var product = {pid:pid,pname:pname,cq:chosedQuantity};
    req.session.cart.push(product);
    res.redirect('/shop');
    
};