const cron = require('node-cron');
const captainModel = require("../models/captain.model") 

// Every day at 23:59 IST
cron.schedule('59 23 * * *', async () => {
  console.log("Running daily captain stats reset...");
  await captainModel.resetDailyStats();
}, {
  timezone: "Asia/Kolkata"
});
