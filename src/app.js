const express = require('express')

const app = express();

app.get('/', (req, res) => {
  // console.log(req.header("appid"));
  console.log(req.params);
  res.json("hello world");
});

app.listen(3000, function() {
  console.log("Example app listening at http://localhost:3000")
});