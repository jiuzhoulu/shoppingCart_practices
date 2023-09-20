//userID: 'joe123',
// pwd:'abc123',
// isAdmin:1,
// orders:[]

const cartDB = require("../shoppingCartDB.js");
const allModels = cartDB.getModel();

module.exports = async (req , res , next) => {

    let users = await allModels.User.find({});
    console.log(users);
    res.format({

        'application/json': ()=>{
            res.json(users);
        },

        'application/xml':()=>{

            let ZipXml = 
            '<?xml version="1.0"?>\n<users>';
            for(let i = 0; i < users.length;i++){
                ZipXml +=
                +''+ '<user id="'+users[i]._id +'"' + '>\n'	
                    + '	 <userID>' + users[i].userID+'</userID>\n'
                    + '	 <password>' + users[i].pwd+'</password>\n'	
                    + '	 <isAdmin>' + users[i].isAdmin+'</isAdmin>\n'	
                    + '	 <orders>' + users[i].orders+'</orders>\n'		
                + ' </user>';
            }

            ZipXml += '</users>';
                

            res.type('application/xml');
			res.send(ZipXml);
        },

        'text/html':()=>{
            let results = users.map( user => {
                return {
                    userid: user.userID,
                    pwd: user.pwd,
                    isadmin: user.isAdmin,
                    orders:user.orders,
                    
                }
            });
                
            res.render('adminView',
                    {data:results});
        },
    });

    
    
};