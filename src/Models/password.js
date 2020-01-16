const db = require("../Config/db");
const bcrypt = require("bcryptjs");

module.exports = {
  forgotPassword: (email, token) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user WHERE email = ?", [email], function(
        err,
        result
      ) {
        if (result.length == 0) {
          res
            .status(400)
            .send({ msg: "No account with that email address exists." });
          console.log(err);
        } else {
          const EditUserMysql = {
            token: token,
            expires: new Date()
          };
          db.query(
            "UPDATE user SET reset_password_token= ?,reset_password_expires= DATE_ADD(?, INTERVAL +1 DAY) WHERE email = ?",
            [EditUserMysql.token, EditUserMysql.expires, email],
            function(err, rows) {
              if (!err) {
                resolve(rows);
                console.log(rows);
                // result(err, token, user);
              } else {
                reject(err);
                console.log(err);
              }
            }
          );
        }
      });
    });
  },

  resetPassword: (token, expires, password, confirm) => {
    return new Promise((resolve, reject) => {

      db.query(
        "SELECT * FROM user WHERE reset_password_token = ? and reset_password_expires >= DATE_ADD(?, INTERVAL +0 DAY)",
        [token, expires],
        function(err, result) {
          if ((result.length = 0)) {
            res
              .status(400)
              .send({ msg: "Password reset token is invalid or has expired." });
            console.log(err);
          } else if (password === confirm) {

            const hashPassword = bcrypt.hashSync(password, 10);
            console.log(hashPassword, "new");
            
            db.query(
              "UPDATE user SET password= ?, reset_password_token=null ,reset_password_expires= null WHERE reset_password_token = ?",
              [hashPassword, token],
              function(err, result) {
                if (!err) {
                  resolve(result);
                } else {
                  reject(err);
                  console.log(err);
                }
                // console.log(err, "query");
                // console.log(user, "result query");
              }
            );
          } else {
            res.status(422).send({ msg: "Passwords do not match." });
            // res.json("error", "Passwords do not match.");
            //   return res.redirect("back");
          }
        }
      );
    });
  }
};
