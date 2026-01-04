const { Kafka } = require("kafkajs");

const kafkaClient = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.29.232:9092"],
});

async function init() {
    const consumer = kafkaClient.consumer({ groupId: "rider-group" });
    console.log("Consumer Connecting...");
    await consumer.connect();
    console.log("Consumer Connected!");
    console.log("Subscribing to Topic...");
    await consumer.subscribe({ topic: "rides-updates", fromBeginning: true});
    console.log("Subscribed to Topic!");
    console.log("Running Consumer...");
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`[${topic}, PART: ${partition}, message: ${message.value.toString()}]`);
        },
    }); 
};

init();