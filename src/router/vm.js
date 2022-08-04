import express from 'express';
import SessionController from "../sessionVM/sessionController.js";
import Linter from "../linter/linter.js";

let vmRouter = express.Router();
let sessionController = new SessionController();

function handleRequestBody(body) {
  let key = Object.keys(body)[0];
  let value = body[key];
  let ooo = key + value;
  return JSON.parse(ooo);
}

vmRouter.post('/try', async function (req, res, next) {
  let ans1 = {
    data_list: [
      {answer: "hello！"}
    ],
    err_code: 0,
    err_msg: "success"
  }
  let a = handleRequestBody(req.body);
  let linter = new Linter(a["_3rdparth_proxy_http_header_"].uid, a.keyword);
  let out = "";
  let err = "Congrats! No Error or Warning Found";
  await linter.lintFile().then((result)=>{
    out = result;
  }).catch((error)=>{
    err = error;
  });
  ans1.data_list[0].answer = "hello! The words that you enter is:" + a.keyword;
  let result = sessionController.runCmdOnVM(a["_3rdparth_proxy_http_header_"].uid, a["_3rdparth_proxy_http_header_"].bid, a.keyword);
  ans1.data_list[0].answer += "\n Your UserID is: " + a["_3rdparth_proxy_http_header_"].uid;
  ans1.data_list[0].answer += "\n Your BotID is: " + a["_3rdparth_proxy_http_header_"].bid;
  ans1.data_list[0].answer += "\n Your Running Result is: " + result;
  ans1.data_list[0].answer += "\n Your Linting Result is: \n" + out.trim();
  ans1.data_list[0].answer += "\n Your Linting Error is: \n" + err.trim();
  res.json(ans1);
});

export default vmRouter;