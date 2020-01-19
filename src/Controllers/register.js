const model = require('../Models/register');
const response = require('../Helpers/response');

module.exports = {
  // Regist a User
  registUser: (req, res) => {
    let name_user = req.body.name_user;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.params.role;
    model
      .registerUser({ name_user, email, password }, { role })
      .then(result => {
        if (result == 'InvalidName') {
          response.failed(res, 'Please input a valid name', 400);
        } else if (result == 'Invalid Email') {
          response.failed(res, 'Please input a valid email address', 400);
        } else if (result == 'Invalid Password') {
          response.failed(res, 'Please input a valid password', 400);
        } else if (result == 403) {
          response.emailAlreadylExist(res, 'Email already Exist', 400);
        } else {
          response.success(res, result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
