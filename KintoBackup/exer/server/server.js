const express = require("express")
const multiparty = require("multiparty")
const cors = require('cors');


const app = express()
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.post("/login", (req, res) => {

  let {name, age} = req.body
  console.log(name, age)
  // let form = new multiparty.Form()
  // form.parse(req, (err, field, files) => {
  //   console.log(field)
  // })

  let data = {
    msg: "登录成功"
  }
  res.send(data)
})

app.listen(3333, () => {
  console.log("服务器已开启")
})