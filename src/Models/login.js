require('dotenv').config();
const db = require('../Config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('../Helpers/validate_data')

module.exports = {
  loginUser: (body, params) => {
    return new Promise(async (resolve, reject) => {
      const role = params.role;
      const email = body.email;
      const password = body.password;

      let sql = `SELECT * FROM user WHERE email = '${email}' AND role= '${role}'`;

      db.query(sql, (err, result) => {
        // console.log(response)
        if (!err) {
          if (result.length) {
            console.log(result)
            // Get password from query result
            const dbPassword = result[0].password;
            
            // Check password
            if (bcrypt.compareSync(password, dbPassword)) {
              console.log('Authentication Success');
              console.log(result[0].id_user)
              const payload = { 
                id_user: result[0].id_user,
                email: email,
                role
               };

              // Get Token based on user_type
              // SecretKey generated with require('crypto').randomBytes(64).toString('hex')
              if (role == 1) {
                const accessToken = jwt.sign(
                  payload,
                  'secretkey'
                );
                console.log('accessToken: ', accessToken);
                result[0].token = accessToken;
              } else if (role == 2) {
                const accessToken = jwt.sign(
                  payload,
                  'secretkey'
                );
                console.log('accessToken: ', accessToken);
                result[0].token = accessToken;
              }
              resolve(result);
            } else {
              result.invalidPassword = 'Invalid Password'
              resolve(result);
            }
          }else{
            result.invalidUsername = 'Username not registered'
            resolve(result);
          }
        } else {
          resolve(err);
        }
      });
    });
  }
};