var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const port = process.env.PORT;

var app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

var jsonParser = bodyParser.json();

app.post("/submit_pfb", jsonParser, async function (req, res, next) {
  const params = {
    namespace_id: req.body.namespace_id,
    data: Buffer.from(req.body.data).toString("hex"),
    gas_limit: req.body.gas_limit,
    fee: req.body.fee,
  };

  const url = `http://${req.body.ip_address}:${req.body.port}/submit_pfb`;

  try {
    const { data } = await axios.post(url, params);
    res.send(JSON.stringify(data));
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong!' })
  }
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
