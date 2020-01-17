const db = require("../Config/db");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const async = require("async");
const bcrypt = require("bcryptjs");

const model = require("../Models/password");

module.exports = {
  forgotPassword: (req, res) => {
    // const token = (result) => {
    crypto.randomBytes(4, function(err, buf) {
      const token = buf.toString("hex");
      if (!err) {
        // const token = buf.toString("hex");
        let email = req.body.email;
        model
          .forgotPassword(email, token)
          .then(result => {
            smtpTransport = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: "tookoin@gmail.com",
                pass: "Projecttookoin12@"
              }
            });

            mailOptions = {
              to: email,
              from: "Tookoin",
              subject: "Tookoin Password Reset",
              text:
                "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
                "Please reset your password by creating new password and input the code bellow:\n\n" +
                "Your secret code:" +
                token +
                "\n\n" +
                "If you did not request this, please ignore this email and your password will remain unchanged.\n"
            };

            smtpTransport.sendMail(mailOptions, function(err) {
              res.status(200).send({
                msg:
                  "An e-mail has been sent to " +
                  email +
                  " with further instructions."
              });
              result(err, "done");
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log(err);
      }
    });
  },

  resetPassword: (req, res) => {
    let token = req.body.token;
    let expires = new Date();
    let password = req.body.password;
    let confirm = req.body.confirm;

    model
      .resetPassword(token, expires, password, confirm)
      .then(result => {
        if (result == "InvalidFormat") {
          res.send(
            "Password must be at least 1 Uppercase, 1 Lowercase, 1 Number"
          );
        } else if (result == 400) {
          res.send("Token Invalid");
        } else if (result == 403) {
          res.send("Password did not match");
        } else {
          res.send("SUCCESS UPDATE PASSWORD");
        }
      })
      .catch(() => "FAILED UPDATE PASSWORD");
  }
};