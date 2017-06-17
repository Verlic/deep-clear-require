module.exports = function clear(file) {
  var cacheItem = require.cache[file];
  if (!cacheItem) {
    return;
  }

  cacheItem.children.forEach((child) => clear(child.id));
  delete require.cache[require.resolve(file)];
};
