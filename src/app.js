const express = require('express')
let bodyParser = require('body-parser')

const app = express();


let ans = {
  ans_node_name: "小微闲聊",
  title: "小薇兄你好",
  answer: "你好呀！",
  answer_type: "text",
  bid_stat: {
    curr_time: "20190515-18:07:37",
    err_msg: "微信通用意图 . 肯定.branches.s_Any@.arguments's element.slot slot does not exist!",
    latest_time: "20190523-16:06:33",
    latest_valid: false,
    up_ret: -1
  },
  confidence: 1,
  from_user_name: "o9U-85tEZToQxIF8ht6o-KkagxO0",
  status: "FAQ",
  to_user_name: "xalsjfasf1ljasjdf1",
  options: [
    {
      ans_node_id: 12355896,
      ans_node_name: "自建应用",
      answer: "您好，若自建应用消息不显示“详情”入口，请参考以下情况：LINE_BREAKLINE_BREAK1、手机端和电脑端有详情入口的应用消息一般是通过 api 进行推送的。通过 api 进行推送的详情入口不支持在微信侧显示。LINE_BREAKLINE_BREAK2、企业号或企业微信后台推送的图文消息，在微信 PC 侧会有“详情”入口，在企业微信手机端、PC端以及微信手机端则不会有“详情”入口。LINE_BREAKLINE_BREAK注意：微信电脑端侧仅会显示摘要和详情，不显示标题。企业微信电脑端、微信微信手机端、企业微信手机端则会显示标题和摘要。若未填写摘要，则不显示摘要。",
      confidence: 0.795230507850647,
      title: "自建应用消息没有详情入口"
    }
  ]
}

let ans1={
  data_list:[
    {answer: "hello小命！"}
  ],
  err_code: 0,
  err_msg: "success"
}
app.get('/', (req, res) => {
  // console.log(req.header("appid"));
  console.log(req.params);
  res.json("hello world");
});

// 解析提交的json参数
let jsonParser = bodyParser.json()
// 解析提交的form表单参数
let urlencodedParser = bodyParser.urlencoded({ extended: true })

app.post('/try', urlencodedParser, (req, res) => {
  // console.log(req.header("appid"));
  // console.log(req.params);
  ans1.data_list[0].answer = "hello! The words that you enter is！" + JSON.stringify(req.body.keyword);
  res.json(ans1);
});

app.listen(3000, function() {
  console.log("Example app listening at http://localhost:3000")
});