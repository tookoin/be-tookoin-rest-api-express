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

  resetPassword: (token, expires, password, confirm, res) => {
    return new Promise((resolve, reject) => {
      let passwordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(
        password
      );

      if (passwordValidate == false) {
        resolve((msg = "InvalidFormat"));
      } else {
        db.query(
          "SELECT * FROM user WHERE reset_password_token = ? and reset_password_expires >= DATE_ADD(?, INTERVAL +0 DAY)",
          [token, expires],
          function(err, result) {
            if (result.length < 1) {
              const result = 400;
              resolve(result);
            } else {
              if (password === confirm) {
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
                  }
                );
              } else {
                const result = 403;
                resolve(result);
              }
            }
          }
        );
      }
    });
  },

  phonePassword: (phone, token) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user WHERE phone = ?", [phone], function(
        err,
        result
      )
      

      {
        // console.log('result',result) 
        if (result.length == 0) {
          const result = 400;
          resolve(result);
          console.log(err);
        } else {
          const EditUserMysql = {
            token: token,
            expires: new Date()
          };
          db.query(
            "UPDATE user SET reset_password_token= ?,reset_password_expires= DATE_ADD(?, INTERVAL +1 DAY) WHERE phone = ?",
            [EditUserMysql.token, EditUserMysql.expires, phone],
            function(err, rows) {
              if (!err) {
                resolve(rows);
                console.log(rows);
              } else {
                reject(err);
                console.log(err);
              }
            }
          );
        }
      });
    });
  }
};
