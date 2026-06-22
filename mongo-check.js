const mongoose = require('mongoose');

(async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing env var: MONGODB_URI');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { bufferCommands: false });
    console.log('MongoDB connection successful!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (e) {
    console.error('MongoDB connection failed:', e && e.message ? e.message : e);
    process.exit(1);
  }
})();

