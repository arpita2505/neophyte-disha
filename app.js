
const connectToMongoDB = require('./mongo');

(async () => {
    try {
        const { client, collection } = await connectToMongoDB();

        const startOfDay = new Date("2023-12-18T17:37:20.704+00:00");

        const aggregationPipeline = [
            {
                $match: {
                    timestamps: { $gte: startOfDay }
                }
            },
            {
                $group: {
                    _id: { store_id: "$store_id", img_url: "$img_url" },
                    averageFullness: { $avg: "$fullness" },
                    store_id: { $first: "$store_id" },
                    img_url: { $first: "$img_url" }
                }
            },
            {
                $project: {
                    _id: 0,
                    store_id: 1,
                    img_url: 1,
                    averageFullness: 1
                }
            }
        ];

        const result = await collection.aggregate(aggregationPipeline).toArray();
        console.log(result);

        client.close();
    } catch (error) {
        console.error('Error in the main application:', error);
    }
})();
