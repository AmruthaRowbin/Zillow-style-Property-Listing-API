const Property = require('../models/Property');

const updateProperties = async () => {
  console.log('Running background update task...');
  const all = await Property.updateMany({}, { $set: { updatedAt: new Date() } });
  console.log('Updated', all.modifiedCount, 'properties');
};

module.exports = updateProperties;
