const {ObjectId} = require('mongodb');
const connection = require('../db/connection');

// GET ALL PLAYERS
const getAllPlayers = async (req, res) => {
    db = await connection.getDb();
    try {
        data = db.db('card_games').collection("users").find();
        playersArray = await data.toArray();
        if (!playersArray.length) {
            throw new Error("No players found")
        }
        res.status(200).send(playersArray);
    } catch (e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Players']

};

// GET PLAYER BY ID
const getPlayerById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Player id is not valid.")
    }
    const playerId = new ObjectId(req.params.id);
    db = await connection.getDb();
    try {
        data = db.db("card_games").collection("users").find({_id: playerId});
        playerArray = await data.toArray();
        if (!playerArray.length) {
            throw new Error("No players found")
        }
        res.status(200).send(playerArray[0]);
    } catch (e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Players']
};

// ADD PLAYER
const addPlayer = async (req, res) => {
    const data = req.body;
    const player = {
        name: data.name
    };

    db = await connection.getDb();
    try {
        result = await db.db('card_games').collection('users').insertOne(player);
        if (!result.acknowledged) {
            throw new Error("Unable to create player")
        }
        console.log("player with id: " + result.insertedId + " created")
        res.status(201).json(result)
    }catch (e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Players']
}

// UPDATE PLAYER
const updatePlayer = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Player id is not valid.")
        return
    }
    const playerId = new ObjectId(req.params.id);
    const data = req.body;
    const player = {
        name: data.name
    };

    db = await connection.getDb();
    try {
        result = await db.db('card_games').collection('users').replaceOne({_id: playerId}, player);
        if (result.modifiedCount < 1) {
            throw new Error("Unable to modify player");
        }
        console.log(result.modifiedCount + " document[s] updated.");
        res.status(204).json(result)
    } catch(e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Players']
}

// DELETE PLAYER
const deletePlayer = async  (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Player id is not valid.");
        return
    }
    const playerId = new ObjectId(req.params.id);
    db = await connection.getDb();
    try {
        result = await db.db('card_games').collection('users').deleteOne({_id: playerId})
        if (result.deletedCount < 1) {
            throw new Error("Unable to delete player.")
        }
        console.log(result.deletedCount + " document[s] deleted")
        res.status(200).send()
    } catch(e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Players']
}

module.exports = {
    getAllPlayers,
    getPlayerById,
    addPlayer,
    updatePlayer,
    deletePlayer
}