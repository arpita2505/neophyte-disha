
const { MongoClient } = require('mongodb');

const connectToMongoDB = async () => {
    const url = 'mongodb://127.0.0.1:27017/disha';

    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('analysis_collection');
        return { client, collection };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

module.exports = connectToMongoDB;
