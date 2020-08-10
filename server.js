const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const contactAddress = "staunchwriter@gmail.com";

const mailer = nodemailer.createTestAccount({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.PASSWORD,
  },
});

app.post("/form", async (req, res) => {
  try {
    mailer.sendMail(
      {
        from: "ajusabuyu@gmail.com",
        to: [contactAddress],
        subject: req.body.subject || "[New Patient]",
        html: req.body.message || "[No message]",
      },
      function (err) {
        if (err) return res.status(500).send(err);
        res.json({ success: true });
      }
    );
  } catch (err) {
    next(err);
  }
});
console.log(process.env.PASSWORD);
app.listen(PORT, () => {
  console.log("listening on port,", PORT);
});
