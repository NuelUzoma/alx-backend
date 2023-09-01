const kue = require('kue');
const queue = kue.createQueue({
    concurrency: 2
});

const blacklist = [4153518780, 4153518781];

function sendNotification(phoneNumber, message, job, done) {
    // Track progress of the job
    job.progess(0, 100);

    // Check if phone number is included in the blacklist
    if (blacklist.includes(phoneNumber)) {
        const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
        return done(error);
    }

    // Track progress to 50%
    job.progess(50, 100);
    // Log sending notification
    console.log(`Sending notification to ${phoneNumber}, with message ${message}`);
    // Complete the job
    done();
}

queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message, job, done);
});
