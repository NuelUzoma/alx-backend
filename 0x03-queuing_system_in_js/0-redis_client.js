const redis = require('redis');
const client = redis.createClient();

// Connect to the Redis Server
client.on('connect', () => {
    console.log("Redis client connected to the server");
});

// Handle error connections
client.on('error', () => {
    console.log(`Redis client not connected to the server: ${error.message}`);
});
