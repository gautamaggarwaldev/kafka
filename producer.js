const { Kafka } = require("kafkajs");

const kafkaClient = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.29.232:9092"],
});

async function init() {
  const producer = kafkaClient.producer();
  console.log("Producer Connecting...");
  await producer.connect();
  console.log("Producer Connected!");

  console.log("Sending Message...");
  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        partition: 0,
        key: "rider-location",
        value: JSON.stringify({
          name: "jhon doe",
          location: "40.7128° N, 74.0060° W",
        }),
      },
    ],
  });

  console.log("Message Sent!");
  console.log("Disconnecting Producer...");
  await producer.disconnect();
  console.log("Producer Disconnected!");
}

init();
