const cartDB = require("../shoppingCartDB.js");
const allModels = cartDB.getModel();

module.exports = async (req , res , next) => {

    let products = await allModels.Product.find({});
    
    res.format({

        'application/json': ()=>{
            res.json(products);
        },

        'application/xml':()=>{

            let ZipXml = 
            '<?xml version="1.0"?>\n<products>';
            for(let i = 0; i < products.length;i++){
                ZipXml +=
                +''+ '<product id="'+products[i]._id +'"' + '>\n'	
                    + '	 <productName>' + products[i].pName+'</productName>\n'
                    + '	 <Description>' + products[i].description+'</Description>\n'	
                    + '	 <price>' + products[i].price+'</price>\n'	
                    + '	 <inStockQuantity>' + products[i].stockQuantity+'</inStockQuantity>\n'		
                + ' </product>';
            }

            ZipXml += '</products>';
                

            res.type('application/xml');
			res.send(ZipXml);
        },

        'text/html':()=>{
            let results = products.map( product => {
                return {
                    pid: product._id,
                    pname: product.pName,
                    desc: product.description,
                    price:product.price,
                    quantity:product.stockQuantity
                }
            });
                
            res.render('showProductsView',
                    {data:results});
        },
    });

    
    
};