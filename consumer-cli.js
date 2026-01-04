const { Kafka } = require("kafkajs");
const group = process.argv[2];

const kafkaClient = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.29.232:9092"],
});


async function init() {
  const consumer = kafkaClient.consumer({ groupId: group });
  await consumer.connect();

  await consumer.subscribe({ topics: ["rides-updates"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();