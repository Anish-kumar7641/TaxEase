const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

// Example data for training
const trainingData = tf.tensor2d([
    [300000, 2000, 1], // Income, medical expenses, number of investments
    [500000, 5000, 2],
    [150000, 0, 0],
    [400000, 10000, 3],
    [250000, 0, 1]
]);

const targetData = tf.tensor2d([
    [1, 1, 0, 0, 1], // Corresponding suggestions for data (binary representation)
    [1, 1, 1, 0, 1],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1]
]);

// Build the model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 5, inputShape: [3], activation: "sigmoid" })); // Adjust layers and activation as needed
model.add(tf.layers.dense({ units: 5, activation: "softmax" }));

model.compile({
    optimizer: tf.train.adam(),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"]
});

// Train and save the model
const trainModel = async () => {
    await model.fit(trainingData, targetData, {
        epochs: 100,
        batchSize: 1,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}`);
            }
        }
    });

    const savePath = path.resolve(__dirname, "taxOptimizerModel");
    await model.save(`file://${savePath}`);
    console.log("Model saved to", savePath);
};

trainModel().catch((err) => console.error("Error training model:", err));
