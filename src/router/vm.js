import express from 'express';
import SessionController from "../sessionVM/sessionController.js";

let vmRouter = express.Router();
let sessionController = new SessionController();

function handleRequestBody(body){
  let key = Object.keys(body)[0];
  let value = body[key];
  let ooo = key+value;
  return JSON.parse(ooo);
}

vmRouter.post('/try', function(req, res, next) {
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

export default vmRouter;