import redis from 'redis';
const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
});

client.subscribe('holberton school channel');

client.on('message', (message) => {
    console.log('Recieved message:', message);
    if (message == 'KILL_SERVER') {
        client.unsubscribe();
        client.quit();
    }
});