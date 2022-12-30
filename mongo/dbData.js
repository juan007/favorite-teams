// Mongo shell commands here to seed MongoDB database

// Mongo shell commands here to seed MongoDB database

// drop collection if already exists
db.myteams.drop();
// insert new documents into collection
db.myteams.insert([
    {
        "code": "CA-NS-002",
        "name": "HALIFAX WANDERERS ",
        "games": [
        {
        "gameCode": "2022-12-29-22-37-41-621",
        "date": "2022-12-23T15:10",
        "goalsFavor": 3,
        "goalsAgainst": 4,
        "rivalCode": "CA-ON-001",
        "local": true
        },
        {
        "gameCode": "2021-12-29-22-37-41-621",
        "date": "2023-01-20T12:05:45",
        "goalsFavor": 1,
        "goalsAgainst": 2,
        "rivalCode": "CA-NS-001",
        "local": false
        },
        {
        "gameCode": "2021-12-29-22-37-41-621",
        "date": "2022-12-20T12:05:45",
        "goalsFavor": null,
        "goalsAgainst": null,
        "rivalCode": "CA-ON-001",
        "local": true
        }
        ]
        },
    {
        "code": "CA-ON-001",
        "name": "TORONTO BLUE JAYS",
        "games": [
        {
        "gameCode": "2022-12-29-22-37-41-621",
        "date": "2022-12-31T23:42",
        "goalsFavor": null,
        "goalsAgainst": null,
        "rivalCode": "CA-NS-002",
        "local": false
        },
        {
        "gameCode": "2022-12-29-22-36-39-781",
        "date": "2022-12-30T18:36",
        "goalsFavor": null,
        "goalsAgainst": null,
        "rivalCode": "CA-NS-002",
        "local": true
        },
        {
        "gameCode": "2022-12-29-22-35-21-259",
        "date": "2022-12-29T18:40",
        "goalsFavor": null,
        "goalsAgainst": null,
        "rivalCode": "CA-NS-002",
        "local": false
        }
        ]
    }
]);

db.teams.drop();

db.teams.insert([
    {"code": "CA-NS-001","name": "TRURO BEARS","image":"CA-NS-001.jpg"},
    {"code": "CA-NS-002","name": "HALIFAX WANDERERS","image":"CA-NS-002.jpg"},
    {"code": "CA-ON-001","name": "TORONTO BLUE JAYS","image":"CA-ON-001.jpg"},
    {"code": "CA-BC-001","name": "VANCOUVER TIGERS ","image":"CA-BC-001.jpg"},
    
    

]);
