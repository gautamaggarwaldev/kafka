const {Kafka} = require("kafkajs");

const kafkaClient = new Kafka({
    clientId: "my-app",
    brokers: ["192.168.29.232:9092"],
});

async function init() {
    const admin = kafkaClient.admin();
    console.log("Admin Connecting...");
    admin.connect();
    console.log("Admin Connected!");

    console.log("Creating Topics...");
    await admin.createTopics({
        topics: [
            {
                topic: "rider-updates",
                numofPartitions: 2,
            },
        ],
    });
    console.log("Topics created successfully");

    console.log("Disconnecting Admin...");
    admin.disconnect();
};

init();