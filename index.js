module.exports = function clear(file, alreadySeen) {
  if (!alreadySeen) {
    alreadySeen = [];
  }
  var cacheItem = require.cache[file];
  if (!cacheItem) {
    return;
  }

  cacheItem.children.forEach((child) => {
    if (!alreadySeen.includes(child.id)) {
      alreadySeen.push(child.id);
      clear(child.id, alreadySeen)
    }
  });
  delete require.cache[require.resolve(file)];
};
