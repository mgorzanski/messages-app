module.exports = {
    informations(req, res, db) {
        const collection = db.collection('app');

        collection.findOne({document: 'informations'}, (error, docs) => {
            if (error || docs === null) res.sendStatus(404);
            res.status(200).send(docs);
        });
    }
};