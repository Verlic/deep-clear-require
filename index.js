module.exports = (file) => {
  var cacheItem = require.cache[require.resolve(file)];
  if (!cacheItem) {
    return;
  }

  cacheItem.children.forEach((child) => delete require.cache[child.id]);
  delete require.cache[require.resolve(file)];
};
