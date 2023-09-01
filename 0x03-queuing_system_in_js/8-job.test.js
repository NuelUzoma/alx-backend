const { expect } = require('chai');
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

    after(() => {
        queue.testMode.clear();
        queue.testMode.exit();
      });
    
      it('should add jobs to the queue', () => {
        // Call the createPushNotificationsJobs function
        createPushNotificationsJobs(queue);
    
        // Use queue.testMode to validate which jobs are inside the queue
        const jobs = queue.testMode.jobs;
        // Assertion to check the number of jobs in the queue
        assert.equal(jobs.length, 2);
        // Additional assertions to validate the properties of the jobs if needed
      });
})
