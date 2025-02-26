'use strict'

const mongoose = require('mongoose');
const countConnect = () => {
    const numConnections = mongoose.connections.length;
    console.log(`Number of connections: ${numConnections}`);
}

const checkOverload = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnections = numCores * 5;
        if (numConnections > maxConnections) {
            console.log('Overload connections');
        }
    })
}
module.exports = {
    countConnect,
    checkOverload
};