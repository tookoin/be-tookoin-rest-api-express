const db = require("../Config/db");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const async = require("async");
const bcrypt = require("bcryptjs");

const model = require("../Models/password");

module.exports = {
  forgotPassword: (req, res) => {
    // const token = (result) => {
    crypto.randomBytes(20, function(err, buf) {
      if (!err) {
        var token = buf.toString("hex");
        let email = req.body.email;
        model
          .forgotPassword(email, token)
          .then((token, result) => {
            smtpTransport = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: "tookoin@gmail.com",
                pass: "Projecttookoin12@"
              }
            });

            var mailOptions = {
              to: email,
              from: "Unico",
              subject: "Unico Password Reset",
              text:
                "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
                "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
                "http://" +
                req.headers.host +
                "/password/reset/" +
                token +
                "\n\n" +
                "If you did not request this, please ignore this email and your password will remain unchanged.\n"
            };

            smtpTransport.sendMail(mailOptions, function(err) {
              res
                .status(200)
                .send({
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
    // var EditUserMysql = {
    //   token: req.params.token,
    //   expires: new Date()
    // };
    let token = req.params.token;
     let expires = new Date();
     let password = req.body.password;
     let confirm = req.body.confirm;

    model.resetPassword(token,expires,password, confirm)
    
  },
};

// module.exports = {
//     forgotPassword: (req,res) => {
//         async.waterfall([
//             function(done) {
//                    crypto.randomBytes(20, function(err, buf) {
//                     var token = buf.toString('hex');
//                     done(err, token);
//                   });
//             },
//             function(token, done) {
//                  db.query("SELECT * FROM user WHERE email = ?",[req.body.email], function(err, user){
//                     if (user.length == 0) {
//                       res.status(400).send({ msg: "No account with that email address exists." });
//                       console.log(err);
//                           // res.json ("error", "No account with that email address exists.");
//                         //   return res.redirect("/forgot");
//                     }
//                     console.log(user);

//                     var EditUserMysql = {
//                         token: token,
//                         expires:   new Date()
//                     };
//                     //var insertQuery = "UPDATE users SET reset_password_token= ?,reset_password_expires=? WHERE email = req.body.email values (?,?,?)";
//                     db.query("UPDATE user SET reset_password_token= ?,reset_password_expires= DATE_ADD(?, INTERVAL +1 DAY) WHERE email = ?",[EditUserMysql.token,EditUserMysql.expires,req.body.email],function(err, rows) {
//                         done(err, token, user);
//                     });
//                   });
//             },
//             function(token, user, done) {
//                   var smtpTransport = nodemailer.createTransport({
//                     service: "Gmail",
//                     auth: {
//                           user: "tookoin@gmail.com",
//                           pass: "Projecttookoin12@"
//                     }
//                   });
//                   var mailOptions = {
//                     to: user[0].email,
//                     from: "Unico",
//                     subject	: "Unico Password Reset",
//                     text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
//                           "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
//                           "http://" + req.headers.host + "/password/reset/" + token + "\n\n" +
//                           "If you did not request this, please ignore this email and your password will remain unchanged.\n"
//                  };
//                   smtpTransport.sendMail(mailOptions, function(err) {
//                       res.status(200).send({msg: "An e-mail has been sent to " + user[0].email + " with further instructions."})
//                     // res.json("success", "An e-mail has been sent to " + result[0].email + " with further instructions.");
//                     done(err, 'done');
//                   });
//             }
//         ], function(err) {
//             if (err) {
//               console.log(err)
//             }
//             // res.redirect("/forgot");
//             // console.log(err)
//         });
//     },

//     resetPassword: (req,res) => {
//         async.waterfall([
//             function(done) {
//                 var EditUserMysql = {
//                     token: req.params.token,
//                     expires:   new Date()
//                 };
//                   db.query("SELECT * FROM user WHERE reset_password_token = ? and reset_password_expires >= DATE_ADD(?, INTERVAL +0 DAY)",[EditUserMysql.token,EditUserMysql.expires],function(err, user){
//                     if (user.length = 0)  {
//                         res.status(400).send({ msg: "Password reset token is invalid or has expired." });
//                         //   res.json('error', 'Password reset token is invalid or has expired.');
//                           // return res.redirect('back');
//                     } else if(req.body.password === req.body.confirm) {
//                         // var EditUserMysql = {
//                         //     password: bcrypt.hashSync(req.body.password, null, null)
//                         // };
//                         const hashPassword = bcrypt.hashSync(req.body.password, 10);
//                         console.log(hashPassword,'new');
//                           db.query("UPDATE user SET password= ?, reset_password_token=null ,reset_password_expires= null WHERE reset_password_token = ?",[hashPassword,req.params.reset_password_token],function(err, user) {
//                                done(user);
//                                console.log(err,'query')
//                                console.log(user,'result query');
//                           });
//                     } else {
//                         res.status(422).send({ msg: "Passwords do not match." });
//                         // res.json("error", "Passwords do not match.");
//                       //   return res.redirect("back");
//                     }
//                   });
//             }
//           ], function(err) {
//           //   res.redirect('/');
//           console.log(err, 'error sini');
//           });
//     }
// };

// // app.get('/reset/:token', function(req, res) {
// //     var EditUserMysql = {
// //         token: req.params.token,
// //         expires:   new Date()
// //     };
// //     connection.query("SELECT * FROM users WHERE reset_password_token = ? and reset_password_expires >= DATE_ADD(?, INTERVAL +0 DAY)",[EditUserMysql.token,EditUserMysql.expires],function(err, user){
// //         if (user.length > 0)  {
// //                res.json("login/reset", {token: req.params.token});
// //            } else{
// //                 res.json("error", 'Password reset token is invalid or has expired.')
// //             //   res.redirect("/forgot");

// //         };
// //       });
// // });
