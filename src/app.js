import vmRouter from "./router/vm.js";
import grammarRouter from "./router/grammar.js";
import express from "express";
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))
// parse application/json
app.use(express.json())

app.use("/vm", vmRouter);
app.use("/grammar", grammarRouter);

app.listen(3000, function () {
  console.log("Example app listening at http://localhost:3000")
});