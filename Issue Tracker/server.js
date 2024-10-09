var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var crypto = require("crypto")   //This is for password encryption in built package in node

//Connect with Mongodb database on your local host

const { MongoClient, ObjectId, ServerApiVersion, Collection } = require('mongodb');
const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


var app = express();

app.get('/', function (req, res) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
    return res.redirect('/public/index.html');

}).listen(4000);
app.get('/', function (req, res) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
    return res.redirect('/public/signup.html');

}).listen(5000);


app.get('/', function (req, res) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
    return res.redirect('/public/admin_portal.html');

}).listen(6000);

console.log("Server is listening at 4000")
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//Password hashing it will hash the password with the Roll No 
//We are using sha512 Algorithm
var getHash = (pass, rollno) => {
    var hmac = crypto.createHmac('sha512', rollno);
    data = hmac.update(pass);
    generate_hmac = data.digest('hex');
    console.log("Encrypted password" + generate_hmac);
    return generate_hmac;
}

//SignUp Function
app.post('/signup', async (req, res) => {
    var name = req.body.fullName;
    var email = req.body.email
    var branch = req.body.queryType;
    var rollno = req.body.rollno;
    var pass = req.body.password;

    //Password after hashing
    var password = getHash(pass, rollno);

    var data = {
        "Name": name,
        "Email": email,
        "Branch": branch,
        "Password": password,
        "Rollno": rollno
    }
    console.log(name);
    console.log(branch);
    console.log(email);
    console.log(rollno);
    console.log(pass);
    console.log(password);

    console.log("DATA is " + JSON.stringify(data));


    //This is the function which checks whether you are connected with database or not.
    //It connect with the cliend and takes the database and collection in which u want to store your data
    try {
        // Connect the client to the server
        await client.connect();

        // Specify the database and collection
        const database = client.db('IIT-Gandhinagar');
        const collection = database.collection('signup');

        // Insert the data into the collection
        const result = await collection.insertOne(data);
        console.log(`New document inserted with the following id: ${result.insertedId}`);

        // Close the connection to the database
        await client.close();

        res.set({
            'Access-Control-Allow-Origin': '*'
        });
        return res.redirect('/public/login.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error connecting to the database or inserting data.");
    }
});

// Login Function
app.post('/login', async (req, res) => {
    var rollno = req.body.rollno;
    var pass = req.body.password;
    var usertype=req.body.userType;
    var data = {
        "UserType": usertype,
    }

    // Password after hashing
    var password = getHash(pass, rollno);

    try {
        // Connect the client to the server
        await client.connect();

        // Specify the database and collection
        const database = client.db('IIT-Gandhinagar');
        const collection = database.collection('signup');

        // Find the user with the given roll number
        const user = await collection.findOne({ Rollno: rollno });

        if (user) {
            if (user.Password === password) {
                // Authentication successful
                res.set({
                    'Access-Control-Allow-Origin': '*'
                });
                if(usertype=="User"){
                    return res.send("You have been successfully logged in");
                }
                else{
                    
                    return res.redirect('/public/admin_portal.html');

                }
            } else {
                // Incorrect password
                res.status(401).send("Incorrect password.");
            }
        } else {
            // User not found
            res.status(404).send("User not found.");
        }

        // Close the connection to the database
        await client.close();
    } catch (err) {
        console.error(err);
        res.status(500).send("Error connecting to the database or fetching data.");
    }
});

//Issue Tracker Queries taking data from the Index.html
app.post('/query', async (req, res) => {
    var name = req.body.fullName;
    var email = req.body.email
    var querytype = req.body.queryType;
    var branch = req.body.branchType;
    var query = req.body.issue;


    var data = {
        "Name": name,
        "Email": email,
        "Branch": branch,
        "QueryType": querytype,
        "Query": query,
        "resolvedStatus": "Not resolved",
        "resolvedBy": ""
    }
    console.log("DATA is " + JSON.stringify(data));


    try {
        // Connect the client to the server
        await client.connect();

        // Specify the database and collection
        const database = client.db('IIT-Gandhinagar');
        const collection = database.collection('Queries');

        // Insert the data into the collection
        const result = await collection.insertOne(data);
        console.log(`New document inserted with the following id: ${result.insertedId}`);

        // Close the connection to the database
        await client.close();

        res.set({
            'Access-Control-Allow-Origin': '*'
        });
        return res.redirect('/public/success.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error connecting to the database or inserting data.");
    }
});


//Admin portal data fetching
//we have a new collection in our database with name Queries and from which we are fetching the data for our admin portal

app.get('/admin_data', async (req, res) => {
    try {
        await client.connect();

        const database = client.db('IIT-Gandhinagar');
        const collection = database.collection('Queries');

        // Fetch all documents from the collection
        const data = await collection.find().toArray();
        console.log(data); // Log the data for debugging

        // Send the data as JSON
        res.json(data);

        await client.close();
    } catch (err) {
        console.error(err);
        res.status(500).send("Error connecting to the database or fetching data.");
    }
});

// This updates the resolved status and changes the colour of action button to success color

app.post('/resolve_query', async (req, res) => {
    const { id, resolver } = req.body;
    const resolvedColor = 'success'; // Adjust color as needed

    try {
        await client.connect();
        const database = client.db('IIT-Gandhinagar');
        const collection = database.collection('Queries');
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { resolvedStatus: "Resolved", resolvedBy: resolver, resolvedColor: resolvedColor } }
        );
        await client.close();

        if (result.matchedCount > 0) {
            res.status(200).send({ message: "Query resolved successfully.", resolvedColor: resolvedColor });
        } else {
            res.status(404).send("Query not found.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating the query.");
    }
});

//Filter function
app.post('/filter-queries', async (req, res) => {
    const { type, branch } = req.body;
    let filter = {};

    if (type !== 'all') {
        filter.QueryType = type;
    }

    if (branch && branch !== 'all') {
        filter.Branch = branch;
    }

    try {
        await client.connect();
        const database = client.db('IIT-Gandhinagar');
        const collection = database.collection('Queries');

        const data = await collection.find(filter).toArray();
        console.log(data); // Log the data for debugging

        res.json(data);
        await client.close();
    } catch (err) {
        console.error(err);
        res.status(500).send("Error connecting to the database or fetching data.");
    }
});



