# Follow these steps for the backend:

1.Install Node.js if you have not installed yet - Follow official website instructions

2. Initilise the npm
   npm init
   (It will ask for author, name , etc)

2.Install modules like Express and Mongodb 
   npm install express --save
   npm install Mongodb --save

3. Create a server.js file in you project folder

# Working with server.js:

1. get all the necessary modules in server.js
var express =require("express")    

here var is used to define variables
require is used to get the specific modules

2.Initilise the express and Mongodb

3. Use app.get to access the html pages

4. function(req,res)  req : to request something      res: to response something

5. In order to work with password we are using crypto to hash our password
   in our case we are hashing with roll no, u can hash with any object you want

6. Now coming to signup page we can simply use var and req different objects that we have used in our Login /signup form

7. We can store the login details in our Mongodb Database by simply making a collection.

# Connect with database
1. Install mongodb compass as it provides the UI to visualise the data in the database
2. Connect to the local server in the compass;
3. Now create a new database  in my case I have created with name IIT-Gandhinagar
4. Create a new collection in that dataset  in my case it's Queries
5. Now use the server.js code. Upon successful run of code and filling the sign up entries you will be able to see the dataset in your mongodb compass.
6. The code in the server.js to connect with mongodb is as follow
7. It first connect with the mongodb after that connect to the client.
8. Now under that client, connect to the database and collection in which you want to store the data.
9. Now insert the data using InsertOne to add one data. If you have multiple such data you can simply use InsertMany.

# Authenticating from database for user login.
1. In login.html we input required credentials of user.
2. In server.js, we fetch the credentials as input on page.
3. We generate hash value to match with the password.
4. We connect to our database and find the query with input username or roll number.
5. If user is found, we match the hash values of input password and stored password to authenticate. If matched, redirect to success.html
6. If user not found, throw error.





  
