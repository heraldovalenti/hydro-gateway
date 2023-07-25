const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const querystring = require("node:querystring");

const app = express();
const BASE_URL = process.env.BASE_URL || "http://34.71.43.139:8080";

app.use(
  "/api",
  createProxyMiddleware({
    target: BASE_URL,
    changeOrigin: true,
    onProxyRes: (proxyReq, req, res) => {
      const { query, path } = req;
      const { statusCode } = res;
      const queryString = querystring.stringify(query);
      console.log(
        `request processed: [${statusCode}] ${path}${
          queryString ? `?${queryString}` : ""
        }`
      );
    },
  })
);

// Listen to the App Engine-specified port, or 8000 otherwise
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
