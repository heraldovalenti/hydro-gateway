const { createHash } = require("node:crypto");

const hashRequest = (request) => {
  const { path, query, method } = request;
  const payload = { path, query, method };
  const payloadString = JSON.stringify(payload);
  const hash = createHash("sha256");
  hash.update(payloadString);
  const result = hash.digest("hex");
  return result;
};

module.exports = {
  hashRequest,
};
