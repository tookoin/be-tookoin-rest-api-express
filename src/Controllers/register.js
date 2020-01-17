const model = require('../Models/register');
const response = require('../Helpers/response');

module.exports = {
    // Regist a User
    registUser: (req, res) => {
        let name_user = req.body.name_user;
        let email = req.body.email;
        let password = req.body.password;
        let role = req.params.role
        model.registerUser({name_user, email, password}, {role})
        .then(result => {
            if (result == 'InvalidName'){
                console.log(result)
                res.send('Name required!')
            } else if (result == 'InvalidFormat') {
                console.log(result);
                response.failed(res, result, 400);
            } else if (result == 403) {
                response.emailAlreadylExist(res);
            } else {
                response.success(res, result)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}