const axios = require("axios");
const { hashRequest } = require("./utils");
const { get, set } = require("./requestCache");

const RASTER_URL = process.env.RASTER_URL;
const rasterClient = axios.create({
  baseURL: RASTER_URL,
});

const rasterHandler = async (req, res) => {
  const { query, path } = req;
  const requestHash = hashRequest(req);
  const cachedResponse = get(requestHash);
  if (cachedResponse) {
    console.log("cache hit", { path, query });
    res.send({ data: cachedResponse });
    return;
  }

  const rasterResponse = await rasterClient.get(path, {
    params: query,
  });
  const { data } = rasterResponse;
  set(requestHash, data);
  console.log("request cached", { path, query });

  res.status(200).send({
    data,
  });
};

module.exports = { rasterHandler };
