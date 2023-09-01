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

// Function to set a new school value in Redis
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

// Function to display the value of the school
function displaySchoolValue(schoolName) {
    client.get(schoolName, (error, value) => {
        if (error) {
            console.log(`Error retrieving value for key ${schoolName}: ${error.message}`);
        }
        else {
            console.log(`Value for key ${schoolName}: ${value}`);
        }
    });
}

// Functions Call
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFranscisco');
