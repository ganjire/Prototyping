// Imports
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
const cors = require('cors')
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./config');

// Set up App
const app = express();
app.use(cors()); // Allow all cross-origing requests. More information: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(express.static('public')); // Host all static files in the folder /public
app.use(bodyParser.json()); // Support json encoded bodies
const port = process.env.PORT || '3001'; // Use the PORT variable if set (e.g., when deploying to Heroku)
app.set('port', port);

const server = http.createServer(app);


// Create the client and connect to the database
let database;
const client = new MongoClient(config.mongodb_connection_string);
client.connect((error, db) => {
    if (error || !db) {
        console.log("Could not connect to MongoDB:")
        console.log(error.message);
    }
    else {
        database = db.db('UniDB');
        console.log("Successfully connected to MongoDB.");
    }
})

//##################################################################################################
// ENDPOINTS 
//##################################################################################################

//--------------------------------------------------------------------------------------------------
// Welcome message
//--------------------------------------------------------------------------------------------------
app.get('/api', async (req, res) => {
    res.send("Welcome to the Uni Database API");
})


//--------------------------------------------------------------------------------------------------
// TODO: Implement your endpoints
//--------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------
// Get all students
//----------------------------------------------------------------------------
app.get('/api/students', async (req, res) => {
    try {
        const collection = database.collection('students');

        // You can specify a query/filter here
        // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
        const query = {};

        // Get all objects that match the query
        const result = await collection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//----------------------------------------------------------------------------
// Get an student by their id
//----------------------------------------------------------------------------
app.get('/api/students/:id', async (req, res) => {
    // read the path parameter :id
    let id = req.params.id;
    try {
        const collection = database.collection('students');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.findOne(query);
        if (!result) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//----------------------------------------------------------------------------
// Create a new student
//----------------------------------------------------------------------------
app.post('/api/students', async (req, res) => {
    try {
        const collection = database.collection('students');
        
        var student = {
            id: req.body.id,
            name: req.body.name,
            student_id: req.body.student_id,
            birthday: req.body.birthday
        };
        const result = await collection.insertOne(student);
        res.status(201).send({ _id: result.insertedId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//----------------------------------------------------------------------------
// Update an existing student
//----------------------------------------------------------------------------
app.put('/api/students/:id', async (req, res) => {
    // read the path parameter :id
    let id = req.params.id;
    let student = req.body;
    delete student._id; // delete the _id from the object, because the _id cannot be updated
    try {
        const collection = database.collection('students');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.updateOne(query, { $set: student });
        if (result.matchedCount === 0) {
            let responseBody = {
                status: "No student with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            res.send({ status: "Student with id " + id + " has been updated." });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//----------------------------------------------------------------------------
// Delete an existing student
//----------------------------------------------------------------------------
app.delete('/api/students/:id', async (req, res) => {
    // read the path parameter :id
    let id = req.params.id;
    try {
        const collection = database.collection('students');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.deleteOne(query);
        if (result.deletedCount === 0) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            let responseBody = {
                status: "Object with id " + id + " has been successfully deleted."
            }
            res.send(responseBody);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Get all courses
//--------------------------------------------------------------------------------------------------
app.get('/api/courses', async (req, res) => {
    try {
        const collection = database.collection('courses');

        // You can specify a query/filter here
        // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
        const query = {};
        // Example: Filter for a label, e.g. http://localhost:3001/api/albums?label=Columbia
        if (req.query.professor) {
            query.professor = req.query.professor;
        }

        // Get all objects that match the query
        const result = await collection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Get a course by its id
//--------------------------------------------------------------------------------------------------
app.get('/api/courses/:id', async (req, res) => {

    // read the path parameter :id
    let id = req.params.id;

    try {
        const collection = database.collection('courses');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.findOne(query);

        if (!result) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Update a course
//--------------------------------------------------------------------------------------------------
app.put('/api/courses/:id', async (req, res) => {

    // read the path parameter :id
    let id = req.params.id;
    let course = req.body;
    delete course._id; // delete the _id from the object, because the _id cannot be updated

    try {
        const collection = database.collection('courses');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.updateOne(query, { $set: course });

        if (result.matchedCount === 0) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            res.send({ status: "Object with id " + id + " has been updated." });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Start the server
//--------------------------------------------------------------------------------------------------
server.listen(port, () => console.log("app listening on port " + port));
