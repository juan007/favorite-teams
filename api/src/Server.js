let express = require("express");
let cors = require('cors');
let path = require('path');
let MongoClient = require("mongodb").MongoClient;
let sanitizer = require('express-sanitizer');
let ObjectId = require('mongodb').ObjectId;

// MongoDB constants
const URL = "mongodb://mongo:27017/";
const DB_NAME = "dbTeams";

// construct application object via express
let app = express();
// add cors as middleware to handle CORs errors while developing
app.use(cors());

// middleware to read incoming JSON with request
app.use(express.json());
// middleware to sanitize all incoming JSON data
app.use(sanitizer());

// get absolute path to /build folder (production build of react web app)
const CLIENT_BUILD_PATH = path.join(__dirname, "./../../client/build");
// adding middleware to define static files location
app.use("/", express.static(CLIENT_BUILD_PATH));

app.get("/get", async (request, response) => {    
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();
        // get reference to database via name
        let db = mongoClient.db(DB_NAME);
        //let myTeamsArray = await db.collection("myteams").find({ "code":'CA-ON-001',"games.gameCode": '2022-12-29-22-37-41-621' }).sort("name",1).toArray();
        let myTeamsArray = await db.collection("myteams").find().sort("name",1).toArray();
        let teamsArray = await db.collection("teams").find().sort("name",1).toArray();
        let json = { "myteams": myTeamsArray, "teams":teamsArray };
        
        // set RESTFul status codes
        response.status(200);

        // serializes sampleJSON to string format
        response.send(json);
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});

app.put("/put", async (request, response) => {
    
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();

        //sanitize incoming
        request.body.teamCode= request.sanitize(request.body.teamCode);
        request.body.date= request.sanitize(request.body.date);
        request.body.pointsFavor = request.sanitize(request.body.pointsFavor);
        request.body.pointsAgainst = request.sanitize(request.body.pointsAgainst);
        request.body.rivalCode = request.sanitize(request.body.rivalCode);
        request.body.local = request.sanitize(request.body.local);
        
        //generte game code
        let today = new Date();
        let date = today.getFullYear() +'-'+ (today.getMonth()+1) + '-' +  today.getDate();
        let time = '-' + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds() + '-' + today.getMilliseconds();
        let gameCode = date + time;
        
        let myTeamsCollection = mongoClient.db(DB_NAME).collection("myteams");
        let selector = {"code":request.body.teamCode};
        let result = await myTeamsCollection.updateOne(selector, 
        { "$push": 
            {"games": 
                {
                    $each:[{
                    "gameCode": gameCode,
                    "date": request.body.date,
                    "goalsFavor": parseInt(request.body.pointsFavor),
                    "goalsAgainst": parseInt(request.body.pointsAgainst),
                    "rivalCode": request.body.rivalCode,
                    "local": Boolean(request.body.local)}],
                    $position:0

                }
            }
        });
        
        
        //catching error of incorrect code or code of team  that dosent exist
        if(result.matchedCount<=0) {
            response.status(404);
            response.send({error: "No game documents found with CODE"});
            mongoClient.close();
            return;
        }


        //status codes
        response.status(200);
        response.send(result);

    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
        //console.log(`>>> ERROR : ${error.message}`);
    } finally {
        mongoClient.close();
    }
});


app.put("/updateGame", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect();
        
        let teamCode = request.sanitize(request.body.teamCode);
        let gameCode = request.sanitize(request.body.gameCode);
        let goalsFavor = request.sanitize(request.body.goalsFavor);
        let goalsAgainst = request.sanitize(request.body.goalsAgainst);
        
        let myTeamsCollection = mongoClient.db(DB_NAME).collection("myteams");
        
        //we select the game that corresponds to the game code on the team correspondiong to the team code
        //on the myteams collection
        let selector = { "code":teamCode,"games.gameCode": gameCode };

        //The new values of the score
        let newValues = { 
            $set: {
                'games.$.goalsFavor': parseInt(goalsFavor),
                'games.$.goalsAgainst': parseInt(goalsAgainst)
            }
        };

        //execute the operation applied to the filter specified by the selector with the new values
        let result = await myTeamsCollection.updateOne(
            selector,
            newValues
          );

        if (result.matchedCount <= 0) {
            response.status(404);
            response.send({error: 'No games found with specified code TeamCode:' + teamCode + ' GameCode:' + gameCode});
            return;
        }
        response.status(200);
        response.send(result);
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});

//Delete game
app.delete("/deleteGame", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect();
        
        let teamCode = request.sanitize(request.body.teamCode);
        let gameCode = request.sanitize(request.body.gameCode);
        
        let myTeamsCollection = mongoClient.db(DB_NAME).collection("myteams");
        
        //we select the game that corresponds to the game code on the team correspondiong to the team code
        //on the myteams collection
        let selector = { "code":teamCode,"games.gameCode": gameCode };

        //the operation is to pop the corresponding game
        let operation = {$pull : {"games" : {"gameCode":gameCode}}};

        //execute the operation applied to the filter specified by the selector
        let result = await myTeamsCollection.updateMany(
            selector,
            operation
          );

        if (result.modifiedCount <= 0) {
            response.status(404);
            response.send({error: 'No games found with specified code'});
            return;
        }
        response.status(200);
        response.send(result);
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});


// wildcard to handle all other non-api URL routings (/selected, /all, /random, /search)
app.use("/*", express.static(CLIENT_BUILD_PATH));

// startup the Express server - listening on port 80
app.listen(80, () => console.log("Listening on port 80"));