const cartDB = require("../shoppingCartDB.js");
const allModels = cartDB.getModel();

module.exports = async (req , res , next) => {

    //pid,chosedQuantity,pname
    var pid = req.body.pid;
    var chosedQuantity = req.body.chosedQuantity;
    var pname = req.body.pname;
    var cart = req.session.cart

    for(let i =0; i < cart.length;i++){
        if(cart[i].pid == pid){
            
            var docs = await allModels.Product.findOne({_id:pid});
            //console.log(docs.stockQuantity);
            //console.log(chosedQuantity);
            if(docs.stockQuantity >= chosedQuantity){
                cart[i].cq = chosedQuantity;
                res.redirect('/cart'); 
                break;
            }else{
                res.redirect('/cart/edit/'+pid);
            }
                     
        }
    }

    // res.format({
    //     'application/json': ()=>{
    //         res.json({'success':"edit success"});
    //     },

    //     'application/xml':()=>{
    //         let ZipXml = 
    //         '<?xml version="1.0"?>\n'
    //             +'<success>\n'
    //             +"Edit success"		
    //         + '</success>';

    //         res.type('application/xml');
	// 		res.send(ZipXml);
    //     },
    // });
      
};