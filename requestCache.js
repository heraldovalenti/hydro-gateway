const FIVE_MINS = 5 * 60 * 1000; // 5 minutes
// const FIVE_SECS = 5 * 1000; // 5 seconds
const TTL = FIVE_MINS;

const cache = {};

function get(key) {
  const result = cache[key];
  if (result && !isExpired(result.ttl)) {
    return result.data;
  }
}

function set(key, data) {
  const now = new Date().getTime();
  const ttl = now + TTL;
  cache[key] = {
    ttl,
    data,
  };
}

function isExpired(ttl) {
  const now = new Date().getTime();
  return now > ttl;
}

module.exports = {
  get,
  set,
};
