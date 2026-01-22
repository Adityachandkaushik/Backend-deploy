const cache = new Map();

exports.getCache = (key) => {
  const entry = cache.get(key);

  if (!entry) return null;

  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }

  return entry.data;
};

exports.setCache = (key, data, ttl = 10 * 60 * 1000) => {
  cache.set(key, {
    data,
    expiry: Date.now() + ttl,
  });
};
