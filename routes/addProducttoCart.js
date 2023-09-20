module.exports = async (req , res , next) => {
    //:id/:pname/:quantity
    ///shop/add/:id/:pname/:quantity
    res.format({

        'application/json': ()=>{
            res.json(req.params);
        },

        'application/xml':()=>{

            let ZipXml = 
            '<?xml version="1.0"?>\n'
                +'<product>\n'
                + '	<productId>' + req.params.id+'</productId>\n'	
                + '	<productName>' + req.params.pname+'</productName>\n'
                + '	<inStockQuantity>' + req.params.quantity+'</inStockQuantity>\n'		
            + '</product>';

            res.type('application/xml');
			res.send(ZipXml);
        },

        'text/html':()=>{
            res.render('addProductView',
            {data:{
                pname:req.params.pname,
                quantity:req.params.quantity,
                id:req.params.id
            }});
        },
    });
    
    
};