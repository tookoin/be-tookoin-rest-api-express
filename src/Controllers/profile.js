const model = require('../Models/profile');
const jwtdecode = require('jwt-decode');
const response = require('../Helpers/response');

module.exports = {
    updateProfile: (req,res) => {
        const {body,params} = req;
        const token = req.headers['authorization'];
        const decode = jwtdecode(token);

        model.updatePofile(body, params, decode['id_user'])
        .then (result => {
            // const data = {
            //     desc: 'SUCCESS UPDATED'
            // }
            response.success(res,result);
        })
        .catch((err) => {
            console.log(err);
        })
    }
};