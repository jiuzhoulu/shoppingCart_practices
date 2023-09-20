const cartDB = require('./shoppingCartDB.js');

const allModels = cartDB.getModel();

(async() => {

    
    await allModels.Product.deleteMany({});
    await allModels.Order.deleteMany({});
	await allModels.User.deleteMany({});

	let product1 = new allModels.Product({
		pName: 'Company of Heros 3',
        description: 'RTS game',
        price:60,
        stockQuantity:25
	}); 

    let product2 = new allModels.Product({
		pName: 'Sony PS5',
        description: 'game console',
        price:409,
        stockQuantity:30
	}); 
 

	let user1 = new allModels.User({
        userID: 'joe123',
        pwd:'abc123',
	    isAdmin:1,
        orders:[]
	}); 

    let user2 = new allModels.User({
        userID: 'tachanka234',
        pwd:'qwer321',
	    isAdmin:0,
        orders:[]
	}); 


	await Promise.all([
			product1.save(), 
			product2.save(), 
            user1.save(),
            user2.save()
		]);

    let currentProducts = await allModels.Product.find({});
    console.log(currentProducts);
	let currentcustomer = await allModels.User.find({});
	console.log(currentcustomer);

	process.exit();


})();


