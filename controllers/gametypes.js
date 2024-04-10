const {ObjectId} = require('mongodb');
const connection = require('../db/connection');

// GET ALL GAME TYPES
const getAllTypes = async (req, res) => {
    db = await connection.getDb();
    try {
        data = db.db('card_games').collection("game_types").find();
        typesArray = await data.toArray();
        if (!typesArray.length) {
            throw new Error("No games found")
        }
        res.status(200).send(typesArray);
    } catch (e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Game Types']

};

// GET GAME TYPE BY ID
const getTypeById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Type id is not valid.")
    }
    const typeId = new ObjectId(req.params.id);
    db = await connection.getDb();
    try {
        data = db.db("card_games").collection("game_types").find({_id: typeId});
        typeArray = await data.toArray();
        if (!typeArray.length) {
            throw new Error("No type found")
        }
        res.status(200).send(typeArray[0]);
    } catch (e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Game Types']
};

// ADD GAME TYPE
const addType = async (req, res) => {
    const data = req.body;
    const type = {
        name: data.name,
        rules: data.rules
    };

    db = await connection.getDb();
    try {
        result = await db.db('card_games').collection('game_types').insertOne(type);
        if (!result.acknowledged) {
            throw new Error("Unable to create type")
        }
        console.log("type with id: " + result.insertedId + " created")
        res.status(201).json(result)
    }catch (e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Game Types']
}

// UPDATE GAME TYPE
const updateType = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Type id is not valid.")
        return
    }
    const typeId = new ObjectId(req.params.id);
    const data = req.body;
    const type = {
        name: data.name,
        rules: data.rules
    };

    db = await connection.getDb();
    try {
        result = await db.db('card_games').collection('game_types').replaceOne({_id: typeId}, type);
        if (result.modifiedCount < 1) {
            throw new Error("Unable to modify type");
        }
        console.log(result.modifiedCount + " document[s] updated.");
        res.status(204).json(result)
    } catch(e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Game Types']
}

// DELETE GAME TYPE
const deleteType = async  (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("type id is not valid.");
        return
    }
    const typeId = new ObjectId(req.params.id);
    db = await connection.getDb();
    try {
        result = await db.db('card_games').collection('game_types').deleteOne({_id: typeId})
        if (result.deletedCount < 1) {
            throw new Error("Unable to delete type.")
        }
        console.log(result.deletedCount + " document[s] deleted")
        res.status(200).send()
    } catch(e) {
        res.status(500).send(e.message)
    }
    // #swagger.tags = ['Game Types']
}

module.exports = {
    getAllTypes,
    getTypeById,
    addType,
    updateType,
    deleteType
}