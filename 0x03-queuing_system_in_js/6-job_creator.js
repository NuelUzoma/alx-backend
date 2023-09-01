const kue = require('kue');
const queue = kue.createQueue();

const job = {
    phoneNumber: '12344567890',
    message: 'Welcome On Board User'
};

// Job creation
const notificationJob = queue.create('push_notification_code', job)
.save((error) => {
    if (!error) {
        console.log('Notification Job Created:', notificationJob.id)
    }
});

// Job creation completed
notificationJob.on('complete', () => {
    console.log('Notification job completed');
});

// Job creation failed
notificationJob.on('failed', () => {
    console.log('Notification job failed');
});
