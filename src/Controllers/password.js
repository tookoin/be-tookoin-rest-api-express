const db = require('../Config/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const async = require('async');
const bcrypt = require('bcryptjs');
const TWILIO_ACCOUNT_SID = 'ACf8f64e10832f911423c6cb38279d0fca';
const TWILIO_AUTH_TOKEN = 'a4a7d88fc0bd76d28865ef255f39e490';
const TWILIO_PHONE_NUMBER = '+12107022772';

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const model = require('../Models/password');

module.exports = {
  forgotPassword: (req, res) => {
    // const token = (result) => {
    crypto.randomBytes(4, function(err, buf) {
      const token = buf.toString('hex');
      if (!err) {
        // const token = buf.toString("hex");
        let email = req.body.email;
        model
          .forgotPassword(email, token)
          .then(result => {
            if (result === 'noEmail') {
              res.status(200).send({
                status: 'failed',
                msg: 'No account with that email address exists.'
              });
            }

            smtpTransport = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'tookoin@gmail.com',
                pass: 'Projecttookoin12@'
              }
            });

            mailOptions = {
              to: email,
              from: 'Tookoin',
              subject: 'Tookoin Password Reset',
              text:
                'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please reset your password by creating new password and input the code bellow:\n\n' +
                'Your secret code:' +
                token +
                '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            smtpTransport.sendMail(mailOptions, function(err) {
              res.status(200).send({
                status: 'success',
                msg:
                  'An e-mail has been sent to ' +
                  email +
                  ' with further instructions.'
              });
              result(err, 'done');
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
        if (result == 'InvalidFormat') {

          res.status(200).send({
            status: 400,
            msg: 'Password must be at least 1 Uppercase, 1 Lowercase, 1 Number'
          });
          // res.send(
          //   'Password must be at least 1 Uppercase, 1 Lowercase, 1 Number'
          // );
        } else if (result == 400) {
          // res.send('Token Invalid');
          res.status(200).send({
            status: 400,
            msg: 'Token Invalid'
          });
        } else if (result == 403) {
          // res.send('Password did not match');
          res.status(200).send({
            status: 403,
            msg: 'Password did not match'
          });

        } else {
          // res.send('SUCCESS UPDATE PASSWORD');
          res.status(200).send({
            status: 200,
            msg: 'SUCCESS UPDATE PASSWORD'
          });
        }
      })
      .catch(() => {
        
        res.status(200).send({
          status: 400,
          msg: 'FAILED UPDATE PASSWORD'
        });});
  },

  phonePassword: (req, res) => {
    // const token = (result) => {
    crypto.randomBytes(4, function(err, buf) {
      const token = buf.toString('hex');
      if (!err) {
        // const token = buf.toString("hex");
        let phone = req.body.phone;
        // let phone = req.body.phone[0] == '0' ? req.body.phone.replace(req.body.phone[0], '+62') : req.body.phone
        model
          .phonePassword(phone, token)
          .then(result => {
            if (result == 400) {
              // res.send(JSON.stringify("There is no account regist with this phone number"));
              // res.json({
              //   msg: 'There is no account regist with this phone number'
              // });

              res.status(200).send({
                status: 'failed',
                msg: 'There is no account registered with this phone number.'
              });

            } else {
              client.messages
                .create({
                  from: TWILIO_PHONE_NUMBER,
                  to: phone,
                  body:
                    'This is code to reset your password :' +
                    '\n\n' +
                    token +
                    '\n\n' +
                    'Do not share with other!'
                })
                .then(() => {
                  // res.send(JSON.stringify({ success: true }));
                  res.status(200).send({
                    status: 'success',
                    msg: 'Success send reset code, please check your device'
                  });
                })
                .catch(err => {
                  // console.log(err);
                  // res.send(JSON.stringify({ success: false }));
                  res.status(200).send({
                    status: 'failed',
                    msg: 'Failed send reset code, please try again later'
                  });
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log(err);
      }
    });
  }
};
