const {ObjectId} = require('mongodb');
const connection = require('../db/connection');

// GET ALL GAMES
const getAllGames = async (req, res) => {
    db = await connection.getDb();
    try {
        data = db.db('card_games').collection("phase_10").find();
        gamesArray = await data.toArray();
        if (!gamesArray.length) {
            throw new Error("No games found")
        }
        res.status(200).send(gamesArray);
    } catch (e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Phase 10']

};

// GET GAME BY ID
const getGameById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Game id is not valid.")
    }
    const gameId = new ObjectId(req.params.id);
    db = await connection.getDb();
    try {
        data = db.db("card_games").collection("phase_10").find({_id: gameId});
        gameArray = await data.toArray();
        if (!gameArray.length) {
            throw new Error("No games found")
        }
        res.status(200).send(gameArray[0]);
    } catch (e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Phase 10']
};

// ADD NEW GAME
const addGame = async (req, res) => {
    const data = req.body;
    const game = {
        date: data.date,
        phases: data.phases,
        scores: data.scores
    };

    db = await connection.getDb();
    try {
        result = await db.db('card_games').collection('phase_10').insertOne(game);
        if (!result.acknowledged) {
            throw new Error("Unable to create game")
        }
        console.log("game with id: " + result.insertedId + " created")
        res.status(201).json(result)
    }catch (e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Phase 10']
}

// UPDATE GAME BY ID
const updateGame = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Game id is not valid.")
        return
    }
    const gameId = new ObjectId(req.params.id);
    const data = req.body;
    const game = {
        date: data.date,
        phases: data.phases,
        scores: data.scores
    };

    db = await connection.getDb();
    try {
        result = await db.db('card_games').collection('phase_10').replaceOne({_id: gameId}, game);
        if (result.modifiedCount < 1) {
            throw new Error("Unable to modify game");
        }
        console.log(result.modifiedCount + " document[s] updated.");
        res.status(204).json(result)
    } catch(e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Phase 10']
}

// DELETE GAME
const deleteGame = async  (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Game id is not valid.");
        return
    }
    const gameId = new ObjectId(req.params.id);
    db = await connection.getDb();
    try {
        result = await db.db('card_games').collection('phase_10').deleteOne({_id: gameId})
        if (result.deletedCount < 1) {
            throw new Error("Unable to delete game.")
        }
        console.log(result.deletedCount + " document[s] deleted")
        res.status(200).send()
    } catch(e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Phase 10']
}

// GET GAME BY PLAYER ID
const getGamesByPlayer = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Player id is not valid.")
    }
    const playerId = req.params.id;
    db = await connection.getDb();
    try {
        data = db.db("card_games").collection("phase_10").find({"scores.playerId": playerId});
        gameArray = await data.toArray();
        if (!gameArray.length) {
            throw new Error("No games found")
        }
        res.status(200).send(gameArray);
    } catch (e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Phase 10']
};

module.exports = {
    getAllGames,
    getGameById,
    addGame,
    updateGame,
    deleteGame,
    getGamesByPlayer
}