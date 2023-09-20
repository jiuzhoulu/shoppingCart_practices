module.exports = async (req , res , next) => {
    var cart = req.session.cart
    

    res.format({

        'application/json': ()=>{
            res.json(cart);
        },

        'application/xml':()=>{

            let ZipXml = 
            '<?xml version="1.0"?>\n';
            for(let i = 0; i < cart.length;i++){
                ZipXml +=
                +'<product>\n'
                    + '	<productId>' + cart[i].pid+'</productId>\n'	
                    + '	<productName>' + cart[i].pname+'</productName>\n'
                    + '	<choseQuantity>' + cart[i].cq+'</choseQuantity>\n'		
                + '</product>';
            }
                

            res.type('application/xml');
			res.send(ZipXml);
        },

        'text/html':()=>{
            let results = cart.map( c => {
                return {
                    pid:c.pid,
                    pname: c.pname,
                    cQuantity:c.cq
                }
            });
                
            res.render('showCartView',
                    {data:results});
        },
    });
    
};