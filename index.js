const NODE_MODULES_SEGMENT = 'node_modules/';
function getModuleName(id) {
  const segments = id.split(NODE_MODULES_SEGMENT);
  if (segments.length > 1) {
    const lastSegment = segments[segments.length - 1];
    return lastSegment.substring(0, lastSegment.indexOf('/'));
  }
  return undefined;
}

module.exports = function clear(file, whiteList, alreadySeen) {
  if (!whiteList) {
    whiteList = [];
  }

  if (!alreadySeen) {
    alreadySeen = [];
  }

  var cacheItem = require.cache[file];
  if (!cacheItem) {
    return;
  }

  cacheItem.children.forEach((child) => {
    if (!alreadySeen.includes(child.id) && !whiteList.includes(getModuleName(child.id))) {
      alreadySeen.push(child.id);
      clear(child.id, whiteList, alreadySeen)
    }
  });
  delete require.cache[require.resolve(file)];
};
