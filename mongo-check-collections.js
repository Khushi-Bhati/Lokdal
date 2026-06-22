const mongoose = require('mongoose');

(async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing env var: MONGODB_URI');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { bufferCommands: false });
    console.log('Connected. Database:', mongoose.connection.name || '(unknown)');

    // List collections from admin DB
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const names = collections.map(c => c.name).sort();

    console.log('Collections:', names.length ? names : '(none)');
    console.log(names.join('\n'));

    await mongoose.connection.close();
    process.exit(0);
  } catch (e) {
    console.error('Failed:', e && e.message ? e.message : e);
    process.exit(1);
  }
})();

