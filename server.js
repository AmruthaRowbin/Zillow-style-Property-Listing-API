require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const updateProperties = require('./jobs/updateProperties');

connectDB();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  // Background job every 1 hour
  setInterval(updateProperties, 3600000);//10000 for 10 s
});
