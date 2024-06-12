const express = require("express");
const { apiProxy } = require("./apiProxy");
const { rp5Handler } = require("./rp5Handler");

const app = express();

app.use("/api", apiProxy);
app.get("/rp5", rp5Handler);

// Listen to the App Engine-specified port, or 8000 otherwise
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
