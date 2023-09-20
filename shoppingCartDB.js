const mongoose = require('mongoose');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

// mongoose.connect(dbUrl).then((ans) => {
//     console.log("DB connected successful");
// }).catch((err) =>{
//     console.log("Error in the Connection");
// });

const Schema = mongoose.Schema;

const productSchema = new Schema({
	pName: String,
    description: String,
    price:Number,
    stockQuantity:Number
});

const orderSchema = new Schema({
    orderedProducts: [
		{pid: Number, quantity: Number}
	]
});

const userSchema = new Schema({
	userID:String,
	pwd:String,
	isAdmin:Boolean,
    orders:[
        {oid:Number}
    ]
});

//creating collection
let connection = null;

let Product = null;
let Order = null;
let User = null;

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
            Product = connection.model('Product',productSchema);
            Order = connection.model('Order',orderSchema);
            User = connection.model('User',userSchema);
		};
		return {Product,Order,User};
	}
};