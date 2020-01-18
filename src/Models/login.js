require("dotenv").config();
const db = require("../Config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validate = require("../Helpers/validate_data");

module.exports = {
  loginUser: (body, params) => {
    return new Promise(async (resolve, reject) => {
      // const role = body.role;
      const email = body.email;
      const password = body.password;

      let sql = `SELECT * FROM user WHERE email = '${email}'`;

      db.query(sql, (err, result) => {
        if (!err) {
          if (result.length) {
            console.log(result);
            const dbPassword = result[0].password;

            if (bcrypt.compareSync(password, dbPassword)) {
              console.log("Authentication Success");
              console.log(result[0].id_user);
              const payload = {
                id_user: result[0].id_user,
                email: email
              };
              const accessToken = jwt.sign(payload, "secretkey");
              console.log("accessToken: ", accessToken);
              result[0].token = accessToken;
              resolve(result);
            } else {
              result.invalidPassword = "Invalid Password";
              resolve(result);
            }
          } else {
            result.invalidUsername = "Username not registered";
            resolve(result);
          }
        } else {
          resolve(err);
        }
      });
    });
  }
};
