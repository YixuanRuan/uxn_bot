import SessionController from "./sessionVM/sessionController.js"
import express from "express";
const app = express();

let sessionController = new SessionController();

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
  let result = sessionController.runCmdOnVM(a["_3rdparth_proxy_http_header_"].uid, a["_3rdparth_proxy_http_header_"].bid, a.keyword);
  ans1.data_list[0].answer += "\n Your UserID is: "+a["_3rdparth_proxy_http_header_"].uid;
  ans1.data_list[0].answer += "\n Your BotID is: "+a["_3rdparth_proxy_http_header_"].bid;
  ans1.data_list[0].answer += "\n Your Running Result is: "+result;
  res.json(ans1);
});

app.listen(3000, function () {
  console.log("Example app listening at http://localhost:3000")
});