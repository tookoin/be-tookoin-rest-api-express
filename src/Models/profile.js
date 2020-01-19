const db = require("../Config/db");
const validate = require("../Helpers/validate_data");

module.exports = {
  updatePofile: (name_user, address, photo, phone, id_user) => {
    return new Promise(async (resolve, reject) => {
      const checkPhone = await validate
        .phoneExist(phone)
        .then(result => {
          if (result.phoneExist == true) {
            return "true";
          } else {
            return "false";
          }
        })
        .catch(err => {
          console.log(err);
        });

      if (checkPhone == "true") {
        const result = 403;
        resolve(result);
      } else {
        let sql =
          "UPDATE user SET name_user=?,address=?, photo=?,phone=? WHERE id_user = ?";

        db.query(
          sql,
          [name_user, address, photo, phone, id_user],
          (err, result) => {
            if (!err) {
              resolve(result);
              // console.log(result, 'data nih');
            } else {
              reject(err);
            }
          }
        );
      }
    });
  }
};
