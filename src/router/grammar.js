import express from 'express';
import Linter from "../linter/linter.js";
let grammarRouter = express.Router();

function handleRequestBody(body) {
  let key = Object.keys(body)[0];
  let value = body[key];
  let ooo = key + value;
  return JSON.parse(ooo);
}

grammarRouter.post('/lint', async function(req, res, next) {
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
  console.log("\n");
  console.log("################################");
  console.log("linting!!!!!");
  console.log(a.keyword);
  console.log("#################################\n");
  ans1.data_list[0].answer += "\n Your UserID is: " + a["_3rdparth_proxy_http_header_"].uid;
  ans1.data_list[0].answer += "\n Your BotID is: " + a["_3rdparth_proxy_http_header_"].bid;
  ans1.data_list[0].answer += "\n Your Lint Result is: \n" + out.trim();
  ans1.data_list[0].answer += "\n Your Lint Error is: \n" + err.trim();
  res.json(ans1);
});

export default grammarRouter;