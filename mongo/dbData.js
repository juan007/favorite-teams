// Mongo shell commands here to seed MongoDB database

// Mongo shell commands here to seed MongoDB database

// drop collection if already exists
db.myteams.drop();
// insert new documents into collection
db.myteams.insert([
    {
        "code": "CA-NS-001",
        "name": "TRURO BEARS",
        "games": [
            {
                "date": "2022-11-20T12:05:45",
                "goalsFavor": 3,
                "goalsAgainst": 4,
                "rivalCode":"CA-NS-002",
                "local": true
            },
            {
                "date": "2022-12-20T12:05:45",
                "goalsFavor": null,
                "goalsAgainst": null,
                "rivalCode":"CA-ON-001",
                "local": true
            },
        ]
    },
    {
        "code": "CA-NS-002",
        "name": "HALIFAX WANDERERS ",
        "games": [
            {
                "date": "2023-01-20T12:05:45",
                "goalsFavor": 1,
                "goalsAgainst": 2,
                "rivalCode":"CA-NS-001",
                "local": false
            },
            {
                "date": "2022-12-20T12:05:45",
                "goalsFavor": null,
                "goalsAgainst": null,
                "rivalCode":"CA-ON-001",
                "local": true
            },
        ]
    },
    {
        "code": "CA-ON-001",
        "name": "TORONTO BLUE JAYS",
        "games": [
            {
                "date": "2022-02-20T12:05:45",
                "goalsFavor": 3,
                "goalsAgainst": 3,
                "rivalCode":"CA-BC-001",
                "local": true
            },
            {
                "date": "2022-02-23T16:05:45",
                "goalsFavor": null,
                "goalsAgainst": null,
                "rivalCode":"CA-NS-001",
                "local": false
            },
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
