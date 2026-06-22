const fs = require('fs');
const mongoose = require('mongoose');

let env = fs.readFileSync('.env', 'utf8').split('="')[1].replace('"', '').trim();
env = env.replace('&authSource=admin', '');

mongoose.connect(env)
  .then(() => {
    console.log('MongoDB connection successful!');
    process.exit(0);
  })
  .catch((e) => {
    console.error('MongoDB connection failed:', e.message);
    process.exit(1);
  });
