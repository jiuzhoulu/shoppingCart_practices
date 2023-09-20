const cartDB = require('./shoppingCartDB.js');
const allModels = cartDB.getModel();

module.exports.lookUpUser = async (user_id,password)=>{
    try{
        var docs = await allModels.User.findOne({userID:user_id,pwd:password});
        return docs;
    }catch(err){
        console.log("error on finding a user");
    }    

};

// module.exports.isUserAdmin = async (user_id)=>{
//     try{
//         var docs = await allModels.User.findOne({userID:user_id});
//         return docs.isAdmin;
//     }catch(err){
//         console.log("error finding a user");
//     } 

// };

module.exports.loginRestricted = async (req,res,next) =>{
    if(req.session.userid != undefined){
        next();
    }else{
        res.status(400).json({ message: 'no credential to access' });
    }
};

module.exports.adminRestricted = async (req,res,next) =>{
    if(req.session.userid != undefined &&
        req.session.userIsAdmin == 1){
        next();
    }else{
        res.status(400).json({ message: 'no credential to access, user needs to be admin' });
    }
};