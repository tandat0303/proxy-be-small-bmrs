const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://erp.lacty.com.vn:8081",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  }),
);

app.use(
  "/images",
  createProxyMiddleware({
    target: "http://erp.lacty.com.vn:8000",
    changeOrigin: true,
    pathRewrite: {
      "^/images": "",
    },
  }),
);

app.get("/", (req, res) => {
  res.send("ERP Proxy Server Running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running on port", PORT));
