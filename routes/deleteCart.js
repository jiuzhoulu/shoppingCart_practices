module.exports = async (req , res , next) => {
    //"/cart/delete/{{this.pid}}
    let productId = req.params.pid;
    let cart = req.session.cart;
    for(let i = 0; i <req.session.cart.length; i++){
        if(cart[i].pid == productId){
            req.session.cart.splice(i,1);
            res.redirect('/cart');
        }
    }  
    
    // res.format({
    //     'application/json': ()=>{
    //         res.json({'success':"Delete success"});
    //     },

    //     'application/xml':()=>{
    //         let ZipXml = 
    //         '<?xml version="1.0"?>\n'
    //             +'<success>\n'
    //             +"Delete success"		
    //         + '</success>';

    //         res.type('application/xml');
	// 		res.send(ZipXml);
    //     },
    // });
};