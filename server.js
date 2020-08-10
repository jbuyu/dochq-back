const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded());

const contactAdress = "ajusabuyu@gmail.com";

const mailer = nodemailer.createTestAccount({
  service: "Gmail",
  auth: {
    user: process.env.production.GMAIL_ADDRESS,
    pass: process.env.production.PASSWORD,
  },
});

app.post("/form", (req, res) => {
  mailer.sendMail(
    {
      from: "ajusabuyu@gmail.com",
      to: [contactAddress],
      subject: req.body.subject || "[No subject]",
      html: req.body.message || "[No message]",
    },
    function (err, info) {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});
app.listen(PORT, () => {
  console.log("listening on port,", PORT);
});
