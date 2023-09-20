# Shopping Cart REST API application

## initialize databse

```bash
node .\initDB.js
```
## start the application

```bash
node .\server.js
```

## endpint responses that support xml and json format

1.	GET /shop
2.	GET	/cart
3.	GET	/shop/add/:id/:pname/:quantity
4.	GET	/shop/search/:text
5.	GET	/admin/users


## other that does not finish to support xml and json format

1. GET /home, GET /logout, GET /admin
2. POST /login, POST /shop/save
3. GET /cart/edit/:pid
4. POST /cart/edit
5. GET /cart/delete/:pid


## restriction 
Some endpoints are not allowed based on:
1. Whether the user has logedin.
2. Whether the user is an administrator.
3. Check file userAuth.js, Index.js 

## Data persistence
- Deployed MongoDB on cloud
- check credentials.js


## unfinished
- Users' action about orders