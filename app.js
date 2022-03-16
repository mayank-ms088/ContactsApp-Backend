const express = require("express");
const bodyParser = require("body-parser");
const { AUTH_ID, AUTH_TOKEN } = require("./config");
const cors = require("cors");
const plivo = require("plivo");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 3001);
app.post("/send", function (request, response) {
  //   console.log(request.body);
  let client = new plivo.Client(AUTH_ID, AUTH_TOKEN);
  client.messages
    .create({
      src: "+918881766751",
      dst: "+91" + request.body.mobile,
      text: request.body.text,
    })
    .then(function (message_created) {
      response.json({ timestamp: Date.now().toString(), status: "SUCCESS" });
    })
    .catch((e) => {
      response.json({ timestamp: Date.now().toString(), status: "FAILIURE" });
      response.send();
      console.log(e);
    });
});
app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});
