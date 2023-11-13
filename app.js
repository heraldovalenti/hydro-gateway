const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const querystring = require("node:querystring");

const app = express();
const API_URL = process.env.API_URL;

app.use(
  "/api",
  createProxyMiddleware({
    target: API_URL,
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
