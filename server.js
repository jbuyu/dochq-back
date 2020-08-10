const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const nodemailer = require("nodemailer");

const app = express();
//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//nodemailer
const contactAddress = "staunchwriter@gmail.com";
const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.PASSWORD,
  },
});

app.post("/form", (req, res) => {
  const { newClientData } = req.body;
  console.log("new", newClientData);
  mailer.sendMail(
    {
      from: "saucewriter@gmail.com",
      to: [contactAddress],
      subject: `New Online Patient - ${newClientData.name}`,
      html: `
                <h3>Phone: ${newClientData.phone}</h3>
                <h3>Age: ${newClientData.age}yrs</h3>
                <h4>Consultation: ${newClientData.consultation}</h4>
                <h4>Symptoms: ${newClientData.symptoms}</h4>
                <h4>Gender: ${newClientData.gender}</h4>
                <h4>Email: ${newClientData.email}</h4>
                <hr />
                <p>This email may containe sensetive information</p>
            `,
    },
    function (err) {
      if (err) return res.status(500).send(err);
      // res.json({ success: true });
      console.log("sent");
    }
  );
});
app.listen(PORT, () => {
  console.log("listening on port,", PORT);
});
