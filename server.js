const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const PORT = process.env.PORT || 3000;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.MAIL_KEY);
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//sengrid
app.get("/", (req, res) => {
  res.json({
    message: "doc-api",
  });
});

app.post("/form", (req, res) => {
  const { newClientData } = req.body;
  console.log("new", newClientData);
  sgMail
    .send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "Account activation link",
      html: `
        <h3>Phone: ${newClientData.phone}</h3>
        <h3>Age: ${newClientData.age}yrs</h3>
        <h4>Consultation: ${newClientData.consultation}</h4>
        <h4>Symptoms: ${newClientData.symptoms}</h4>
        <h4>Gender: ${newClientData.gender}</h4>
        <h4>Email: ${newClientData.email}</h4>
        <hr />
        <p>This email may contain sensetive information</p>
`,
    })
    .then((sent) => {
      return res.json({
        message: `Email has been sent to ${process.env.EMAIL_TO}`,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        success: false,
        errors: err,
      });
    });
});
app.listen(PORT, () => {
  console.log("listening on port,", PORT);
});
