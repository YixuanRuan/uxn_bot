const express = require('express')
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))
//parse application/json
app.use(express.json())

function handleRequestBody(body){
  let key = Object.keys(body)[0];
  let value = body[key];
  let ooo = key+value;
  return JSON.parse(ooo);
}

app.post('/try', (req, res) => {
  let ans1 = {
    data_list: [
      {answer: "hello！"}
    ],
    err_code: 0,
    err_msg: "success"
  }
  let a = handleRequestBody(req.body);
  ans1.data_list[0].answer = "hello! The words that you enter is:"+a.keyword;
  res.json(ans1);
});

app.listen(3000, function () {
  console.log("Example app listening at http://localhost:3000")
});