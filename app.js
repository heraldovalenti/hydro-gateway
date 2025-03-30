const express = require("express");
const { apiProxy } = require("./apiProxy");
const { rp5Handler } = require("./rp5Handler");
const { rasterHandler } = require("./rasterHandler");

const app = express();

app.use("/api", apiProxy);
app.get("/rp5", rp5Handler);
app.get("/rasters/*", rasterHandler);

// Listen to the App Engine-specified port, or 8000 otherwise
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
