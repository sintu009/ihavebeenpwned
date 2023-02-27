const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var emailIds = [
  "sintugupta@gmail.com",
  "riteshkr142002@gmail.com",
  "riteshgupta9939@gmail.com",
  "p.kaur012210@gmail.com",
];

const getData = async (emails) => {
  var emailResult = [];

  const options = {
    method: "GET",
    headers: {
      "Hibp-Api-Key": "1c312aad58c3473693169f5773439566",
    },
  };

  for await (var email of emails) {
    try {
      const res = await axios.get(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${email}`,
        options
      );
      if (res.status != 404) {
        emailResult.push({ email, data: res.data });
      } else {
        emailResult.push({ email, data: res.data });
      }
    } catch (e) {
      console.log(">>>> ", e, ">> Email ", email);
    }
    await sleep(8000);
  }

  return emailResult;
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
app.post("/getdata", async (req, res) => {
  const { email } = req.body;

  const result = await getData(email);


  if (result) {
    return res.send(result);
  }
});

// setTimeout(getData, 6000);
app.listen(3600, () => {
  console.log("alive");
});

// app.listen(3000, () => console.log('app is running'))
