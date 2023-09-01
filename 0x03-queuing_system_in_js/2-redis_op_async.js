const redis = require('redis');
import { promisify } from 'util';

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client)

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
async function displaySchoolValue(schoolName) {
    try {
        const value = await getAsync(schoolName);
        console.log(`Value for key ${schoolName}: ${value}`);
    } catch {
        console.log(`Error retrieving value for key ${schoolName}: ${error.message}`);
    }
}

// Functions Call
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFranscisco');
