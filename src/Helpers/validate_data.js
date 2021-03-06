const db = require("../Config/db");

module.exports = {
  emailExist: email => {
    return new Promise((resolve, reject) => {
      let sql = `select * FROM user WHERE email='${email}'`;

      db.query(sql, (err, result) => {
        if (!err) {
          if (result.length) {
            result.emailExist = true;
            resolve(result);
          } else {
            result.emailExist = false;
            resolve(result);
          }
        } else {
          reject(result);
        }
      });
    });
  },

  imageFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      req.fileValidationError = "Only image files are allowed!";
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },

  phoneExist: phone => {
    return new Promise((resolve, reject) => {
      let sql = `select * FROM user WHERE phone='${phone}'`;

      db.query(sql, (err, result) => {
        if (!err) {
          if (result.length) {
            result.phoneExist = true;
            resolve(result);
          } else {
            result.phoneExist = false;
            resolve(result);
          }
        } else {
          reject(result);
        }
      });
    });
  }
};
