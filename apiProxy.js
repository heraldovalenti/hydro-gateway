const { createProxyMiddleware } = require("http-proxy-middleware");
const querystring = require("node:querystring");

const API_URL = process.env.API_URL;

const apiProxy = createProxyMiddleware({
  target: `${API_URL}/api`,
  changeOrigin: true,
  on: {
    proxyRes: (proxyReq, req, res) => {
      const { query, path } = req;
      const { statusCode } = res;
      const queryString = querystring.stringify(query);
      console.log(
        `request processed: [${statusCode}] ${path}${
          queryString ? `?${queryString}` : ""
        }`
      );
    },
  },
});

module.exports = { apiProxy };
