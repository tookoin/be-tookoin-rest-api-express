const model = require('../Models/login');
const response = require('../Helpers/response');

module.exports = {
    loginUser: ({body,params}, res) => {
        model.loginUser(body,params)
        .then(result => {
            if (result.invalidPassword) {
                response.invalidPassword(res);
            } else if (result.invalidUsername) {
                response.invalidUsername(res);
            } else {
                response.success(res, result);
            }
        })
        .catch((err) => {
            console.log(err);
                        
        })
    }
};