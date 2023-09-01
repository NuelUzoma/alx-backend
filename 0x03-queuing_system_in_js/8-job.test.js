const assert = require('assert');
const kue = require('kue');
const createPushNotificationsJobs = require('./8-job');

describe('createPushNotificationsJobs', () => {
    let queue;

    before(() => {
        // Creating a Kue queue
        queue = kue.createQueue();

        // Enter testMode without processing the jobs
        queue.testMode.enter();
    });

    after((done) => {
        queue.testMode.clear();
        queue.testMode.exit();
        done();
      });
    
      it('create two new jobs to the queue', () => {
        // Call the createPushNotificationsJobs function
        createPushNotificationsJobs(queue, ['job1', 'job2']);
    
        // Use queue.testMode to validate which jobs are inside the queue
        const jobs = queue.testMode.jobs;
        // Assertion to check the number of jobs in the queue
        assert.strictEqual(jobs.length, 2);
        assert.strictEqual(jobs[0].data.jobName, 'job1');
        assert.strictEqual(jobs[1].data.jobName, 'job2');
      });
      it('display an error message if job is not an array', () => {
        // Function Call
        createPushNotificationsJobs(queue, 'invalid');

        // Using queue.testMode to select the jobs
        const jobs = queue.testMode.jobs;

        // Assertion to check for invalid jobs
        assert.strictEqual(jobs.length, 0);
      });
});
