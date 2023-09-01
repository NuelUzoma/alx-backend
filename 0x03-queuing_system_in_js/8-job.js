import kue from 'kue';

const queue = kue.createQueue();

const jobs = [
    {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      },
      {
        phoneNumber: '4153518743',
        message: 'This is the code 4321 to verify your account'
      },
      {
        phoneNumber: '4153538781',
        message: 'This is the code 4562 to verify your account'
      },
      {
        phoneNumber: '4153118782',
        message: 'This is the code 4321 to verify your account'
      },
      {
        phoneNumber: '4153718781',
        message: 'This is the code 4562 to verify your account'
      }
];

function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an array')
    }

    jobs.forEach((jobData) => {
        const job = queue.create('push_notification_code_3', jobData)
        .save((error) => {
            if (!error) {
                console.log(`Notification job created: ${job.id}`);
            }
        });

        job.on('completed', () => {
            console.log(`Notifiation job ${job.id} completed`);
        });

        job.on('failed', (error) => {
            console.log(`Notification job ${job.id} failed: ${error}`);
        });

        job.on('progress', (progress) => {
            console.log(`Notification job ${job.id} ${progress}% complete`)
        });
    });
}

createPushNotificationsJobs(jobs, queue);
