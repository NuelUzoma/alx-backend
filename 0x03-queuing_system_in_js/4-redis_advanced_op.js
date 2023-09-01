import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (error) => {
    console.log(`Redis client error: ${error}`);
});

client.hSet('HolbertonSchools', 'Portland', '50', redis.print);
client.hSet('HolbertonSchools', 'Seattle', '80', redis.print);
client.hSet('HolbertonSchools', 'New York', '20', redis.print);
client.hSet('HolbertonSchools', 'Bogota', '20', redis.print);
client.hSet('HolbertonSchools', 'Cali', '40', redis.print);
client.hSet('HolbertonSchools', 'Paris', '2', redis.print);

client.hGetAll('HolbertonSchools', (error, result) => {
    if (error) {
        console.error(`Error retrieving hash value from Redis: ${error}`);
    } else {
        console.log(`Hash value: ${result}`);
    }
});